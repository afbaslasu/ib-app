import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useLikeBlogPost } from "../../hooks/useBlog";
import { FaComments, FaThumbsUp, FaShareAlt } from "react-icons/fa";
import { formatDate } from "../../utils/formatDate";

/**
 * BlogPostCard.jsx
 *  - Displays a summary card for a blog post.
 *  - Shows cover image, title, excerpt, likes/comments/share buttons, and “Read More” link.
 */
export default function BlogPostCard({ post, onTagClick }) {
  const likeMutation = useLikeBlogPost();

  const handleLike = () => {
    likeMutation.mutate(post._id);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/blog/${post.slug}`;
    const shareText = encodeURIComponent(
      `Check out this article: "${post.title}"`
    );
    window.open(
      `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
      "_blank"
    );
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden group hover:shadow-xl transition">
      <Link
        to={`/blog/${post.slug}`}
        aria-label={`Read the blog post titled ${post.title}`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={post.coverImage || "/assets/placeholder.png"}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 truncate">
          {post.title}
        </h3>
        <p className="text-gray-500 dark:text-gray-300 text-xs mt-1">
          {formatDate(post.publishedAt)} &bull; {post.author}
        </p>
        <div className="mt-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.excerpt || post.content.substring(0, 100) + "..."}
          </ReactMarkdown>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-4 text-gray-700 dark:text-gray-200">
            <button
              onClick={handleLike}
              disabled={likeMutation.isLoading}
              aria-label="Like this post"
              className="flex items-center hover:text-primary"
            >
              <FaThumbsUp className="mr-1" /> {post.likes || 0}
            </button>
            <button
              onClick={() => alert("Comments coming soon!")}
              aria-label="View comments"
              className="flex items-center hover:text-primary"
            >
              <FaComments className="mr-1" /> {post.commentsCount || 0}
            </button>
            <button
              onClick={handleShare}
              aria-label="Share this post"
              className="flex items-center hover:text-primary"
            >
              <FaShareAlt className="mr-1" />
            </button>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-primary hover:underline"
            aria-label={`Read more about ${post.title}`}
          >
            Read More →
          </Link>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags &&
            post.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-2 py-1 rounded text-xs hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                aria-label={`Filter by ${tag}`}
              >
                {tag}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

BlogPostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    content: PropTypes.string,
    coverImage: PropTypes.string,
    author: PropTypes.string,
    publishedAt: PropTypes.string,
    likes: PropTypes.number,
    commentsCount: PropTypes.number,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onTagClick: PropTypes.func.isRequired,
};
