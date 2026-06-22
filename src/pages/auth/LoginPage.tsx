import { useLocation, useNavigate } from "react-router-dom";

import { useStudyToast } from "@/components/feedback";
import { LoginForm } from "@/components/forms/login/LoginForm";
import type { LoginFormValues } from "@/components/forms/login/loginSchema";
import { AuthShell } from "@/components/layout/auth";
import { useAuth } from "@/hooks";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useStudyToast();

  const { login, loginStatus } = useAuth();

  const isSubmitting = loginStatus === "pending";

  async function handleSubmit(values: LoginFormValues) {
    try {
      await login(values);

      toast.success({
        title: "Signed in successfully.",
      });

      const from = location.state?.from?.pathname ?? "/dashboard";

      navigate(from, { replace: true });
    } catch {
      toast.error({
        title: "Could not sign in.",
      });
    }
  }

  return (
    <AuthShell
      footerText="Do not have an account?"
      footerLinkText="Create one"
      footerLinkTo="/register"
    >
      <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </AuthShell>
  );
}