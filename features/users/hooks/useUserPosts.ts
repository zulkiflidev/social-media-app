import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

import type { Post, PaginationMeta } from "@/features/posts/types/post";

interface UserPostsResponse {
  posts: Post[];
  pagination: PaginationMeta;

}

function useUserPosts(username: string) {


  return useInfiniteQuery(
    {
        queryKey: ["user-posts", username],
        
        queryFn: async ({ pageParam }: { pageParam: number }) => {
            const response = await api.get<{ data: UserPostsResponse }>(
            `/users/${username}/posts`,
                { 
                    params: { page: pageParam, limit: 12 } 
                }
            );

            return response.data.data;
        
        },
        
        initialPageParam: 1,
        
        getNextPageParam: (lastPage: UserPostsResponse) => {
            const { page, totalPages } = lastPage.pagination;
            return page < totalPages ? page + 1 : undefined;


        },
        
        enabled: !!username,
    
    
    });
}

export default useUserPosts;