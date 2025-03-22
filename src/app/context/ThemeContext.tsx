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
};

// Create context with default value
const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Function to prevent dark mode extensions
const preventDarkMode = () => {
  // Remove Dark Reader attributes if they exist
  if (document.documentElement.hasAttribute("data-darkreader-mode")) {
    document.documentElement.removeAttribute("data-darkreader-mode");
  }
  if (document.documentElement.hasAttribute("data-darkreader-scheme")) {
    document.documentElement.removeAttribute("data-darkreader-scheme");
  }
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Force light mode and ignore browser preferences
  const [mode] = useState<PaletteMode>("light");
  const [mounted, setMounted] = useState(false);

  // Effect to handle mounted state and prevent dark mode
  useEffect(() => {
    setMounted(true);

    // Set light mode class
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");

    // Run prevention on mount
    preventDarkMode();

    // Check periodically for dark reader
    const intervalId = setInterval(preventDarkMode, 2000);

    // Clean up
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Define the theme based on light mode
  const theme = createTheme({
    palette: {
      mode: "light", // Always use light mode
      primary: {
        main: "#ff69b4",
        light: "#ffeef6",
        dark: "#c94c8e",
        contrastText: "#fff",
      },
      secondary: {
        main: "#f8c4ff",
        light: "#fff1ff",
        dark: "#d19bd1",
      },
      background: {
        default: "#ffe1ff",
        paper: "#ffffff",
      },
      text: {
        primary: "#333333",
        secondary: "#666666",
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
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
            boxShadow: "0 4px 12px rgba(255, 105, 180, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 6px 15px rgba(255, 105, 180, 0.4)",
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
            scrollbarColor: "#d1d5db #f5f5f5",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              backgroundColor: "#d1d5db",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
              backgroundColor: "#f5f5f5",
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
    <ThemeContext.Provider value={{ mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
