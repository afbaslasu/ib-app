import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useInfiniteQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import BlogPostCard from "../components/Blog/BlogPostCard";
import Button from "../components/UI/Button";
import { fetchAllPosts } from "../services/blogService";
import { useI18n } from "../contexts/i18nContext";

export default function Blog() {
  const { t } = useI18n();
  const [tag, setTag] = useState("");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["blog", tag],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllPosts({ page: pageParam, limit: 6, tag }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < 6 ? undefined : pages.length + 1,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Helmet>
        <title>UltraProfile+ | Blog</title>
        <meta
          name="description"
          content="Insights on AI, Web3, UX, and modern engineering."
        />
      </Helmet>

      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">{t("Our Blog")}</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {t("Stay updated with our latest articles and tutorials.")}
          </p>
          {/* Tag Filters */}
          <div className="flex justify-center space-x-2 flex-wrap mb-4">
            {["", "AI", "Web3", "UX"].map((tgt) => (
              <button
                key={tgt}
                onClick={() => setTag(tgt)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  tag === tgt
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                } mb-2`}
              >
                {tgt === "" ? t("All") : tgt}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <div className="text-center text-red-500">
              {t("Failed to load posts.")}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.pages.map((page) =>
                  page.map((post) => (
                    <BlogPostCard
                      key={post._id}
                      post={post}
                      onTagClick={setTag}
                    />
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
