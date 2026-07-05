import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import type { SavedPostsResponse } from "../types/saves";

function useSavedPosts() {
  return useInfiniteQuery({

        queryKey: ["saved-posts"],
        
        queryFn: async ({ pageParam }: { pageParam: number }) => {
            const response = await api.get<{ data: SavedPostsResponse }>("/me/saved", {
                params: { page: pageParam, limit: 20 },

            });

            return response.data.data;
        
        },
        
        initialPageParam: 1,
        
        getNextPageParam: (lastPage: SavedPostsResponse) => {
            const { page, totalPages } = lastPage.pagination;
            return page < totalPages ? page + 1 : undefined;
        
        },
  
    });

}

export default useSavedPosts;