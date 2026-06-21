import { useNavigate } from "react-router-dom";

import { useStudyToast } from "@/components/feedback";
import { RegisterForm } from "@/components/forms/register";
import type { RegisterSubmitValues } from "@/components/forms/register/registerSchema";
import { AuthShell } from "@/components/layout/auth";
import { useAuth } from "@/hooks";

export function RegisterPage() {
  const navigate = useNavigate();
  const toast = useStudyToast();

  const { register, registerStatus } = useAuth();

  const isSubmitting = registerStatus === "pending";

  async function handleSubmit(values: RegisterSubmitValues) {
    try {
      await register(values);

      toast.success({
        title: "Account created successfully.",
      });

      navigate("/dashboard", { replace: true });
    } catch {
      toast.error({
        title: "Could not create account.",
      });
    }
  }

  return (
    <AuthShell
      eyebrow="Create account"
      title="Join StudyCentral"
      description="Create an account to access your courses and study material."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <RegisterForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
    </AuthShell>
  );
}