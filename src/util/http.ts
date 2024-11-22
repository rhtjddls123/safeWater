import { QueryClient } from "@tanstack/react-query";
import moment from "moment";

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

export async function getFactoryProducts({ signal, id }: { signal: AbortSignal; id: string }) {
  const url = "http://localhost:3001/factoryData";
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the factories");
    throw error;
  }

  const factories: FactoryDataType[] = await response.json();

  const factory = factories.find((factory) => factory.id === id);

  return factory || null;
}

export async function getViolations({ signal, name }: { signal: AbortSignal; name: string }) {
  const url = "http://localhost:3001/rawTest";
  const response = await fetch(url, { signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the products");
    throw error;
  }

  const rawTests: RawTestType[] = await response.json();

  const violation = rawTests
    .filter((test) => test.entrpsNm === name)
    .sort((a, b) => {
      const dateA = moment(a.chckDe, "YYYYMMDD");
      const dateB = moment(b.chckDe, "YYYYMMDD");
      return dateB.diff(dateA);
    });
  return violation || null;
}
