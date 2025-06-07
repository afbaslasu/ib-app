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
  postComment,
} from "../services/blogService";

/**
 * useGetBlogPosts
 *  - Infinite scroll for blog posts.
 */
export function useGetBlogPosts(tag = "") {
  return useInfiniteQuery(
    ["blog", tag],
    ({ pageParam = 1 }) => fetchAllPosts({ page: pageParam, limit: 6, tag }),
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
 * useGetBlogPost
 *  - Single blog post by slug.
 */
export function useGetBlogPost(slug) {
  return useQuery(["blog", slug], () => fetchPostBySlug(slug), {
    enabled: Boolean(slug),
  });
}

/**
 * useBlogLike
 *  - Mutation for liking a blog post with optimistic update.
 */
export function useBlogLike() {
  const queryClient = useQueryClient();
  return useMutation((id) => likeBlogPost(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["blog"]);
      const previous = queryClient.getQueryData(["blog"]);
      queryClient.setQueryData(["blog"], (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.map((post) =>
            post._id === id ? { ...post, likes: (post.likes || 0) + 1 } : post
          ),
        };
      });
      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["blog"], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["blog"]);
    },
  });
}

/**
 * useBlogComment
 *  - Mutation for posting a comment to a blog post.
 */
export function useBlogComment(slug) {
  const queryClient = useQueryClient();
  return useMutation((text) => postComment(slug, text), {
    onSuccess: () => {
      queryClient.invalidateQueries(["blog", slug]);
    },
  });
}
