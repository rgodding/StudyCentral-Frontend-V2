export type ColorMode = "light" | "dark";

export const COLOR_MODE_STORAGE_KEY = "studycentral-color-mode";
export const COLOR_MODE_CHANGE_EVENT = "studycentral-color-mode-change";

export function getColorMode(): ColorMode {
  if (typeof window === "undefined") return "light";

  const savedMode = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);

  return savedMode === "dark" ? "dark" : "light";
}

export function applyColorMode(mode: ColorMode) {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(mode);
  root.style.colorScheme = mode;

  window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode);
}

export function setColorMode(mode: ColorMode) {
  applyColorMode(mode);

  window.dispatchEvent(
    new CustomEvent<ColorMode>(COLOR_MODE_CHANGE_EVENT, {
      detail: mode,
    }),
  );
}

export function toggleColorMode() {
  const currentMode = getColorMode();
  const nextMode: ColorMode = currentMode === "dark" ? "light" : "dark";

  setColorMode(nextMode);

  return nextMode;
}