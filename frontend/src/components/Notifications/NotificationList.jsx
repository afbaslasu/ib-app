// src/components/Notifications/NotificationList.jsx

import PropTypes from "prop-types";

/**
 * NotificationList.jsx
 *  - Renders a list of notifications passed in as props.
 */
export default function NotificationList({ notifications }) {
  if (!notifications || notifications.length === 0) {
    return (
      <div className="p-4 text-gray-600 dark:text-gray-300 text-sm">
        No notifications
      </div>
    );
  }

  return (
    <ul>
      {notifications.map((notif) => (
        <li
          key={notif.id}
          className={`px-4 py-2 border-b border-gray-200 dark:border-gray-700 ${
            notif.read
              ? "bg-white dark:bg-gray-800"
              : "bg-gray-50 dark:bg-gray-700"
          }`}
        >
          <p className="text-gray-800 dark:text-gray-200 text-sm">
            {notif.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      read: PropTypes.bool.isRequired,
    })
  ).isRequired,
};
