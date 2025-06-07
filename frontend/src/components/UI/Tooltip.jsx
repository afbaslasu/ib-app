import PropTypes from "prop-types";

/**
 * Tooltip.jsx
 *  - Wraps `children` and shows a small tooltip `text` on hover/focus.
 */
export default function Tooltip({ text, children }) {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        role="tooltip"
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded bg-gray-800 text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity"
      >
        {text}
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
