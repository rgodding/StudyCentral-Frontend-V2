import { Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useStudyToast } from "@/components/feedback";
import { PageHeader, Section } from "@/components/layout";
import { StudyButton } from "@/components/ui";
import { useAuth } from "@/hooks";

export function DashboardPage() {
  const navigate = useNavigate();
  const toast = useStudyToast();

  const { user, logout, logoutStatus } = useAuth();

  const isLoggingOut = logoutStatus === "pending";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Unknown user";

  async function handleLogout() {
    try {
      await logout();

      toast.success({
        title: "Signed out successfully.",
      });

      navigate("/login", { replace: true });
    } catch {
      toast.error({
        title: "Could not sign out.",
      });
    }
  }

  return (
    <Stack gap={6} p={6}>
      <PageHeader
        title="Dashboard"
        description="Temporary authenticated landing page."
        actions={
          <StudyButton
            type="button"
            variant="secondary"
            loading={isLoggingOut}
            onClick={handleLogout}
          >
            Sign out
          </StudyButton>
        }
      />

      <Section title="Session">
        <Stack gap={2}>
          <Text color="textMuted">Signed in as {fullName}</Text>

          {user && <Text color="textMuted">Role: {user.role}</Text>}
        </Stack>
      </Section>
    </Stack>
  );
}