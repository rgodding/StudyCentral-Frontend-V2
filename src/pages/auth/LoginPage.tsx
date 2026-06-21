import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { useStudyToast } from "@/components/feedback";
import { useAuth } from "@/hooks";
import type { LoginFormValues } from "@/components/forms/login/loginSchema";
import { AuthShell } from "@/components/layout/auth";
import { LoginForm } from "@/components/forms/login/LoginForm";

export function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useStudyToast();

  const { login, loginStatus } = useAuth();

  const isSubmitting = loginStatus === "pending";

  async function handleSubmit(values: LoginFormValues) {
    try {
      await login(values);

      toast.success({
        title: t("auth.feedback.loginSuccess"),
      });

      const from = location.state?.from?.pathname ?? "/dashboard";

      navigate(from, { replace: true });
    } catch {
      toast.error({
        title: t("auth.feedback.loginError"),
      });
    }
  }

  return (
    <AuthShell
      eyebrow={t("auth.pages.login.eyebrow")}
      title={t("auth.pages.login.title")}
      description={t("auth.pages.login.description")}
      footerText={t("auth.pages.login.registerPrompt")}
      footerLinkText={t("auth.pages.login.registerLink")}
      footerLinkTo="/register"
    >
      <LoginForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </AuthShell>
  );
}
