import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useLogin } from "@/hooks/auth/useLogin";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRegister } from "@/hooks/auth/useRegister";

export function useAuth() {
  const currentUserQuery = useCurrentUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const user = currentUserQuery.data ?? null;

  return {
    user,
    isAuthenticated: Boolean(user),
    isLoading: currentUserQuery.isLoading,
    isFetching: currentUserQuery.isFetching,
    isStudent: user?.role === "Student",
    isTeacher: user?.role === "Teacher",
    isAdmin: user?.role === "Admin",

    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,

    loginStatus: loginMutation.status,
    registerStatus: registerMutation.status,
    logoutStatus: logoutMutation.status,

    loginError: loginMutation.error,
    registerError: registerMutation.error,
    logoutError: logoutMutation.error,

    refetchUser: currentUserQuery.refetch,
  };
}
