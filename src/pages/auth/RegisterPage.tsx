import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useStudyToast } from "@/components/feedback";
import { RegisterForm } from "@/components/forms/register";
import type { RegisterSubmitValues } from "@/components/forms/register/registerSchema";
import { useAuth } from "@/hooks";
import { AuthShell } from "@/components/layout/auth";

export function RegisterPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useStudyToast();

  const { register, registerStatus } = useAuth();

  const isSubmitting = registerStatus === "pending";

  async function handleSubmit(values: RegisterSubmitValues) {
    try {
      await register(values);

      toast.success({
        title: t("auth.feedback.registerSuccess"),
      });

      navigate("/dashboard", { replace: true });
    } catch {
      toast.error({
        title: t("auth.feedback.registerError"),
      });
    }
  }

  return (
    <AuthShell
      eyebrow={t("auth.pages.register.eyebrow")}
      title={t("auth.pages.register.title")}
      description={t("auth.pages.register.description")}
      footerText={t("auth.pages.register.loginPrompt")}
      footerLinkText={t("auth.pages.register.loginLink")}
      footerLinkTo="/login"
    >
      <RegisterForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
    </AuthShell>
  );
}
