import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * ProtectedRoute.jsx
 *  - Wraps routes that require authentication.
 *  - While loading, shows a spinner; if not logged in, redirects to home.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center py-20">Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
