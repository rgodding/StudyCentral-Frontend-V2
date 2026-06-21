import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";

import { AppLayoutRoute } from "./AppLayoutRoute";
import { GuestRoute, ProtectedRoute } from "./ProtectedRoutes";
import HomePage from "@/pages/HomePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";

// REQUIREMENT: None
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
];

// REQUIREMENT: User must be unauthenticated
const guestRoutes: RouteObject[] = [
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
];

// REQUIREMENT: User must be authenticated
const protectedRoutes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <AppLayoutRoute />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/courses",
        element: <div>Courses page</div>,
      },
      {
        path: "/account",
        element: <div>Account page</div>,
      },
    ],
  },
];
  
const router = createBrowserRouter([
  ...publicRoutes,
  ...guestRoutes,
  ...protectedRoutes,
]);




export function AppRouter() {
  return <RouterProvider router={router} />;
}