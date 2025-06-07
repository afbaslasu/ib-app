/**
 * i18n.js
 *  - Stub for internationalization (i18n) initialization.
 *  - In a real project, integrate react-i18next or similar here.
 */
import { useEffect } from "react";
import { useI18n } from "./contexts/i18nContext";

export default function I18nInit() {
  const { locale } = useI18n();
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
