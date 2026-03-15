import { useQuery } from "@tanstack/react-query";
import { fetchProducts, type Product, type ProductResponse } from "../lib/api";
import { resourceTypes, type ProviderId } from "../tokens";

export interface ResourceCost {
  id: string;
  label: string;
  cost: number;
  percentage: number;
}

export interface ProviderData {
  id: ProviderId;
  label: string;
  totalCost: number;
  trend: number;
  instanceCount: number;
  efficiency: number;
  share: number;
  resources: ResourceCost[];
}

export interface CloudData {
  providers: ProviderData[];
  totalCost: number;
  lastUpdated: string;
}

const providerMeta: { id: ProviderId; label: string }[] = [
  { id: "aws", label: "AWS" },
  { id: "azure", label: "Azure" },
  { id: "gcp", label: "Google Cloud" },
  { id: "onprem", label: "On-Premise" },
];

function mapProductsToProviders(products: Product[]): CloudData {
  // Group products by category
  const categoryGroups: Record<string, Product[]> = {};
  for (const p of products) {
    if (!categoryGroups[p.category]) categoryGroups[p.category] = [];
    categoryGroups[p.category].push(p);
  }

  const categories = Object.keys(categoryGroups);
  // Assign category groups round-robin to providers
  const providerProducts: Record<ProviderId, Product[]> = {
    aws: [],
    azure: [],
    gcp: [],
    onprem: [],
  };

  categories.forEach((cat, i) => {
    const providerId = providerMeta[i % 4].id;
    providerProducts[providerId].push(...categoryGroups[cat]);
  });

  let grandTotal = 0;
  const providerDataList: ProviderData[] = providerMeta.map((meta) => {
    const prods = providerProducts[meta.id];
    // Calculate total cost: sum(price * sqrt(stock)), scaled to $800–$6000/mo
    const rawCost = prods.reduce(
      (sum, p) => sum + p.price * Math.sqrt(Math.max(p.stock, 1)),
      0
    );
    // Scale to reasonable range
    const scaleFactor = meta.id === "aws" ? 1.8 : meta.id === "azure" ? 1.4 : meta.id === "gcp" ? 1.1 : 0.7;
    const totalCost = Math.max(800, Math.min(6000, rawCost * scaleFactor * 0.3));

    // Split into resources using factors
    const resources: ResourceCost[] = resourceTypes.map((rt) => ({
      id: rt.id,
      label: rt.label,
      cost: Math.round(totalCost * rt.factor),
      percentage: rt.factor * 100,
    }));

    // Derive trend from product IDs
    const idSum = prods.reduce((s, p) => s + p.id, 0);
    const trend = Number((((idSum % 20) - 10) / 10 * 12).toFixed(1));

    const instanceCount = prods.length * 3;
    const efficiency = Math.round(72 + (idSum % 20));

    grandTotal += totalCost;

    return {
      id: meta.id,
      label: meta.label,
      totalCost: Math.round(totalCost),
      trend,
      instanceCount,
      efficiency,
      share: 0, // Will be calculated after
      resources,
    };
  });

  // Calculate share percentages
  for (const p of providerDataList) {
    p.share = Math.round((p.totalCost / grandTotal) * 100);
  }

  return {
    providers: providerDataList,
    totalCost: Math.round(grandTotal),
    lastUpdated: new Date().toISOString(),
  };
}

export function useCloudData() {
  return useQuery<CloudData>({
    queryKey: ["cloud-cost-data"],
    queryFn: async () => {
      const data: ProductResponse = await fetchProducts();
      return mapProductsToProviders(data.products);
    },
  });
}
