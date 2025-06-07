import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

/**
 * i18nContext
 *  - Stub for internationalization.
 *  - t(key) returns the key itself; replace with actual translation logic later.
 */
const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState("en");

  const t = (key) => {
    // In production, lookup key in a translations map
    return key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

I18nProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useI18n() {
  return useContext(I18nContext);
}
