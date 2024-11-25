import { useQuery } from "@tanstack/react-query";
import { getFactoryProducts, getProduct, getProducts } from "../util/http";

export const useGetProducts = () => {
  return useQuery<ProductsType[], Error>({
    queryKey: ["products"],
    queryFn: () => getProducts()
  });
};

export const useGetProduct = (id: string) => {
  return useQuery<ProductsType | undefined, Error>({
    queryKey: ["products", { id }],
    queryFn: () => getProduct({ id })
  });
};

export const useGetFactoryProducts = (id: string) => {
  return useQuery<FactoryDataType | null, Error>({
    queryKey: ["factory", "products", { id }],
    queryFn: () => getFactoryProducts({ id })
  });
};
