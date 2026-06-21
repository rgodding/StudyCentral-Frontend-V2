import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { LoadingState } from "@/components/feedback";
import { useAuth } from "@/hooks";
import type { UserRole } from "@/types/api/enums";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: UserRole[];
};

type GuestRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState text="Checking session..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export function GuestRoute({ children }: GuestRouteProps) {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState text="Checking session..." />;
  }

  if (user) {
    const from = location.state?.from?.pathname ?? "/dashboard";
    return <Navigate to={from} replace />;
  }

  return children;
}