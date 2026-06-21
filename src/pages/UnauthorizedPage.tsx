import { Link } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import { ErrorState } from "@/components/feedback";
import { PageShell } from "@/components/layout";
import { StudyButton } from "@/components/ui";

export function UnauthorizedPage() {
  const { t } = useTranslation();

  return (
    <PageShell>
      <ErrorState
        title={t("unauthorized.title")}
        description={t("unauthorized.description")}
        action={
          <StudyButton asChild variant="secondary">
            <Link asChild>
              <RouterLink to="/">{t("unauthorized.backToHome")}</RouterLink>
            </Link>
          </StudyButton>
        }
      />
    </PageShell>
  );
}