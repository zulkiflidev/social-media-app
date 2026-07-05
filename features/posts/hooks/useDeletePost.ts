import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import api from "@/lib/api/axios";
import type { FeedResponse } from "../types/post";

function useDeletePost() {

  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (postId: number) => {
      await api.delete(`/posts/${postId}`);
    
    },

    onSuccess: (_data, postId) => {
      queryClient.setQueryData<InfiniteData<FeedResponse>>(["feed"], (oldData) => {
            
            if (!oldData) return oldData;
            
            return {
                ...oldData,
                
                pages: oldData.pages.map((page) => ({
                        ...page,
                        items: page.items.filter((post) => post.id !== postId),
                    
                    
                    }
                )),

                
            };
      });

      router.push("/feed");
    },
  });
}

export default useDeletePost;