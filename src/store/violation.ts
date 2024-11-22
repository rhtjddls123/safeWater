import { useQuery } from "@tanstack/react-query";
import { getViolations } from "../util/http";

export const useGetViolations = (name: string) => {
  return useQuery<RawTestType[] | null, Error>({
    queryKey: ["factory", "products", { name }],
    queryFn: ({ signal }) => getViolations({ signal, name })
  });
};
