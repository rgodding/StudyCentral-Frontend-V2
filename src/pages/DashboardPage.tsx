import { HStack, Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { PageHeader, PageShell, Section } from "@/components/layout";
import { useStudyToast } from "@/components/feedback";
import { ColorModeToggle, LanguageToggle, StudyButton } from "@/components/ui";
import { useAuth } from "@/hooks";

export function DashboardPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const toast = useStudyToast();

  const { user, logout, logoutStatus } = useAuth();

  const isLoggingOut = logoutStatus === "pending";

  async function handleLogout() {
    try {
      await logout();

      toast.success({
        title: t("auth.feedback.logoutSuccess"),
      });

      navigate("/login", { replace: true });
    } catch {
      toast.error({
        title: t("auth.feedback.logoutError"),
      });
    }
  }

  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <PageShell>
      <Stack gap={4}>
        <HStack justify="flex-end" gap={2}>
          <ColorModeToggle />
          <LanguageToggle />
        </HStack>

        <PageHeader
          title={t("dashboard.title")}
          description={t("dashboard.description")}
          actions={
            <StudyButton
              type="button"
              variant="secondary"
              loading={isLoggingOut}
              onClick={handleLogout}
            >
              {t("dashboard.logout")}
            </StudyButton>
          }
        />

        <Section title={t("dashboard.title")}>
          <Stack gap={2}>
            <Text color="textMuted">
              {t("dashboard.loggedInAs", { name: fullName })}
            </Text>

            {user && (
              <Text color="textMuted">
                {t("dashboard.role", { role: user.role })}
              </Text>
            )}
          </Stack>
        </Section>
      </Stack>
    </PageShell>
  );
}
