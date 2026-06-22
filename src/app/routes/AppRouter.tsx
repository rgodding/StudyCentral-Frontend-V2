import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

import { AppLayoutRoute } from "./appLayoutRoute";
import { GuestRoute, ProtectedRoute } from "./ProtectedRoutes";
import HomePage from "@/pages/HomePage";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { UnauthorizedPage } from "@/pages/UnauthorizedPage";
import { CoursesPage } from "@/pages/courses/CoursesPage";
import { routes } from "@/app/routes/routes";
import { CourseDetailsPage } from "@/pages/courses/CourseDetailsPage";
import { ComponentPreviewPage } from "@/pages/ComponentPreviewPage";

// REQUIREMENT: None
const publicRoutes: RouteObject[] = [
  {
    path: routes.home,
    element: <HomePage />,
  },
  {
    path: routes.unauthorized,
    element: <UnauthorizedPage />,
  },
  {
    path: "theme-preview",
    element: <ComponentPreviewPage />,
  },
  {
    path: "component-preview",
    element: <ComponentPreviewPage />,
  }
];

// REQUIREMENT: User must be unauthenticated
const guestRoutes: RouteObject[] = [
  {
    path: routes.login,
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: routes.register,
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
        path: routes.dashboard,
        element: <DashboardPage />,
      },
      {
        path: routes.courses,
        element: <CoursesPage />,
      },
      
      {
        path: routes.courses + "/:courseId",
        element: <CourseDetailsPage />,
      },
      {
        path: routes.account,
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

/*
gonna go through them all now



where it is relevant do add like



1. animation options

2. size

3. color


*/