import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { fetchAboutContent } from '../services/aboutService';
import { useI18n } from "../contexts/i18nContext";

/**
 * About.jsx
 *  - Company story + team members (fetched from /team).
 */
export default function About() {
  const { t } = useI18n();

  const {
    data: team,
    isLoading,
    isError,
  } = useQuery("team", () =>
    fetch("/team").then((res) => res.json().then((data) => data.members))
  );

  return (
    <>
      <Helmet>
        <title>UltraProfile+ | About</title>
        <meta name="description" content="Learn about our mission and team." />
      </Helmet>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h1 className="text-5xl font-bold mb-6">
            {t("Our Story & Mission")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {t(
              "At UltraProfile+, we combine AI, Web3, and real-time collaboration to craft world-class digital portfolios."
            )}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            {t(
              "Founded by industry leaders, we continuously push the boundaries of modern software."
            )}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center mb-12">
            {t("Meet the Team")}
          </h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <div className="text-center text-red-500">
              {t("Failed to load team.")}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden"
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary mb-4">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
