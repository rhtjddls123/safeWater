import { useQuery } from "@tanstack/react-query";
import { getCurrentViolations, getViolations } from "../util/http";

export const useGetViolations = (name: string) => {
  return useQuery<RawTestType[] | null, Error>({
    queryKey: ["factory", "products", { name }],
    queryFn: ({ signal }) => getViolations({ signal, name })
  });
};

export const useGetCurrentViolations = () => {
  return useQuery<CrawlingDataType[], Error>({
    queryKey: ["current", "violation"],
    queryFn: ({ signal }) => getCurrentViolations({ signal })
  });
};
