import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import type { MyLikesResponse } from "../types/myLikes";

function useMyLikes() {

  return useInfiniteQuery({

        queryKey: ["my-likes"],
    
        queryFn: async ({ pageParam }: { pageParam: number }) => {

            const response = await api.get<{ data: MyLikesResponse }>("/me/likes", {
                params: { 
                    page: pageParam, 
                    limit: 20 
                },

                
            });

            return response.data.data;
        
        
        },

        initialPageParam: 1,
        
        getNextPageParam: (lastPage: MyLikesResponse) => {
            const { page, totalPages } = lastPage.pagination;
            return page < totalPages ? page + 1 : undefined;
        
        
        },


  });


}

export default useMyLikes;