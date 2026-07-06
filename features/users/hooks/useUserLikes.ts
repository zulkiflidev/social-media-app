import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

import type { Post, PaginationMeta } from "@/features/posts/types/post";

interface UserLikesResponse {
  posts: Post[];
  pagination: PaginationMeta;

}

function useUserLikes(username: string) {
  return useInfiniteQuery({
        
        queryKey: ["user-likes", username],
        
        queryFn: async ({ pageParam }: { pageParam: number }) => {
            const response = await api.get<{ data: UserLikesResponse }>(
                `/users/${username}/likes`,
                { 
                    params: 
                    { page: pageParam, 
                        limit: 12 
                    } 
                }
            );

            return response.data.data;
        
        },
        
        initialPageParam: 1,
        
        getNextPageParam: (lastPage: UserLikesResponse) => {
            const { page, totalPages } = lastPage.pagination;
            return page < totalPages ? page + 1 : undefined;
        },
        
        enabled: !!username,
        
  });

}

export default useUserLikes;