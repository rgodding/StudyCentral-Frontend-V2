import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

/*
GENERAL: https://chakra-ui.com/docs/theming/overview
COLORS: https://palette.saas-ui.dev/
FONTS: https://fontsource.org/


*/
const config = defineConfig({
  theme: {
    tokens: {
      // Colors
      colors: {
        white: { value: "#ffffff" },
        black: { value: "#0c1015" },
        gray: {
          50: { value: "#f9fafa" },
          100: { value: "#f1f1f2" },
          200: { value: "#e6e7e9" },
          300: { value: "#d2d4d7" },
          400: { value: "#a9adb2" },
          500: { value: "#797f88" },
          600: { value: "#4d5560" },
          700: { value: "#2e3744" },
          800: { value: "#19202b" },
          900: { value: "#141a23" },
        },

        brand: {
          50: { value: "#f1f9fb" },
          100: { value: "#c6e6ed" },
          200: { value: "#93cfdd" },
          300: { value: "#53b2c9" },
          400: { value: "#2ca1bd" },
          500: { value: "#0888a7" },
          600: { value: "#06738d" },
          700: { value: "#055c71" },
          800: { value: "#044e60" },
          900: { value: "#033946" },
        },

        cyan: {
          50: { value: "#f5fbfc" },
          100: { value: "#d6edf2" },
          200: { value: "#c4e5ed" },
          300: { value: "#afdce6" },
          400: { value: "#70c0d2" },
          500: { value: "#50b3c9" },
          600: { value: "#2ba2bd" },
          700: { value: "#0787a3" },
          800: { value: "#066f86" },
          900: { value: "#055668" },
        },

        blue: {
          50: { value: "#f2f6fb" },
          100: { value: "#d0dff0" },
          200: { value: "#adc8e6" },
          300: { value: "#88afda" },
          400: { value: "#6497cf" },
          500: { value: "#4382c4" },
          600: { value: "#216bba" },
          700: { value: "#07509e" },
          800: { value: "#064181" },
          900: { value: "#05356a" },
        },

        purple: {
          50: { value: "#f8f6fc" },
          100: { value: "#e4dbf4" },
          200: { value: "#cfc0eb" },
          300: { value: "#b29adf" },
          400: { value: "#9e7fd7" },
          500: { value: "#835bcc" },
          600: { value: "#7042c4" },
          700: { value: "#5d29bc" },
          800: { value: "#490eb4" },
          900: { value: "#35068c" },
        },

        pink: {
          50: { value: "#fcf6f9" },
          100: { value: "#f4dae6" },
          200: { value: "#eabdd3" },
          300: { value: "#de94b8" },
          400: { value: "#d577a4" },
          500: { value: "#c84e89" },
          600: { value: "#be2d73" },
          700: { value: "#a70855" },
          800: { value: "#840643" },
          900: { value: "#630432" },
        },

        red: {
          50: { value: "#fcf6f6" },
          100: { value: "#f3dada" },
          200: { value: "#e9bab9" },
          300: { value: "#dd9291" },
          400: { value: "#d57b79" },
          500: { value: "#cb5957" },
          600: { value: "#c03735" },
          700: { value: "#ab0b08" },
          800: { value: "#920907" },
          900: { value: "#6c0705" },
        },

        orange: {
          50: { value: "#fdfaf7" },
          100: { value: "#f6ece1" },
          200: { value: "#ebd5be" },
          300: { value: "#dbb58c" },
          400: { value: "#cd985f" },
          500: { value: "#c07d34" },
          600: { value: "#b26109" },
          700: { value: "#8e4d06" },
          800: { value: "#703d05" },
          900: { value: "#5c3204" },
        },

        yellow: {
          50: { value: "#fefefd" },
          100: { value: "#faf9f0" },
          200: { value: "#f2edd5" },
          300: { value: "#e8e0b4" },
          400: { value: "#d9cd86" },
          500: { value: "#bda82c" },
          600: { value: "#9b8507" },
          700: { value: "#796805" },
          800: { value: "#5b4e04" },
          900: { value: "#4b4003" },
        },

        green: {
          50: { value: "#f7fcfa" },
          100: { value: "#d4f2e3" },
          200: { value: "#a4e3c5" },
          300: { value: "#6dd1a1" },
          400: { value: "#2bbd77" },
          500: { value: "#07a459" },
          600: { value: "#068849" },
          700: { value: "#056a39" },
          800: { value: "#04572f" },
          900: { value: "#034727" },
        },

        teal: {
          50: { value: "#f3fbfb" },
          100: { value: "#cdefef" },
          200: { value: "#a0e0e1" },
          300: { value: "#66cecf" },
          400: { value: "#14b3b6" },
          500: { value: "#07989b" },
          600: { value: "#067c7e" },
          700: { value: "#046062" },
          800: { value: "#045052" },
          900: { value: "#034243" },
        },
      },
      // Typography
      fonts: {
        heading: { value: "Inter, system-ui, sans-serif" },
        body: { value: "Inter, system-ui, sans-serif" },
        mono: {
          value:
            "JetBrains Mono, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        },
      },
      // Border Radius and Shape
      radii: {
        xs: { value: "4px" },
        sm: { value: "6px" },
        md: { value: "8px" },
        lg: { value: "10px" },
        xl: { value: "12px" },
        "2xl": { value: "16px" },

        card: { value: "14px" },
        panel: { value: "18px" },
        button: { value: "10px" },
      },
      // Shadows and Elevation
      shadows: {
        xs: { value: "0 1px 2px rgba(0, 0, 0, 0.18)" },
        sm: { value: "0 2px 6px rgba(0, 0, 0, 0.22)" },
        md: { value: "0 6px 16px rgba(0, 0, 0, 0.28)" },
        lg: { value: "0 12px 32px rgba(0, 0, 0, 0.34)" },

        card: {
          value: "0 1px 2px rgba(0, 0, 0, 0.28)",
        },

        panel: {
          value: "0 12px 32px rgba(0, 0, 0, 0.32)",
        },

        floating: {
          value: "0 18px 48px rgba(0, 0, 0, 0.42)",
        },
      },
      // Spacing
      spacing: {
        pageX: { value: "24px" },
        pageY: { value: "24px" },

        sectionGap: { value: "24px" },
        cardGap: { value: "16px" },
        fieldGap: { value: "12px" },
      },
      // Fixed sizes
      sizes: {
        navbarHeight: { value: "64px" },
        footerHeight: { value: "64px" },
        sidebarWidth: { value: "280px" },
        contentMaxWidth: { value: "1200px" },

        avatarSm: { value: "32px" },
        avatarMd: { value: "40px" },
        avatarLg: { value: "56px" },
      },
      // Cursors
      cursor: {
        button: { value: "pointer" },
        disabled: { value: "not-allowed" },
        draggable: { value: "grab" },
        dragging: { value: "grabbing" },
        text: { value: "text" },
        default: { value: "default" },
      },
      // Z-Index
      zIndex: {
        base: { value: "0" },
        sticky: { value: "100" },
        dropdown: { value: "1000" },
        drawer: { value: "1200" },
        modal: { value: "1400" },
        toast: { value: "1700" },
      },
      // Motion duration
      durations: {
        fast: { value: "250ms" },
        normal: { value: "500ms" },
        slow: { value: "10000ms" },
      },
      // Motion easing
      easings: {
        default: { value: "cubic-bezier(0.2, 0, 0, 1)" },
      },
      // Animations
      animations: {
        bounce: {
          value: "bounce 1.4s infinite",
        },

        ping: {
          value: "ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite",
        },

        fadeInFast: {
          value: "fade-in 250ms cubic-bezier(0.2, 0, 0, 1)",
        },

        fadeOutFast: {
          value: "fade-out 250ms cubic-bezier(0.2, 0, 0, 1)",
        },

        fadeIn: {
          value: "fade-in 500ms cubic-bezier(0.2, 0, 0, 1)",
        },

        fadeOut: {
          value: "fade-out 500ms cubic-bezier(0.2, 0, 0, 1)",
        },

        slideDownFast: {
          value:
            "slide-from-top 250ms cubic-bezier(0.2, 0, 0, 1), fade-in 250ms cubic-bezier(0.2, 0, 0, 1)",
        },

        slideUpFast: {
          value:
            "slide-from-bottom 250ms cubic-bezier(0.2, 0, 0, 1), fade-in 250ms cubic-bezier(0.2, 0, 0, 1)",
        },

        slideInFromLeft: {
          value:
            "slide-from-left 500ms cubic-bezier(0.2, 0, 0, 1), fade-in 500ms cubic-bezier(0.2, 0, 0, 1)",
        },

        slideInFromRight: {
          value:
            "slide-from-right 500ms cubic-bezier(0.2, 0, 0, 1), fade-in 500ms cubic-bezier(0.2, 0, 0, 1)",
        },

        slideInFromTop: {
          value:
            "slide-from-top 500ms cubic-bezier(0.2, 0, 0, 1), fade-in 500ms cubic-bezier(0.2, 0, 0, 1)",
        },

        slideInFromBottom: {
          value:
            "slide-from-bottom 500ms cubic-bezier(0.2, 0, 0, 1), fade-in 500ms cubic-bezier(0.2, 0, 0, 1)",
        },

        scaleInFast: {
          value:
            "scale-in 250ms cubic-bezier(0.2, 0, 0, 1), fade-in 250ms cubic-bezier(0.2, 0, 0, 1)",
        },

        scaleIn: {
          value:
            "scale-in 500ms cubic-bezier(0.2, 0, 0, 1), fade-in 500ms cubic-bezier(0.2, 0, 0, 1)",
        },
        slideOutToTopFast: {
          value:
            "slide-to-top 250ms cubic-bezier(0.2, 0, 0, 1), fade-out 250ms cubic-bezier(0.2, 0, 0, 1)",
        },
      },
    },
    // Key frames for custom animations
    keyframes: {
      "fade-in": {
        from: {
          opacity: 0,
        },
        to: {
          opacity: 1,
        },
      },

      "fade-out": {
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      },

      "slide-from-top": {
        from: {
          transform: "translateY(-8px)",
        },
        to: {
          transform: "translateY(0)",
        },
      },

      "slide-from-bottom": {
        from: {
          transform: "translateY(8px)",
        },
        to: {
          transform: "translateY(0)",
        },
      },

      "slide-from-left": {
        from: {
          transform: "translateX(-8px)",
        },
        to: {
          transform: "translateX(0)",
        },
      },

      "slide-from-right": {
        from: {
          transform: "translateX(8px)",
        },
        to: {
          transform: "translateX(0)",
        },
      },

      "scale-in": {
        from: {
          opacity: 0,
          transform: "scale(0.98)",
        },
        to: {
          opacity: 1,
          transform: "scale(1)",
        },
      },
      "slide-to-top": {
        from: {
          transform: "translateY(0)",
        },
        to: {
          transform: "translateY(-8px)",
        },
      },
    },
    // Semantic Tokens (for light/dark mode)
    semanticTokens: {
      colors: {
        appBg: {
          value: {
            base: "{colors.gray.50}",
            _dark: "{colors.black}",
          },
        },

        surfaceBg: {
          value: {
            base: "{colors.white}",
            _dark: "{colors.gray.900}",
          },
        },

        panelBg: {
          value: {
            base: "{colors.white}",
            _dark: "{colors.gray.800}",
          },
        },

        panelBgSubtle: {
          value: {
            base: "{colors.gray.100}",
            _dark: "{colors.gray.700}",
          },
        },

        borderSubtle: {
          value: {
            base: "{colors.gray.200}",
            _dark: "{colors.gray.700}",
          },
        },

        borderStrong: {
          value: {
            base: "{colors.gray.300}",
            _dark: "{colors.gray.600}",
          },
        },

        textMain: {
          value: {
            base: "{colors.gray.900}",
            _dark: "{colors.gray.50}",
          },
        },

        textMuted: {
          value: {
            base: "{colors.gray.600}",
            _dark: "{colors.gray.400}",
          },
        },

        textSubtle: {
          value: {
            base: "{colors.gray.500}",
            _dark: "{colors.gray.500}",
          },
        },

        accent: {
          value: {
            base: "{colors.brand.600}",
            _dark: "{colors.brand.400}",
          },
        },

        accentMuted: {
          value: {
            base: "{colors.brand.50}",
            _dark: "{colors.brand.900}",
          },
        },

        activeBg: {
          value: {
            base: "{colors.brand.50}",
            _dark: "{colors.brand.900}",
          },
        },

        navBg: {
          value: {
            base: "{colors.white}",
            _dark: "{colors.gray.900}",
          },
        },

        dangerText: {
          value: {
            base: "{colors.red.700}",
            _dark: "{colors.red.300}",
          },
        },

        successText: {
          value: {
            base: "{colors.green.700}",
            _dark: "{colors.green.300}",
          },
        },

        warningText: {
          value: {
            base: "{colors.orange.700}",
            _dark: "{colors.orange.300}",
          },
        },
      },
    },
  },

  globalCss: {
    "html, body, #root": {
      minHeight: "100%",
    },

    html: {
      scrollbarGutter: "stable",
    },

    body: {
      margin: 0,
      bg: "appBg",
      color: "textMain",
      fontFamily: "body",
      lineHeight: "1.5",
      textRendering: "optimizeLegibility",
    },

    "*": {
      boxSizing: "border-box",
    },

    "html.color-mode-transitioning, html.color-mode-transitioning *": {
      transitionProperty:
        "background-color, border-color, color, fill, stroke, box-shadow",
      transitionDuration: "500ms",
      transitionTimingFunction: "ease",
    },

    a: {
      color: "inherit",
      textDecoration: "none",
    },

    "button, input, textarea, select": {
      font: "inherit",
    },

    "::selection": {
      bg: "accent",
      color: "white",
    },
  },
});

export const system = createSystem(defaultConfig, config);
