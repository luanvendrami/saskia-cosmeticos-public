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

// Function to forcefully apply light mode and counter dark mode extensions
const forceLightMode = () => {
  // Add light mode classes
  document.documentElement.classList.add("light");
  document.documentElement.classList.add("light-mode");
  document.documentElement.classList.remove("dark");
  document.documentElement.classList.remove("dark-mode");

  // Force light mode styles
  document.documentElement.style.colorScheme = "light";
  document.documentElement.style.filter = "none";
  document.documentElement.style.webkitFilter = "none";
  document.documentElement.style.backgroundColor = "#ffffff";
  document.documentElement.style.color = "#333333";

  // Remove Dark Reader attributes if they exist
  if (document.documentElement.hasAttribute("data-darkreader-mode")) {
    document.documentElement.removeAttribute("data-darkreader-mode");
  }
  if (document.documentElement.hasAttribute("data-darkreader-scheme")) {
    document.documentElement.removeAttribute("data-darkreader-scheme");
  }

  // Target all elements with Dark Reader inline styles
  document
    .querySelectorAll("[data-darkreader-inline-bgcolor]")
    .forEach((el) => {
      el.removeAttribute("data-darkreader-inline-bgcolor");
    });
  document.querySelectorAll("[data-darkreader-inline-color]").forEach((el) => {
    el.removeAttribute("data-darkreader-inline-color");
  });
  document.querySelectorAll("[data-darkreader-inline-border]").forEach((el) => {
    el.removeAttribute("data-darkreader-inline-border");
  });
  document
    .querySelectorAll("[data-darkreader-inline-outline]")
    .forEach((el) => {
      el.removeAttribute("data-darkreader-inline-outline");
    });
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Force light mode and ignore browser preferences
  const [mode] = useState<PaletteMode>("light");
  const [mounted, setMounted] = useState(false);

  // Effect to handle mounted state and enforce light mode
  useEffect(() => {
    setMounted(true);

    // Apply light mode immediately
    forceLightMode();

    // Continuously check and enforce light mode every 500ms
    const intervalId = setInterval(() => {
      forceLightMode();
    }, 500);

    // Create MutationObserver to detect and counter Dark Reader changes
    const observer = new MutationObserver((mutations) => {
      const shouldForceLightMode = mutations.some((mutation) => {
        // Check for attribute changes that might be from Dark Reader
        if (mutation.type === "attributes") {
          const target = mutation.target as HTMLElement;
          if (
            target.hasAttribute("data-darkreader-mode") ||
            target.hasAttribute("data-darkreader-scheme") ||
            target.hasAttribute("data-darkreader-inline-bgcolor") ||
            target.hasAttribute("data-darkreader-inline-color")
          ) {
            return true;
          }

          // Check if the style attribute was changed to include filter properties
          if (mutation.attributeName === "style") {
            const style = target.getAttribute("style");
            if (
              style &&
              (style.includes("filter") ||
                style.includes("background") ||
                style.includes("color"))
            ) {
              return true;
            }
          }
        }
        return false;
      });

      if (shouldForceLightMode) {
        forceLightMode();
      }
    });

    // Start observing the document
    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: [
        "style",
        "class",
        "data-darkreader-mode",
        "data-darkreader-scheme",
      ],
    });

    // Clean up
    return () => {
      clearInterval(intervalId);
      observer.disconnect();
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
