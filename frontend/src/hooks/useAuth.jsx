import { useAuth as useAuthContext } from "../contexts/AuthContext";

/**
 * useAuth
 *  - A simple alias to AuthContext’s hook (already provided).
 *  - We keep this file for consistency.
 */
export default function useAuth() {
  return useAuthContext();
}
