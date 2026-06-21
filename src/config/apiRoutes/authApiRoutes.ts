import { apiBaseRoutes } from "./apiBaseRoutes";

export const authApiRoutes = {
  register: `${apiBaseRoutes.auth}/register`,
  login: `${apiBaseRoutes.auth}/login`,
  logout: `${apiBaseRoutes.auth}/logout`,
  generatorHash: `${apiBaseRoutes.auth}/generator-hash`,
} as const;