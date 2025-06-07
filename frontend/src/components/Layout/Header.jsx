import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import DarkModeToggle from "../UI/DarkModeToggle";
import OAuthButton from "../Auth/OAuthButton";
import NotificationBell from "../Notifications/NotificationBell";

/**
 * Header.jsx
 *  - Responsive header with logo, navigation links, auth buttons, and dark mode toggle.
 *  - Mobile menu toggles via state.
 */
export default function Header() {
  const { darkMode } = useTheme();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          aria-label="UltraProfile+ Home"
          className="flex items-center"
        >
          <img src="/assets/logo.svg" alt="Logo" className="h-10 w-10 mr-2" />
          <span className="text-2xl font-bold text-primary">UltraProfile+</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-primary font-semibold"
                  : "text-gray-700 dark:text-gray-200 hover:text-primary"
              }
            >
              {link.label}
            </NavLink>
          ))}

          {user ? (
            <>
              <NavLink
                to="/dashboard"
                className="text-gray-700 dark:text-gray-200 hover:text-primary"
              >
                Dashboard
              </NavLink>
              <button
                onClick={logout}
                className="text-gray-700 dark:text-gray-200 hover:text-primary"
              >
                Logout
              </button>
              <NotificationBell />
            </>
          ) : (
            <>
              <OAuthButton provider="google" />
              <OAuthButton provider="facebook" />
              <OAuthButton provider="metamask" />
            </>
          )}

          <DarkModeToggle />
        </nav>

        {/* Mobile Hamburger */}
        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden focus:outline-none"
        >
          <span className="sr-only">Open main menu</span>
          {mobileOpen ? (
            <svg
              className="h-8 w-8 text-gray-700 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-8 w-8 text-gray-700 dark:text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-primary"
                }
              >
                {link.label}
              </NavLink>
            ))}

            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary"
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="text-gray-700 dark:text-gray-200 hover:text-primary"
                >
                  Logout
                </button>
                <NotificationBell />
              </>
            ) : (
              <>
                <OAuthButton provider="google" />
                <OAuthButton provider="facebook" />
                <OAuthButton provider="metamask" />
              </>
            )}
            <DarkModeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}

DarkModeToggle.propTypes = {
  // No props here—just a placeholder for linter
};
