import { useNavigate } from "react-router-dom";

import { useStudyToast } from "@/components/feedback";
import { RegisterForm } from "@/components/forms/register";
import type { RegisterSubmitValues } from "@/components/forms/register/registerSchema";
import { AuthShell } from "@/components/layout/auth";
import { useAuth } from "@/hooks";
import { routes } from "@/app/routes/routes";

export function RegisterPage() {
  const navigate = useNavigate();
  const toast = useStudyToast();

  const { register, registerStatus } = useAuth();

  const isSubmitting = registerStatus === "pending";

  async function handleSubmit(values: RegisterSubmitValues) {
    try {
      await register(values);
      console.log("values", values);
      toast.success({
        title: "Account created successfully.",
      });

      navigate(routes.dashboard, { replace: true });
    } catch {
      toast.error({
        title: "Could not create account.",
      });
    }
  }

  return (
    <AuthShell
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <RegisterForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
    </AuthShell>
  );
}