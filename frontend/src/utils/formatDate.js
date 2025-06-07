/**
 * formatDate
 *  - Takes an ISO date string (e.g. "2025-05-01T08:00:00Z")
 *  - Returns a human-readable format, e.g., "May 1, 2025"
 */
export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
