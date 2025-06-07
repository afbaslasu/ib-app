src/services/aboutService.js
const BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchAboutContent() {
  const res = await fetch(`${BASE}/about`);
  if (!res.ok) throw new Error("Network error fetching about");
  return res.json(); // { image, paragraph1, paragraph2 }
}
