import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";
import PropTypes from "prop-types";

/**
 * DarkModeToggle
 *  - Reads `darkMode` from ThemeContext and toggles it on click.
 *  - Shows a sun icon in dark mode (to switch back to light), and a moon icon in light mode.
 */
export default function DarkModeToggle({ className }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        darkMode
          ? "bg-gray-700 text-yellow-400 focus:ring-yellow-400"
          : "bg-gray-200 text-gray-800 focus:ring-primary"
      } ${className || ""}`}
    >
      {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
    </button>
  );
}

DarkModeToggle.propTypes = {
  className: PropTypes.string,
};
