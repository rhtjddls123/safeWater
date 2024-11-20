import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../util/http";

export const useGetProducts = () => {
  return useQuery<string[], Error>({
    queryKey: ["products"],
    queryFn: ({ signal }) => getProducts({ signal })
  });
};
