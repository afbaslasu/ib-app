import PropTypes from "prop-types";
import Button from "../UI/Button";
import OAuthButton from "./OAuthButton";

/**
 * LoginModal.jsx
 *  - Modal that appears when users click “Login” on mobile or in protected pages.
 *  - Lists OAuthButton components.
 */
export default function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-sm w-full p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">
          Log In / Sign Up
        </h2>
        <div className="space-y-4">
          <OAuthButton provider="google" className="w-full" />
          <OAuthButton provider="facebook" className="w-full" />
          <OAuthButton provider="metamask" className="w-full" />
        </div>
        <Button variant="outline" onClick={onClose} className="mt-6 w-full">
          Close
        </Button>
      </div>
    </div>
  );
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
