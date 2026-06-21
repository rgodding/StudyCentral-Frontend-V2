export const commonText = {
  actions: {
    addItem: "Add item",
    removeItem: "Remove item",
    tryAgain: "Try again",
  },

  feedback: {
    loading: "Loading...",
    checkingSession: "Checking session...",
    genericErrorTitle: "Something went wrong",
    genericErrorDescription: "The requested data could not be loaded.",
  },

  files: {
    selectFiles: "Select files",
    selected: "selected",
    noFileSelected: "No file selected.",
    removeFile: (fileName: string) => `Remove ${fileName}`,
    selectedCount: (selectedCount: number, maxFiles: number) =>
      `${selectedCount}/${maxFiles} selected`,
  },

  colorMode: {
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },
} as const;