import { useQuery } from "@tanstack/react-query";

import api from "@/lib/api/axios";
import type { LikesResponse } from "../types/likes";


function usePostLikes(postId: number, enabled: boolean) {
    return useQuery({

        queryKey: ["post-likes", postId],
        enabled,

        queryFn: async () => {
            const response = await api.get<{ data: LikesResponse }>(
                `/posts/${postId}/likes`
            );

            return response.data.data;
        },


    });
}

export default usePostLikes;