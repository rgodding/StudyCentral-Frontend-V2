import { useTranslation } from "react-i18next";

import { StudyButton, type StudyButtonProps } from "@/components/ui";
import type { SupportedLanguage } from "@/content";
import { setLanguage } from "@/i18n";

type LanguageToggleProps = Omit<StudyButtonProps, "children" | "onClick">;

export function LanguageToggle(props: LanguageToggleProps) {
  const { t, i18n } = useTranslation();

  const isDanish = i18n.resolvedLanguage?.startsWith("da") ?? false;
  const nextLanguage: SupportedLanguage = isDanish ? "en" : "da";

  async function handleToggle() {
    await setLanguage(nextLanguage);
  }

  return (
    <StudyButton
      type="button"
      variant="secondary"
      size="sm"
      aria-label={
        isDanish
          ? t("common.language.switchToEnglish")
          : t("common.language.switchToDanish")
      }
      onClick={handleToggle}
      {...props}
    >
      {isDanish ? t("common.language.english") : t("common.language.danish")}
    </StudyButton>
  );
}