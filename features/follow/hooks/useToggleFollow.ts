import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";

import api from "@/lib/api/axios";
import type { PublicProfile } from "@/features/users/types/profile";

// import useToggleFollow from "@/features/follow/hooks/useToggleFollow";

import type { LikesResponse } from "@/features/likes/types/likes";
import type { FollowListResponse } from "../types/follow";

interface ToggleFollowParams {
  username: string;
  isCurrentlyFollowed: boolean;

}

function useToggleFollow() {
  const queryClient = useQueryClient();

//   const { mutate: toggleFollow, isPending } = useToggleFollow();

  return useMutation({

        mutationFn: async (
            { 
                username, 
                isCurrentlyFollowed 

            }: ToggleFollowParams) => {
        
        if (isCurrentlyFollowed) {
                await api.delete(`/follow/${username}`);
            } 
            else {
                await api.post(`/follow/${username}`);
            
            }
        },

        onMutate: async ({ username, isCurrentlyFollowed }) => {

            await queryClient.cancelQueries(
                { 
                    queryKey: ["profile", username] 
            });
            
            const previousProfile = queryClient.getQueryData<PublicProfile>(["profile", username]);

            queryClient.setQueryData<PublicProfile>(["profile", username], (old) => {
                if (!old) return old;
                
                return {
                    ...old,
                    // isFollowedByMe: !isCurrentlyFollowed,
                    // followersCount: isCurrentlyFollowed
                    //     ? old.followersCount - 1
                    //     : old.followersCount + 1,
                    
                    isFollowing: !isCurrentlyFollowed,
                    counts: {
                        ...old.counts,
                        followers: isCurrentlyFollowed ? old.counts.followers - 1 : old.counts.followers + 1,
                    
                    }

                };
            
            });




            queryClient.setQueriesData<LikesResponse>(
                {
                    queryKey: ["post-likes"],
                },
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,

                        users: old.users.map((user) =>
                            user.username === username
                                ? {
                                    ...user,
                                    isFollowedByMe: !isCurrentlyFollowed,
                                }
                                : user
                        ),


                    };
                    
                }
            );

            //==
            queryClient.setQueriesData<InfiniteData<FollowListResponse>>(
            { 
                queryKey: ["followers"] },
                    (oldData) => {
                        if (!oldData) return oldData;
                        
                        return {
                            ...oldData,
                            pages: oldData.pages.map((page) => ({
                     
                                ...page,
                     
                                users: page.users.map((user) =>
                     
                                    user.username === username
                                    ? { ...user, isFollowedByMe: !isCurrentlyFollowed }
                                    : user
                                ),
                     
                     
                        })),
                    };
                }
            );

            queryClient.setQueriesData<InfiniteData<FollowListResponse>>(
            { 
                queryKey: ["following"] },
                    (oldData) => {
                        if (!oldData) return oldData;

                        return {
                            ...oldData,

                            pages: oldData.pages.map((page) => ({
                                ...page,
                                users: page.users.map((user) =>
                                
                                user.username === username
                                    ? { ...user, isFollowedByMe: !isCurrentlyFollowed }
                                    : user
                            
                            ),


                        })),
                    };
            });

            //==
            return { previousProfile };
        },

        onError: (_err, { username }, context) => {
            if (context?.previousProfile) {                
                queryClient.setQueryData(["profile", username], context.previousProfile);
            
            }
        },

        onSettled: (_data, _error, { username }) => {
            queryClient.invalidateQueries({ 
                queryKey: ["profile", username] 
            
            });

            queryClient.invalidateQueries({
                queryKey: ["post-likes"]
            });            
        
        },
    });
}

export default useToggleFollow;