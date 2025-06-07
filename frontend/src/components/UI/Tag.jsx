import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * Tag.jsx
 *  - Displays a small pill/tag with variants.
 */
export default function Tag({ children, variant = "primary", className }) {
  const base = "px-3 py-1 text-sm font-medium rounded-full";
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-gray-200 text-gray-800",
  };
  return (
    <span className={clsx(base, variants[variant], className)}>{children}</span>
  );
}

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  className: PropTypes.string,
};
