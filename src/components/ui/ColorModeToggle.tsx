import { useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

import { StudyIconButton, type StudyIconButtonProps } from "@/components/ui";
import { getColorMode, toggleColorMode } from "@/utils/colorMode";

type ColorModeToggleProps = Omit<
  StudyIconButtonProps,
  "aria-label" | "children"
>;

export function ColorModeToggle(props: ColorModeToggleProps) {
  const [colorMode, setColorMode] = useState(getColorMode);

  const isDark = colorMode === "dark";

  function handleToggle() {
    const nextMode = toggleColorMode();
    setColorMode(nextMode);
  }

  return (
    <StudyIconButton
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      size="sm"
      variant="secondary"
      onClick={handleToggle}
      {...props}
    >
      {isDark ? <LuSun /> : <LuMoon />}
    </StudyIconButton>
  );
}