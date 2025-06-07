import apiClient from "./apiClient";

/**
 * fetchAllPosts
 *  - GET /blog?page=&limit=&tag=
 *  - Returns an array of posts.
 */
export async function fetchAllPosts({ page = 1, limit = 6, tag = "" }) {
  let url = `/blog?page=${page}&limit=${limit}`;
  if (tag) url += `&tag=${encodeURIComponent(tag)}`;
  const res = await apiClient.get(url);
  return res.data.posts; // API: { posts: [...] }
}

/**
 * fetchPostBySlug
 *  - GET /blog/:slug
 *  - Returns { post, comments }.
 */
export async function fetchPostBySlug(slug) {
  const res = await apiClient.get(`/blog/${slug}`);
  return res.data.post;
}

/**
 * likeBlogPost
 *  - POST /blog/:id/like
 *  - Returns { success: true, likes: newCount }.
 */
export async function likeBlogPost(id) {
  const res = await apiClient.post(`/blog/${id}/like`);
  return res.data;
}

/**
 * postComment
 *  - POST /blog/:slug/comment { text }
 */
export async function postComment(slug, text) {
  const res = await apiClient.post(`/blog/${slug}/comment`, { text });
  return res.data.comment; // { comment: {...} }
}
