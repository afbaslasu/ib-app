src/services/dashboardService.js
const BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchDashboardStats() {
  const res = await fetch(`${BASE}/dashboard`);
  if (!res.ok) throw new Error("Network error fetching dashboard stats");
  return res.json(); // { userCount, projectCount, ... }
}
