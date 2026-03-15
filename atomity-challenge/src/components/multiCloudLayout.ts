import type { ProviderId } from "../tokens";

export const gridAreas: Record<ProviderId, string> = {
  aws: "1 / 1 / 2 / 2",
  azure: "1 / 3 / 2 / 4",
  gcp: "3 / 1 / 4 / 2",
  onprem: "3 / 3 / 4 / 4",
};

export const positions: Record<
  ProviderId,
  "top-left" | "top-right" | "bottom-left" | "bottom-right"
> = {
  aws: "top-left",
  azure: "top-right",
  gcp: "bottom-left",
  onprem: "bottom-right",
};

export const providerIds: ProviderId[] = ["aws", "azure", "gcp", "onprem"];
