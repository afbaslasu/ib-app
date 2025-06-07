import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  loginWithProvider,
  loginMetaMask,
  fetchUserProfile,
  logoutUser,
} from "../services/authService";

/**
 * AuthContext
 *  - Manages JWT in localStorage + current user state.
 *  - login(provider) handles Google/Facebook or MetaMask.
 *  - logout() clears token & user.
 */
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [loading, setLoading] = useState(true);

  // On mount or whenever token changes, fetch user profile (or use fake stub)
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        // No token yet—load a fake user for now
        setUser({ id: "123", name: "Fake User", email: "fake@mail.com" });
        setLoading(false);
        return;
      }
      try {
        const profile = await fetchUserProfile(token);
        setUser(profile);
      } catch (err) {
        console.error("Error fetching profile:", err);
        localStorage.removeItem("jwt");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [token]);

  // login: provider = 'google' | 'facebook' | 'metamask'
  const login = async (provider) => {
    setLoading(true);
    try {
      const response =
        provider === "metamask"
          ? await loginMetaMask()
          : await loginWithProvider(provider);
      localStorage.setItem("jwt", response.token);
      setToken(response.token);
      setUser(response.user);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser(token); // fire‐and‐forget to server
    localStorage.removeItem("jwt");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
