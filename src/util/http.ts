import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getProducts({ signal }: { signal: AbortSignal }) {
  const url = "http://localhost:3001/products";
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the products");
    throw error;
  }

  const products = await response.json();

  return products;
}

export async function getProduct({ signal, id }: { signal: AbortSignal; id: string }) {
  const url = "http://localhost:3001/products";
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the products");
    throw error;
  }

  const products: ProductsType[] = await response.json();

  const product = products.find((product) => product.id === id);

  return product;
}
