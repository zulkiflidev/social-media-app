import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import type { PublicProfile } from "@/features/users/types/profile";

interface ToggleFollowParams {
  username: string;
  isCurrentlyFollowed: boolean;

}

function useToggleFollow() {
  const queryClient = useQueryClient();

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

            return { previousProfile };
        },

        onError: (_err, { username }, context) => {
            if (context?.previousProfile) {                
                queryClient.setQueryData(["profile", username], context.previousProfile);
            
            }
        },

        onSettled: (_data, _error, { username }) => {
            queryClient.invalidateQueries({ queryKey: ["profile", username] });
        
        },
    });
}

export default useToggleFollow;