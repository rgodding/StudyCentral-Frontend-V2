import { LoadingState } from "@/components/feedback";
import { useAuth } from "@/hooks";
import type { UserRole } from "@/types/api/enums";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router-dom";

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
  const { t } = useTranslation();
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState text={t("common.feedback.checkingSession")} />;
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
  const { t } = useTranslation();
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingState text={t("common.feedback.checkingSession")} />;
  }

  if (user) {
    const from = location.state?.from?.pathname ?? "/dashboard";
    return <Navigate to={from} replace />;
  }

  return children;
}