import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * Button.jsx
 *  - A reusable button with variants: 'primary', 'secondary', 'outline'.
 *  - Accepts any standard button props (onClick, type, etc.).
 */
export default function Button({
  children,
  variant = "primary",
  className,
  ...props
}) {
  const baseClasses =
    "font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary/50",
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["primary", "secondary", "outline"]),
  className: PropTypes.string,
};
