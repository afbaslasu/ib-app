import { Component } from "react";
import PropTypes from "prop-types";

/**
 * ErrorBoundary.jsx
 *  - Catches React rendering errors in its subtree.
 *  - Displays a fallback UI.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Uncaught error:", error, info);
    this.setState({ errorInfo: info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-red-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center max-w-md">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Oops—something went wrong.
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Please refresh the page or contact support if the problem
              persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
