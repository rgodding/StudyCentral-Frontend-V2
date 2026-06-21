import { useParams } from "react-router-dom";

export function useRequiredParam(paramName: string) {
  const params = useParams();
  const value = params[paramName];

  if (!value) {
    throw new Error(`Missing required route parameter: ${paramName}`);
  }

  return value;
}
