import { HStack, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useStudyToast } from "@/components/feedback";
import { PageHeader, PageShell, Section } from "@/components/layout";
import { ColorModeToggle, StudyButton } from "@/components/ui";
import { useAuth } from "@/hooks";

export function DashboardPage() {
  const navigate = useNavigate();
  const toast = useStudyToast();

  const { user, logout, logoutStatus } = useAuth();

  const isLoggingOut = logoutStatus === "pending";

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

  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <PageShell>
      <Stack gap={4}>
        <HStack justify="flex-end" gap={2}>
          <ColorModeToggle />
        </HStack>

        <PageHeader
          title="Dashboard"
          description="This is the temporary authenticated landing page."
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

        <Section title="Dashboard">
          <Stack gap={2}>
            <Text color="textMuted">Signed in as {fullName}</Text>

            {user && <Text color="textMuted">Role: {user.role}</Text>}
          </Stack>
        </Section>
      </Stack>
    </PageShell>
  );
}