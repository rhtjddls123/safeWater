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
