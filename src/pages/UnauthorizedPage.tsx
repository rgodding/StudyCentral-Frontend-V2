import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import { ErrorState } from "@/components/feedback";
import { PageShell } from "@/components/layout";
import { StudyButton } from "@/components/ui";

export function UnauthorizedPage() {
  return (
    <PageShell>
      <ErrorState
        title="Access denied"
        description="You do not have permission to view this page."
        action={
          <StudyButton asChild variant="secondary">
            <Link asChild>
              <RouterLink to="/">Back to home</RouterLink>
            </Link>
          </StudyButton>
        }
      />
    </PageShell>
  );
}