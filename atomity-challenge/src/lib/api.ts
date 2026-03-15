export async function fetchProducts() {
  const res = await fetch(
    "https://dummyjson.com/products?limit=40&select=id,title,price,stock,category"
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
}
