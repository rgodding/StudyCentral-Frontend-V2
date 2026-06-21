import { apiBaseRoutes } from "./apiBaseRoutes";

export const accountApiRoutes = {
  me: `${apiBaseRoutes.account}/me`,
  password: `${apiBaseRoutes.account}/password`,
  profilePicture: `${apiBaseRoutes.account}/profile-picture`,
} as const;