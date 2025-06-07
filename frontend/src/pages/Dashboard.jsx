import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Sidebar from "../components/Layout/Sidebar";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import Button from "../components/UI/Button";

/**
 * Dashboard.jsx
 *  - Protected route (only for logged-in users).
 *  - Shows summary metrics of user’s portfolio and blog posts.
 */
export default function Dashboard() {
  const { data: portfolio, isLoading: loadingPortfolio } = useQuery(
    "portfolioDashboard",
    () => fetch("/portfolio/dashboard").then((res) => res.json())
  );
  const { data: blog, isLoading: loadingBlog } = useQuery("blogDashboard", () =>
    fetch("/blog/dashboard").then((res) => res.json())
  );

  return (
    <div className="flex">
      <Sidebar />
      <section className="flex-1 py-20">
        <Helmet>
          <title>Dashboard | UltraProfile+</title>
        </Helmet>
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Your Projects</h2>
              {loadingPortfolio ? (
                <LoadingSpinner />
              ) : (
                <p className="text-4xl">{portfolio?.count || 0}</p>
              )}
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Your Blog Posts</h2>
              {loadingBlog ? (
                <LoadingSpinner />
              ) : (
                <p className="text-4xl">{blog?.count || 0}</p>
              )}
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Account Actions</h2>
              <Button
                variant="secondary"
                className="mb-2"
                onClick={() => (window.location.href = "/dashboard/settings")}
              >
                Settings
              </Button>
              <Button
                variant="secondary"
                onClick={() => (window.location.href = "/dashboard/profile")}
              >
                Profile
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
