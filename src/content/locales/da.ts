export const da = {
  app: {
    name: "StudyCentral",
  },

  home: {
    eyebrow: "Frontend V2",
    title: "StudyCentral V2",
    description: "Grundstrukturen for appen virker.",
    previewPages: {
      title: "Preview-sider",
      description: "Brug disse sider til at kontrollere theme tokens og genbrugelige komponenter.",
      themePreview: "Vis theme preview",
      componentPreview: "Vis component preview",
    },
    status: {
      title: "Status",
      description: "Nuværende frontend-fundament",
      themeTokens: "Theme tokens er aktive.",
      colorMode: "Lys og mørk tilstand er forbundet.",
      layout: "Layout-komponenter er klar.",
    },
  },

  auth: {
    login: {
      fields: {
        email: {
          label: "E-mail",
          placeholder: "navn@example.com",
        },
        password: {
          label: "Adgangskode",
          placeholder: "Indtast din adgangskode",
        },
      },
      actions: {
        submit: "Log ind",
      },
    },

    register: {
      fields: {
        firstName: {
          label: "Fornavn",
          placeholder: "Indtast dit fornavn",
        },
        lastName: {
          label: "Efternavn",
          placeholder: "Indtast dit efternavn",
        },
        email: {
          label: "E-mail",
          placeholder: "navn@example.com",
        },
        password: {
          label: "Adgangskode",
          placeholder: "Opret en adgangskode",
        },
        confirmPassword: {
          label: "Bekræft adgangskode",
          placeholder: "Gentag din adgangskode",
        },
      },
      actions: {
        submit: "Opret konto",
      },
    },
  },

  validation: {
    common: {
      emailInvalid: "Indtast en gyldig e-mailadresse.",
    },

    auth: {
      firstNameRequired: "Fornavn er påkrævet.",
      lastNameRequired: "Efternavn er påkrævet.",
      emailRequired: "E-mail er påkrævet.",
      passwordRequired: "Adgangskode er påkrævet.",
      confirmPasswordRequired: "Bekræftelse af adgangskode er påkrævet.",
      passwordsDoNotMatch: "Adgangskoderne er ikke ens.",
    },
  },

  common: {
    actions: {
      addItem: "Tilføj element",
      removeItem: "Fjern element",
      tryAgain: "Prøv igen",
    },

    feedback: {
      loading: "Indlæser...",
      checkingSession: "Kontrollerer session...",
      genericErrorTitle: "Noget gik galt",
      genericErrorDescription: "De ønskede data kunne ikke indlæses.",
    },

    files: {
      selectFiles: "Vælg filer",
      selectedCount: "{{selectedCount}}/{{maxFiles}} valgt",
      noFileSelected: "Ingen fil valgt.",
      removeFile: "Fjern {{fileName}}",
    },

    colorMode: {
      switchToLight: "Skift til lys tilstand",
      switchToDark: "Skift til mørk tilstand",
    },

    language: {
      english: "English",
      danish: "Dansk",
      switchToEnglish: "Skift til engelsk",
      switchToDanish: "Skift til dansk",
    },
  },
} as const;