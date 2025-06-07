import apiClient from "./apiClient";

/**
 * fetchPortfolioItems
 *  - GET /portfolio?page=&limit=&category=
 *  - Returns an array of items (no pagination metadata assumed).
 */
export async function fetchPortfolioItems({
  page = 1,
  limit = 6,
  category = "",
}) {
  let url = `/portfolio?page=${page}&limit=${limit}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;
  const res = await apiClient.get(url);
  return res.data.items; // API should return { items: [...] }
}

/**
 * fetchPortfolioItemBySlug
 *  - GET /portfolio/:slug
 *  - Returns a single item.
 */
export async function fetchPortfolioItemBySlug(slug) {
  const res = await apiClient.get(`/portfolio/${slug}`);
  return res.data.item;
}

/**
 * likePortfolioItem
 *  - POST /portfolio/:id/like
 *  - Returns { success: true, likes: newCount }.
 */
export async function likePortfolioItem(id) {
  const res = await apiClient.post(`/portfolio/${id}/like`);
  return res.data;
}

/**
 * fetchTeamMembers
 *  - GET /team
 *  - Returns an array of team member objects.
 */
export async function fetchTeamMembers() {
  const res = await apiClient.get("/team");
  return res.data.members; // API: { members: [...] }
}
