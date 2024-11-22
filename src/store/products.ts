import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "../util/http";

export const useGetProducts = () => {
  return useQuery<ProductsType[], Error>({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts({ signal })
  });
};

export const useGetProduct = (id: string) => {
  return useQuery<ProductsType | undefined, Error>({
    queryKey: ["products", { id }],
    queryFn: ({ signal }) => getProduct({ signal, id })
  });
};
