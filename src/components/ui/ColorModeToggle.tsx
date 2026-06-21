import { IconButton, type IconButtonProps } from "@chakra-ui/react";
import { useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

import { getColorMode, toggleColorMode } from "@/utils/colorMode";

type Props = Omit<IconButtonProps, "aria-label" | "children">;

export function ColorModeToggle(props: Props) {
  const [colorMode, setColorMode] = useState(getColorMode);

  const isDark = colorMode === "dark";

  function handleToggle() {
    const nextMode = toggleColorMode();
    setColorMode(nextMode);
  }

  return (
    <IconButton
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      size="sm"
      rounded="button"
      variant="outline"
      color="textMuted"
      borderColor="borderSubtle"
      onClick={handleToggle}
      _hover={{
        color: "textMain",
        bg: "panelBgSubtle",
        borderColor: "borderStrong",
      }}
      _active={{
        bg: "activeBg",
      }}
      {...props}
    >
      {isDark ? <LuSun /> : <LuMoon />}
    </IconButton>
  );
}