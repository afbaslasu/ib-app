import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import Button from "../components/UI/Button";
import { useI18n } from "../contexts/i18nContext";
import { formatDate } from "../utils/formatDate";

/**
 * BlogDetail.jsx
 *  - Shows a full blog post, with like button, comments, and comment form.
 */
export default function BlogDetail() {
  const { t } = useI18n();
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

  // Fetch post
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery(["blogDetail", slug], () =>
    fetch(`/blog/${slug}`).then((res) => res.json().then((data) => data.post))
  );

  // Like Mutation
  const likeMutation = useMutation(
    (id) => fetch(`/blog/${id}/like`, { method: "POST" }),
    {
      onSuccess: () => queryClient.invalidateQueries(["blogDetail", slug]),
    }
  );

  // Comment Mutation
  const commentMutation = useMutation(
    (text) =>
      fetch(`/blog/${slug}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["blogDetail", slug]);
        setCommentText("");
      },
    }
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError || !post)
    return <div className="text-center py-20">{t("Post not found.")}</div>;

  const handleLike = () => {
    likeMutation.mutate(post._id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    commentMutation.mutate(commentText);
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | UltraProfile+ Blog</title>
        <meta
          name="description"
          content={post.excerpt || post.content.substring(0, 150)}
        />
      </Helmet>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-500 mb-4">
            {t("Published on")} {formatDate(post.publishedAt)} &bull; {t("By")}{" "}
            {post.author}
          </p>
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
              loading="lazy"
            />
          )}
          <div className="prose dark:prose-dark mb-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
          <div className="flex items-center space-x-4 mb-12">
            <Button
              variant="outline"
              onClick={handleLike}
              disabled={likeMutation.isLoading}
            >
              {t("Like")} ({post.likes})
            </Button>
          </div>

          {/* Comments */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t("Comments")}</h2>
            {post.comments && post.comments.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">
                {t("No comments yet.")}
              </p>
            ) : (
              post.comments.map((c, idx) => (
                <div
                  key={idx}
                  className="border-b border-gray-200 dark:border-gray-600 py-2"
                >
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {c.user}:
                  </p>
                  <p className="text-gray-700 dark:text-gray-200">{c.text}</p>
                </div>
              ))
            )}
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full border p-3 rounded dark:bg-gray-700 dark:text-gray-200"
                placeholder={t("Write a comment...")}
              ></textarea>
              <Button variant="primary" type="submit" className="mt-2">
                {t("Post Comment")}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
