import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { formatDate } from "../utils/formatDate";
import Button from "../components/UI/Button";
import { useI18n } from "../contexts/i18nContext";

/**
 * PortfolioDetail.jsx
 *  - Displays the full details of a portfolio item (images carousel, description, likes, etc.).
 */
export default function PortfolioDetail() {
  const { t } = useI18n();
  const { slug } = useParams();

  const {
    data: item,
    isLoading,
    isError,
  } = useQuery(["portfolioDetail", slug], () =>
    fetch(`/portfolio/${slug}`).then((res) =>
      res.json().then((data) => data.item)
    )
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError || !item)
    return <div className="text-center py-20">{t("Project not found.")}</div>;

  const handleLike = async () => {
    await fetch(`/portfolio/${item._id}/like`, { method: "POST" });
    // Ideally, invalidate/refetch here
  };

  return (
    <>
      <Helmet>
        <title>{item.title} | UltraProfile+</title>
        <meta name="description" content={item.description.substring(0, 150)} />
      </Helmet>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold mb-2">{item.title}</h1>
          <p className="text-gray-500 mb-6">
            {t("Published on")} {formatDate(item.date)}
          </p>

          {/* Image Gallery (2-column grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {item.images && item.images.length > 0 ? (
              item.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`${item.title} ${idx + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                  loading="lazy"
                />
              ))
            ) : (
              <img
                src="/assets/placeholder.png"
                alt="Placeholder"
                className="w-full h-64 object-cover rounded-lg shadow-md"
                loading="lazy"
              />
            )}
          </div>

          <div className="prose dark:prose-dark mb-8">
            <p>{item.description}</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleLike}>
              {t("Like")} ({item.likes || 0})
            </Button>
            <a
              href={item.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              {t("Visit Project")} ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
