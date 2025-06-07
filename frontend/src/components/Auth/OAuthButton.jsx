import PropTypes from "prop-types";

/**
 * OAuthButton.jsx
 *  - Displays a button for Google/Facebook/MetaMask login.
 *  - On click, redirects to backend `/auth/{provider}` endpoint.
 */
export default function OAuthButton({ provider, className }) {
  let label, bgClasses, iconSrc, ariaLabel;

  switch (provider) {
    case "google":
      label = "Login with Google";
      bgClasses = "bg-red-600 hover:bg-red-700";
      iconSrc = "/assets/google-icon.png";
      ariaLabel = "Login with Google";
      break;
    case "facebook":
      label = "Login with Facebook";
      bgClasses = "bg-blue-800 hover:bg-blue-900";
      iconSrc = "/assets/facebook-icon.png";
      ariaLabel = "Login with Facebook";
      break;
    case "metamask":
      label = "Login with MetaMask";
      bgClasses = "bg-yellow-600 hover:bg-yellow-700";
      iconSrc = "/assets/metamask-icon.png";
      ariaLabel = "Login with MetaMask";
      break;
    default:
      label = "Login";
      bgClasses = "bg-gray-600 hover:bg-gray-700";
      iconSrc = "";
      ariaLabel = "Login";
  }

  const handleClick = () => {
    // Replace with a popup if needed; for now, direct redirect
    window.location.href = `${import.meta.env.VITE_API_URL.replace(
      "/api",
      ""
    )}/auth/${provider}`;
  };

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`flex items-center justify-center px-4 py-2 rounded text-white font-semibold ${bgClasses} ${className}`}
    >
      {iconSrc && <img src={iconSrc} alt="" className="w-5 h-5 mr-2" />}
      {label}
    </button>
  );
}

OAuthButton.propTypes = {
  provider: PropTypes.oneOf(["google", "facebook", "metamask"]).isRequired,
  className: PropTypes.string,
};
