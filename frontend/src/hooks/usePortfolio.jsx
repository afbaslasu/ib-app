import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchPortfolioItems,
  fetchPortfolioItemBySlug,
  likePortfolioItem,
} from "../services/portfolioService";

/**
 * usePortfolioList
 *  - Infinite scroll hook: fetches pages of portfolio items.
 */
export function usePortfolioList(category = "") {
  return useInfiniteQuery({
    queryKey: ["portfolio", category],
    queryFn: ({ pageParam = 1 }) =>
      fetchPortfolioItems({ page: pageParam, limit: 6, category }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < 6 ? undefined : pages.length + 1,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}

/**
 * usePortfolioDetail
 *  - Fetch a single portfolio item by its slug.
 */
export function usePortfolioDetail(slug) {
  return useQuery({
    queryKey: ["portfolio", slug],
    queryFn: () => fetchPortfolioItemBySlug(slug),
    enabled: Boolean(slug),
  });
}

/**
 * useLikePortfolio
 *  - Mutation to optimistically increment “likes.”
 */
export function useLikePortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => likePortfolioItem(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["portfolio"]);
      const previous = queryClient.getQueryData(["portfolio"]);
      queryClient.setQueryData(["portfolio"], (old) => {
        if (!old) return old;
        return {
          pages: old.pages.map((pg) =>
            pg.map((item) =>
              item._id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
            )
          ),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["portfolio"], ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["portfolio"]);
    },
  });
}
