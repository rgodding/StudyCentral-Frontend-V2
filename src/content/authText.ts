export const authText = {
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
} as const;