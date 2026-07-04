import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

import type { FollowListResponse } from "../types/follow";


function useFollowing(username: string) {
  
    return useInfiniteQuery({

        queryKey: ["following", username],
    
        queryFn: async ({ pageParam }: { pageParam: number }) => {

            const response = await api.get<{ data: FollowListResponse }>(
                `/users/${username}/following`,
                { 
                    params: { 
                        page: pageParam, limit: 20 
                    } 
                }

            );
            
            return response.data.data;
    
        },
    
        initialPageParam: 1,
    
        getNextPageParam: (lastPage: FollowListResponse) => {
            
            const { page, totalPages } = lastPage.pagination;
            return page < totalPages ? page + 1 : undefined;
        
        },
    
        enabled: !!username,
    
    
    });
}

export default useFollowing;