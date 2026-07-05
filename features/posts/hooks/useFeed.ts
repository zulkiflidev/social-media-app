import { useInfiniteQuery } from "@tanstack/react-query";

import api from "@/lib/api/axios";
import { FeedResponse } from "@/features/posts/types/post";


function useFeed() {

        return useInfiniteQuery({
            queryKey: ["feed"],
            queryFn: async ({pageParam}) => {
                const response = await api.get<{
                    data: FeedResponse;
                }>("/feed", {
                    params: { page: pageParam, limit: 10}
                    
                });

                return response.data.data;

            },

            initialPageParam: 1,
            getNextPageParam: (lastPage) => {
                const { page, totalPages } = lastPage.pagination;
                return page < totalPages ? page + 1 : undefined;
            }            

        });




}

export default useFeed;