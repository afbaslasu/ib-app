import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

/**
 * NotFound.jsx
 *  - Simple 404 page with a link back home.
 */
export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <Helmet>
        <title>404 Not Found | UltraProfile+</title>
      </Helmet>
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8">
          Page Not Found
        </p>
        <Link
          to="/"
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition"
          aria-label="Go back to Home"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
