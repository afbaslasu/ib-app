import PropTypes from "prop-types";
import clsx from "clsx";

/**
 * Card.jsx
 *  - Simple wrapper that applies a card‐like style.
 *  - Accepts children and custom className.
 */
export default function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        "bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
