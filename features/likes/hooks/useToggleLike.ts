import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';

import api from '@/lib/api/axios';
import type { FeedResponse } from '@/features/posts/types/post';
import updatePostInCache  from '@/features/posts/utils/updatePostInCache';


interface ToggleLikeParams {
    postId: number;
    isCurrentlyLiked: boolean;
}

function useToggleLike(){

    const queryClient = useQueryClient();

    return useMutation(
        {
            mutationFn: async ({postId, isCurrentlyLiked}: ToggleLikeParams) => {

                if (isCurrentlyLiked){
                    await api.delete(`/posts/${postId}/like`);
                } 
                
                else {
                    await api.post(`/posts/${postId}/like`);
                }

            },

            onMutate: async (
                {postId, isCurrentlyLiked }
            ) => {

                await queryClient.cancelQueries({ queryKey: ['feed']});

                const previousFeed = queryClient.getQueryData<InfiniteData<FeedResponse>>(['feed']);

                queryClient.setQueryData<InfiniteData<FeedResponse>>(
                    ['feed'],
                    (oldData) => updatePostInCache(oldData, postId, (post) => ({ 
                        ...post,
                        likedByMe: !isCurrentlyLiked,
                        likeCount: isCurrentlyLiked ? post.likeCount - 1 : post.likeCount + 1,
                    })
                ));

                return {previousFeed};
                
            },

            onError: ( _err, _variables, context) => {
            
                if (context?.previousFeed){
                    queryClient.setQueryData(['feed'], context.previousFeed);
                }
            },

            onSettled: () => {

                queryClient.invalidateQueries({
                    queryKey: ['feed']
                })

            }


        }
    );


}

export default useToggleLike;