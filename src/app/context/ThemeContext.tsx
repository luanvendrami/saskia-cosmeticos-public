"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  PaletteMode,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

type ThemeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
};

// Create context with default value
const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize with system preference or default to light
  const [mode, setMode] = useState<PaletteMode>("light");
  const [mounted, setMounted] = useState(false);

  // Function to toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    if (typeof window !== "undefined") {
      localStorage.setItem("themeMode", mode === "light" ? "dark" : "light");
    }
  };

  // Effect to handle system preferences and stored preferences
  useEffect(() => {
    setMounted(true);

    // Check for stored preference
    const storedMode = localStorage.getItem("themeMode") as PaletteMode | null;

    if (storedMode) {
      setMode(storedMode);
    } else if (typeof window !== "undefined") {
      // Check system preference
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(prefersDarkMode ? "dark" : "light");

      // Add listener for system preference changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        setMode(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Define the theme based on the current mode
  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#ff69b4",
        light: mode === "dark" ? "#ff8dc7" : "#ffeef6",
        dark: mode === "dark" ? "#c94c8e" : "#c94c8e",
        contrastText: mode === "dark" ? "#000" : "#fff",
      },
      secondary: {
        main: "#f8c4ff",
        light: mode === "dark" ? "#ffd5ff" : "#fff1ff",
        dark: mode === "dark" ? "#d19bd1" : "#d19bd1",
      },
      background: {
        default: mode === "dark" ? "#121212" : "#ffe1ff",
        paper: mode === "dark" ? "#1e1e1e" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#333333",
        secondary: mode === "dark" ? "#aaaaaa" : "#666666",
      },
      error: {
        main: "#f44336",
      },
      warning: {
        main: "#ff9800",
      },
      success: {
        main: "#4caf50",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
      h6: {
        letterSpacing: "0.5px",
      },
    },
    components: {
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 20,
            overflow: "hidden",
            boxShadow:
              mode === "dark"
                ? "0 10px 30px rgba(0,0,0,0.4)"
                : "0 10px 30px rgba(0,0,0,0.1)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
            boxShadow:
              mode === "dark"
                ? "0 4px 12px rgba(255, 105, 180, 0.2)"
                : "0 4px 12px rgba(255, 105, 180, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                mode === "dark"
                  ? "0 6px 15px rgba(255, 105, 180, 0.3)"
                  : "0 6px 15px rgba(255, 105, 180, 0.4)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            padding: "0 4px",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor:
              mode === "dark" ? "#555 #1e1e1e" : "#d1d5db #f5f5f5",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              backgroundColor: mode === "dark" ? "#555" : "#d1d5db",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
              backgroundColor: mode === "dark" ? "#1e1e1e" : "#f5f5f5",
            },
          },
        },
      },
    },
  });

  // Don't render until after client-side hydration
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
