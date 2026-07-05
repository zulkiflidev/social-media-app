import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import type { FeedResponse } from "@/features/posts/types/post";

import updatePostInCache from "@/features/posts/utils/updatePostInCache";


interface ToggleSaveParams {
    postId: number;
    isCurrentlySaved: boolean;

}


function useToggleSave() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async ({ postId, isCurrentlySaved }: ToggleSaveParams) => {

            if (isCurrentlySaved){
                await api.delete(`/posts/${postId}/save`);                
            }
            else{
                await api.post(`/posts/${postId}/save`);
            }
    
        },

        onMutate: async({
            postId, isCurrentlySaved
        }) => {

            await queryClient.cancelQueries({
                queryKey: ["posts"]

            });

            const previousFeed = queryClient.getQueryData<InfiniteData<FeedResponse>>(["feed"]);

            queryClient.setQueryData<InfiniteData<FeedResponse>> (
                ["feed"],
                (oldData) => 
                    updatePostInCache(oldData, postId, (post ) => (
                        {
                            ...post,
                            savedByMe: !isCurrentlySaved
                        }
                    ))                
            );

            return { previousFeed}
 

        },

        onError: (_error, _variables, context) => {
            if (context?.previousFeed){
                queryClient.setQueryData(["feed"], context.previousFeed);
            }
        
        }


    });
}


export default useToggleSave;