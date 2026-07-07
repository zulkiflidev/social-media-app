import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';

import api from '@/lib/api/axios';
import type { FeedResponse, ExploreResponse } from '@/features/posts/types/post';
import updatePostInCache  from '@/features/posts/utils/updatePostInCache';

import updatePostInCacheExplore  from '@/features/posts/utils/updatePostInCacheExplore';


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
                await queryClient.cancelQueries({ queryKey: ['explore']});

                const previousFeed = queryClient.getQueryData<InfiniteData<FeedResponse>>(['feed']);
                const previousExplore = queryClient.getQueryData<InfiniteData<FeedResponse>>(['explore']);
                
                if (previousFeed){   
                    queryClient.setQueryData<InfiniteData<FeedResponse>>(
                        ['feed'],
                        (oldData) => updatePostInCache(oldData, postId, (post) => ({ 
                            ...post,
                            likedByMe: !isCurrentlyLiked,
                            likeCount: isCurrentlyLiked ? post.likeCount - 1 : post.likeCount + 1,
                        })
                    ));
                
                }

                if (previousExplore){   
                    queryClient.setQueryData<InfiniteData<ExploreResponse>>(
                        ['explore'],
                        (oldData) => updatePostInCacheExplore(oldData, postId, (post) => ({ 
                            ...post,
                            likedByMe: !isCurrentlyLiked,
                            likeCount: isCurrentlyLiked ? post.likeCount - 1 : post.likeCount + 1,
                        })
                    ));
                
                }

                return {previousFeed, previousExplore};
                
            },

            onError: ( _err, _variables, context) => {
            
                if (context?.previousFeed){
                    queryClient.setQueryData(['feed'], context.previousFeed);
                }

                if (context?.previousExplore){
                    queryClient.setQueryData(['feed'], context.previousExplore);
                }

            },

            onSettled: () => {

                queryClient.invalidateQueries({
                    queryKey: ['feed']
                })

                queryClient.invalidateQueries({
                    queryKey: ['explore']
                })
            }


        }
    );


}

export default useToggleLike;