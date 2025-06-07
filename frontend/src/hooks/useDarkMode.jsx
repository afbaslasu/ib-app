import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

/**
 * useDarkMode
 *  - Syncs system preference (prefers‐color‐scheme) with our ThemeContext.
 */
export default function useDarkMode() {
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    if (mq.matches && !darkMode) {
      toggleDarkMode();
    }
    // Listen for changes
    const handler = (e) => {
      if (e.matches && !darkMode) toggleDarkMode();
      if (!e.matches && darkMode) toggleDarkMode();
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [darkMode, toggleDarkMode]);
}
