import { createContext, useState, useContext, useCallback } from "react";
import PropTypes from "prop-types";

/**
 * ErrorContext
 *  - Provides a global error banner mechanism.
 *  - showError(msg) raises a banner that auto‐clears after 5s.
 */
const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const showError = useCallback((msg) => {
    setError(msg);
    setTimeout(() => {
      setError(null);
    }, 5000);
  }, []);

  return (
    <ErrorContext.Provider value={{ error, showError }}>
      {children}
    </ErrorContext.Provider>
  );
}

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useError() {
  return useContext(ErrorContext);
}
