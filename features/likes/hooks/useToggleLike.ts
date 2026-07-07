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

    // type SinglePost = FeedResponse['posts'][number];

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
                await queryClient.cancelQueries({ queryKey: ['post', postId]});

                const previousFeed = queryClient.getQueryData<InfiniteData<FeedResponse>>(['feed']);
                const previousExplore = queryClient.getQueryData<InfiniteData<ExploreResponse>>(['explore']);
                //const previousPostDetail = queryClient.getQueryData<InfiniteData<FeedResponse>>(['post', postId]); 

                const previousPostDetail = queryClient.getQueryData<{
                    id: number;
                    likedByMe: boolean;
                    likeCount: number;

                } & Record<string, unknown>>(['post', postId]);

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

                if (previousPostDetail) {
                    queryClient.setQueryData<typeof previousPostDetail>(
                        ['post', postId],
                        (oldPost) => {
                            if (!oldPost) return oldPost;
                            return {
                                ...oldPost,
                                likedByMe: !isCurrentlyLiked,
                                likeCount: isCurrentlyLiked ? oldPost.likeCount - 1 : oldPost.likeCount + 1,
                            };
                        }
                    );
                }

                return {previousFeed, previousExplore, previousPostDetail};
                
            },

            onError: ( _err, variables, context) => {
            
                if (context?.previousFeed){
                    queryClient.setQueryData(['feed'], context.previousFeed);
                }

                if (context?.previousExplore){
                    queryClient.setQueryData(['explore'], context.previousExplore);
                }

                if (context?.previousPostDetail){
                    queryClient.setQueryData(['post', variables.postId], context.previousPostDetail);
                }

            },

            onSettled: (_data, _error, variables) => {

                queryClient.invalidateQueries({
                    queryKey: ['feed']
                })

                queryClient.invalidateQueries({
                    queryKey: ['explore']
                })

                setTimeout(() => {
                    queryClient.invalidateQueries({ queryKey: ['post', variables.postId] });
                }, 500);
            }


        }
    );


}

export default useToggleLike;