import { NavLink } from "react-router-dom";
import { FaHome, FaChartBar, FaCogs, FaUser } from "react-icons/fa";

/**
 * Sidebar.jsx
 *  - Shown only on Dashboard pages (desktop).
 *  - Contains navigation for user-specific sections.
 */
export default function Sidebar() {
  const links = [
    { to: "/dashboard", label: "Overview", icon: <FaHome />, exact: true },
    { to: "/dashboard/analytics", label: "Analytics", icon: <FaChartBar /> },
    { to: "/dashboard/settings", label: "Settings", icon: <FaCogs /> },
    { to: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
  ];

  return (
    <aside className="hidden lg:block lg:w-64 bg-gray-100 dark:bg-gray-900 h-screen sticky top-0">
      <nav className="mt-8">
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.exact || false}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center px-4 py-3 bg-gray-200 dark:bg-gray-800 text-primary font-semibold"
                    : "flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                }
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
