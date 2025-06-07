import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import PortfolioCard from "../components/Portfolio/PortfolioCard";
import Button from "../components/UI/Button";
import { fetchPortfolioItems } from "../services/portfolioService";
import { useI18n } from "../contexts/i18nContext";

export default function Portfolio() {
  const { t } = useI18n();
  const [category, setCategory] = useState("");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["portfolio", category],
    queryFn: ({ pageParam = 1 }) =>
      fetchPortfolioItems({ page: pageParam, limit: 6, category }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < 6 ? undefined : pages.length + 1,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Helmet>
        <title>UltraProfile+ | Portfolio</title>
        <meta
          name="description"
          content="Browse our cutting-edge portfolio projects."
        />
      </Helmet>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-center mb-8">
            {t("Portfolio")}
          </h1>

          {/* Category Filters */}
          <div className="flex justify-center space-x-4 mb-8 flex-wrap">
            {["", "mobile", "web", "design"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                  category === cat
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } transition mb-2`}
              >
                {cat === ""
                  ? t("All")
                  : t(cat.charAt(0).toUpperCase() + cat.slice(1))}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <div className="text-center text-red-500">
              {t("Failed to load portfolio.")}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.pages.map((page) =>
                  page.map((item) => (
                    <PortfolioCard key={item._id} item={item} />
                  ))
                )}
              </div>
              {hasNextPage && (
                <div className="text-center mt-12">
                  <Button
                    variant="primary"
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? t("Loading...") : t("Load More")}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
