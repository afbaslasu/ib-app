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
 * useGetPortfolioItems
 *  - Infinite scroll for portfolio items.
 */
export function useGetPortfolioItems(category = "") {
  return useInfiniteQuery(
    ["portfolio", category],
    ({ pageParam = 1 }) =>
      fetchPortfolioItems({ page: pageParam, limit: 6, category }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 6) return undefined;
        return pages.length + 1;
      },
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    }
  );
}

/**
 * useGetPortfolioItem
 *  - Single item by slug.
 */
export function useGetPortfolioItem(slug) {
  return useQuery(["portfolio", slug], () => fetchPortfolioItemBySlug(slug), {
    enabled: Boolean(slug),
  });
}

/**
 * usePortfolioLike
 *  - Mutation for liking a portfolio item (optimistic update).
 */
export function usePortfolioLike() {
  const queryClient = useQueryClient();
  return useMutation((id) => likePortfolioItem(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries("portfolio");
      const previous = queryClient.getQueryData("portfolio");
      queryClient.setQueryData("portfolio", (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((pg) =>
            pg.map((item) =>
              item._id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
            )
          ),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData("portfolio", context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries("portfolio");
    },
  });
}
