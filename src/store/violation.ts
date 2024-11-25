import { useQuery } from "@tanstack/react-query";
import { getCurrentViolationDetail, getCurrentViolations, getViolations } from "../util/http";

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

export const useGetCurrentViolation = (link: string) => {
  return useQuery<CurrentViolationDetailType, Error>({
    queryKey: ["current", "violation", { link }],
    queryFn: ({ signal }) => getCurrentViolationDetail({ signal, link })
  });
};
