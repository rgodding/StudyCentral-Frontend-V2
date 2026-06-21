import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Role = "Student" | "Teacher" | "Admin";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: Role[];
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  // Temporary placeholder.
  // Later this will come from useCurrentUser().
  const user: { role: Role } | null = null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}