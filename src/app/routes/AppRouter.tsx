import { GuestRoute, ProtectedRoute } from "@/app/routes/ProtectedRoutes";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ComponentPreviewPage } from "@/pages/ComponentPreviewPage";
import { DashboardPage } from "@/pages/DashboardPage";
import HomePage from "@/pages/HomePage";
import { ThemePreviewPage } from "@/pages/ThemePreviewPage";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <RegisterPage />
      </GuestRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["Student", "Teacher"]}>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "/theme-preview",
    element: <ThemePreviewPage />,
  },
  {
    path: "/component-preview",
    element: <ComponentPreviewPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}