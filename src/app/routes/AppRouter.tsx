import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";

import { routePaths, routes } from "@/app/routes/routes";
import {
  AccountPage,
  ComponentPreviewPage,
  CourseAnnouncementsPage,
  CourseAssignmentsPage,
  CourseDetailsPage,
  CourseResourcesPage,
  CoursesPage,
  DashboardPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ThemePreviewPage,
  UnauthorizedPage,
} from "@/pages";

import { AppLayoutRoute } from "./appLayoutRoute";
import { GuestRoute, ProtectedRoute } from "./ProtectedRoutes";

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
];

// REQUIREMENT: None, but uses normal app navbar/layout
const publicLayoutRoutes: RouteObject[] = [
  {
    element: <AppLayoutRoute />,
    children: [
      {
        path: routes.themePreview,
        element: <ThemePreviewPage />,
      },
      {
        path: routes.componentPreview,
        element: <ComponentPreviewPage />,
      },
    ],
  },
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
        path: routePaths.courseDetails(":courseId"),
        element: <CourseDetailsPage />,
      },
      {
        path: routePaths.courseAnnouncements(":courseId"),
        element: <CourseAnnouncementsPage />,
      },
      {
        path: routePaths.courseAssignments(":courseId"),
        element: <CourseAssignmentsPage />,
      },
      {
        path: routePaths.courseResources(":courseId"),
        element: <CourseResourcesPage />,
      },
      {
        path: routes.account,
        element: <AccountPage />,
      },
    ],
  },
];

const router = createBrowserRouter([
  ...publicRoutes,
  ...publicLayoutRoutes,
  ...guestRoutes,
  ...protectedRoutes,
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}