import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../util/http";

export const useGetProducts = () => {
  return useQuery<ProductType[], Error>({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts({ signal })
  });
};
