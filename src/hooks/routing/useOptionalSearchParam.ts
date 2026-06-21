import { useSearchParams } from "react-router-dom";

export function useOptionalSearchParam(paramName: string) {
  const [searchParams] = useSearchParams();

  return searchParams.get(paramName);
}