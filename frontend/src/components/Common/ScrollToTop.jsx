import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop.jsx
 *  - Whenever the pathname changes, scroll window to top (smooth).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}
