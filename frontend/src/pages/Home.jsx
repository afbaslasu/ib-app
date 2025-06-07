import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import PortfolioCard from "../components/Portfolio/PortfolioCard";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { fetchPortfolioItems } from "../services/portfolioService";
import { useI18n } from "../contexts/i18nContext";

export default function Home() {
  const { t } = useI18n(); // <— you must call useI18n()
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["portfolio", { page: 1, limit: 3 }],
    queryFn: () => fetchPortfolioItems({ page: 1, limit: 3 }),
    staleTime: 60_000,
    retry: 1,
  });

  return (
    <>
      <Helmet>
        <title>UltraProfile+ | Home</title>
        <meta
          name="description"
          content="UltraProfile+—the AI-powered, real-time portfolio solution."
        />
      </Helmet>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            {t("Craft Your Digital Legacy")}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-6">
            {t(
              "Experience portfolios powered by AI, Web3, and real-time collaboration."
            )}
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/portfolio"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              {t("View Portfolio")}
            </Link>
            <Link
              to="/services"
              className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {t("Our Services")}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center mb-12">
            {t("Featured Projects")}
          </h2>
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <div className="text-center text-red-500">
              {t("Failed to load projects.")}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.map((item) => (
                <PortfolioCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center bg-primary rounded-lg text-white py-16">
          <h3 className="text-3xl font-semibold mb-4">
            {t("Ready to Launch Your Project?")}
          </h3>
          <p className="mb-8">
            {t("Schedule a free AI-driven consultation today.")}
          </p>
          <Link
            to="/contact"
            className="bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition"
          >
            {t("Contact Us")}
          </Link>
        </div>
      </section>
    </>
  );
}
