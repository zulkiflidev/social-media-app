import { useInfiniteQuery } from "@tanstack/react-query";
import api from "@/lib/api/axios";

import type { CommentsResponse } from "@/features/comments/types/comments";


function useComments(postId: number) {


    return useInfiniteQuery({
        queryKey: ["comments", postId],
        queryFn: async ({ pageParam }:  { pageParam: number }) => {

            const response = await api.get<{
                data: CommentsResponse;
            
            }>( `/posts/${postId}/comments`, {
                params: {
                    page: pageParam,
                    limit: 10
            
                },
            });

            return response.data.data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: CommentsResponse) => {

            const { page, totalPages } = lastPage.pagination;
            return page < totalPages ? page + 1 : undefined;

        },
        enabled: !!postId,



    });

}

export default useComments;