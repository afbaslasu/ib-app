// src/components/Notifications/NotificationBell.jsx

import { useState } from "react";
import { FiBell } from "react-icons/fi";
import Tooltip from "../UI/Tooltip";
import NotificationList from "./NotificationList";
import PropTypes from "prop-types";

/**
 * NotificationBell.jsx
 *  - Displays a bell icon with an unread‐count badge.
 *  - Clicking toggles the NotificationList dropdown.
 */
export default function NotificationBell() {
  // For now, use dummy data. Later, replace with real notifications from Context or React Query.
  const [open, setOpen] = useState(false);
  const notifications = [
    { id: 1, text: "New comment on your post.", read: false },
    { id: 2, text: "Your portfolio was liked!", read: false },
  ];
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <Tooltip text="Notifications">
        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle notifications"
          className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <FiBell className="text-2xl text-gray-700 dark:text-gray-200" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </Tooltip>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
          <NotificationList notifications={notifications} />
        </div>
      )}
    </div>
  );
}

NotificationBell.propTypes = {};
