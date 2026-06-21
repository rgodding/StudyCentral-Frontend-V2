export const en = {
  app: {
    name: "StudyCentral",
  },

  home: {
    eyebrow: "Frontend V2",
    title: "StudyCentral V2",
    description: "Base app structure is working.",
    previewPages: {
      title: "Preview pages",
      description:
        "Use these pages to verify theme tokens and reusable components.",
      themePreview: "View theme preview",
      componentPreview: "View component preview",
      login: "View login page",
    },
    status: {
      title: "Status",
      description: "Current frontend foundation",
      themeTokens: "Theme tokens are active.",
      colorMode: "Light and dark mode are connected.",
      layout: "Layout components are ready.",
    },
  },

  auth: {
    login: {
      fields: {
        email: {
          label: "Email",
          placeholder: "name@example.com",
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
        },
      },
      actions: {
        submit: "Sign in",
      },
    },

    register: {
      fields: {
        firstName: {
          label: "First name",
          placeholder: "Enter your first name",
        },
        lastName: {
          label: "Last name",
          placeholder: "Enter your last name",
        },
        email: {
          label: "Email",
          placeholder: "name@example.com",
        },
        password: {
          label: "Password",
          placeholder: "Create a password",
        },
        confirmPassword: {
          label: "Confirm password",
          placeholder: "Repeat your password",
        },
      },
      actions: {
        submit: "Create account",
      },
    },
    pages: {
      login: {
        eyebrow: "Welcome back",
        title: "Sign in to StudyCentral",
        description:
          "Access your courses, assignments, study folders and messages.",
        registerPrompt: "Do not have an account?",
        registerLink: "Create one",
      },
      register: {
        eyebrow: "Create account",
        title: "Join StudyCentral",
        description:
          "Create an account to access your courses and study material.",
        loginPrompt: "Already have an account?",
        loginLink: "Sign in",
      },
    },

    feedback: {
      loginSuccess: "Signed in successfully.",
      loginError: "Could not sign in.",
      registerSuccess: "Account created successfully.",
      registerError: "Could not create account.",
      logoutSuccess: "Signed out successfully.",
      logoutError: "Could not sign out.",
    },
  },

  dashboard: {
    title: "Dashboard",
    description: "This is the temporary authenticated landing page.",
    loggedInAs: "Signed in as {{name}}",
    role: "Role: {{role}}",
    logout: "Log out",
  },

  unauthorized: {
    title: "Access denied",
    description: "You do not have permission to view this page.",
    backToHome: "Back to home",
  },

  validation: {
    common: {
      emailInvalid: "Enter a valid email address.",
    },

    auth: {
      firstNameRequired: "First name is required.",
      lastNameRequired: "Last name is required.",
      emailRequired: "Email is required.",
      passwordRequired: "Password is required.",
      confirmPasswordRequired: "Confirm password is required.",
      passwordsDoNotMatch: "Passwords do not match.",
    },
  },

  common: {
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
      selectedCount: "{{selectedCount}}/{{maxFiles}} selected",
      noFileSelected: "No file selected.",
      removeFile: "Remove {{fileName}}",
    },

    colorMode: {
      switchToLight: "Switch to light mode",
      switchToDark: "Switch to dark mode",
    },

    language: {
      english: "English",
      danish: "Dansk",
      switchToEnglish: "Switch to English",
      switchToDanish: "Switch to Danish",
    },
  },
} as const;
