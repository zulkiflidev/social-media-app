import { useQuery } from "@tanstack/react-query";
import api from '@/lib/api/axios';
import type { Post } from '@/features/posts/types/post';


function usePost(postId: number) {


    return useQuery({
        queryKey: ["post", postId],
        queryFn: async () => {
            const response = await api.get<{data: Post}>(`/posts/${postId}`);
            return response.data.data;

        },
        enabled: !!postId,
    });

}


export default usePost;