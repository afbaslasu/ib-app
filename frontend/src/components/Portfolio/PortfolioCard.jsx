import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { useLikePortfolio } from "../../hooks/usePortfolio";
import { FaThumbsUp } from "react-icons/fa";

/**
 * PortfolioCard.jsx
 *  - Displays a summary card for a portfolio item.
 *  - Shows image, title, description excerpt, likes button, and “View Details” link.
 */
export default function PortfolioCard({ item }) {
  const likeMutation = useLikePortfolio();

  const handleLike = () => {
    // Optimistic update handled in the hook
    likeMutation.mutate(item._id);
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden group hover:shadow-xl transition">
      <Link
        to={`/portfolio/${item.slug}`}
        aria-label={`View details for ${item.title}`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.images[0] || "/assets/placeholder.png"}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleLike}
            disabled={likeMutation.isLoading}
            aria-label="Like this project"
            className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary"
          >
            <FaThumbsUp className="mr-1" />
            {item.likes || 0}
          </button>
          <Link
            to={`/portfolio/${item.slug}`}
            className="text-primary hover:underline"
            aria-label={`View details for ${item.title}`}
          >
            View Details →
          </Link>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
          {formatDate(item.date)}
        </p>
      </div>
    </div>
  );
}

PortfolioCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    likes: PropTypes.number,
    date: PropTypes.string,
  }).isRequired,
};
