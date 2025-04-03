import { extendTheme } from "@mui/joy/styles";

const customTheme = extendTheme({
  fontFamily: {
    body: '"Lato", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"',
    heading:
      '"Lato", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"',
    code: '"Fira Code", "Courier New", monospace',
  },
  // Optional: Customize typography levels
  typography: {
    h1: {
      fontFamily: "var(--joy-fontFamily-heading)",
      fontWeight: 700,
    },
    body1: {
      fontFamily: "var(--joy-fontFamily-body)",
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: "#f0f7ff",
          100: "#cce8ff",
          200: "#99d1ff",
          500: "#007bff", // Main primary color for light mode
          700: "#005bb5",
          800: "#0A2744",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          500: "#757575", // Main neutral color
          900: "#212121",
        },
        background: {
          body: "#ffffff", // Light mode background
          level1: "#f5f5f5",
          transparent: "rgba(255, 255, 255, 0.9)", // White with opacity for light mode
        },
        text: {
          primary: "#212121", // Light mode text
        },
      },
    },
    dark: {
      palette: {
        primary: {
          50: "#1a2b47",
          100: "#334b7d",
          200: "#4d6ca9",
          500: "#6690ff", // Main primary color for dark mode
          700: "#4c6ecc",
          800: "#E3EFFB)",
        },
        neutral: {
          50: "#2a2a2a",
          100: "#424242",
          500: "#bdbdbd", // Main neutral color
          900: "#e0e0e0",
        },
        background: {
          body: "#121212", // Dark mode background
          level1: "#1e1e1e",
          transparent: "rgba(0, 0, 0, 0.85)", // Black with opacity for dark mode
        },
        text: {
          primary: "#e0e0e0", // Dark mode text
        },
      },
    },
  },
  components: {
    JoySelect: {
      defaultProps: {
        variant: "outlined",
        color: "neutral",
      },
      styleOverrides: {
        root: {
          fontFamily: "var(--joy-fontFamily-body)",
          borderRadius: "8px",
          padding: "8px 12px",
          transition: "background-color 0.2s ease, border-color 0.2s ease", // Smooth transitions
          "&:hover": {
            backgroundColor: "var(--joy-palette-neutral-100)", // Lighten on hover
            borderColor: "var(--joy-palette-primary-100)", // Highlight border
          },
          "&:focus-within": {
            borderColor: "var(--joy-palette-primary-500)", // Focus state
            boxShadow: "0 0 0 2px var(--joy-palette-primary-200)", // Focus ring
          },
        },
        listbox: {
          backgroundColor: "var(--joy-palette-background-body)", // Dropdown background
          border: "1px solid var(--joy-palette-neutral-500)",
          "& .MuiOption-root": {
            "&:hover": {
              backgroundColor: "var(--joy-palette-neutral-50)", // Option hover
            },
          },
        },
      },
    },

    JoyLink: {
      defaultProps: {
        color: "var(--joy-palette-primary-400)",
        underline: "none",
      },
      styleOverrides: {
        root: {
          fontFamily: "var(--joy-fontFamily-body)",
          fontWeight: 500,
          transition: "color 0.2s ease, text-decoration-color 0.2s ease",
          color: "var(--joy-palette-primary-400)",
          "&:hover": {
            color: "var(--joy-palette-primary-700)",
            textDecorationColor: "var(--joy-palette-primary-700)", // Match underline to text
          },
          "&:visited": {
            // color: "var(--joy-palette-neutral-500)", // Visited link color
          },
          "&:active": {
            color: "var(--joy-palette-primary-500)", // Active state
          },
        },
      },
    },

    JoyButton: {
      // Default props for all buttons
      defaultProps: {
        variant: "solid", // Options: "solid", "soft", "outlined", "plain"
        color: "primary", // Options: "primary", "neutral", "success", etc.
        size: "md", // Options: "sm", "md", "lg"
      },
      // Global style overrides
      styleOverrides: {
        root: {
          fontFamily: "var(--joy-fontFamily-body)",
          borderRadius: "8px", // Rounded corners
          padding: "8px 16px", // Custom padding
          textTransform: "none", // Prevent uppercase text
          transition: "background-color 0.2s ease, transform 0.1s ease", // Smooth transitions

          "&:active": {
            transform: "scale(0.98)", // Slight press effect
          },
          "&:focus": {
            boxShadow: "0 0 0 3px var(--joy-palette-primary-200)", // Focus ring
          },
          "&.Mui-disabled": {
            opacity: 0.6, // Dim when disabled
            cursor: "not-allowed",
          },
        },
        // Variant-specific overrides
        variantSolid: {
          backgroundColor: "var(--joy-palette-primary-500)",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "var(--joy-palette-primary-700)", // Darker shade on hover
            transform: "scale(1.02)", // Slight scale-up effect
          },
        },
        variantOutlined: {
          borderColor: "var(--joy-palette-neutral-500)",
          color: "var(--joy-palette-text-primary)",
          "&:hover": {
            borderColor: "var(--joy-palette-primary-500)",
            backgroundColor: "var(--joy-palette-neutral-50)",
          },
        },
      },
    },
  },
});

export default customTheme;
