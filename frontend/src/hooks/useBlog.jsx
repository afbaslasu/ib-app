import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchAllPosts,
  fetchPostBySlug,
  likeBlogPost,
  postComment as apiPostComment,
} from "../services/blogService";

/**
 * useBlogList
 *  - Infinite scroll hook for blog posts.
 */
export function useBlogList(tag = "") {
  return useInfiniteQuery({
    queryKey: ["blog", tag],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllPosts({ page: pageParam, limit: 6, tag }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length < 6 ? undefined : pages.length + 1,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
}

/**
 * useBlogDetail
 *  - Fetch a single blog post by slug.
 */
export function useBlogDetail(slug) {
  return useQuery({
    queryKey: ["blog", slug],
    queryFn: () => fetchPostBySlug(slug),
    enabled: Boolean(slug),
  });
}

/**
 * useLikeBlogPost
 *  - Mutation to like a blog post (optimistic).
 */
export function useLikeBlogPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => likeBlogPost(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["blog"]);
      const previous = queryClient.getQueryData(["blog"]);
      queryClient.setQueryData(["blog"], (old) => {
        if (!old) return old;
        return {
          data: old.data.map((post) =>
            post._id === id ? { ...post, likes: (post.likes || 0) + 1 } : post
          ),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(["blog"], ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["blog"]);
    },
  });
}

/**
 * usePostComment
 *  - Mutation to post a new comment under a slug.
 */
export function usePostComment(slug) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (text) => apiPostComment(slug, text),
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", slug]);
    },
  });
}
