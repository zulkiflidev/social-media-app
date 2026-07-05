import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/api/axios";
import type { Post, FeedResponse } from "../types/post";

interface CreatePostParams {
  image: File;
  caption: string;

}

function useCreatePost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ image, caption }: CreatePostParams) => {
        
        const formData = new FormData();
        
        formData.append("image", image);
        formData.append("caption", caption);

        const response = await api.post<{ data: Post }>("/posts", formData, {
            headers: { "Content-Type": undefined },
        
        });

        return response.data.data;
    },

    onSuccess: (newPost) => {

      queryClient.setQueryData<InfiniteData< FeedResponse >>(["feed"], (oldData) => {
        if (!oldData) return oldData;
            const firstPage = oldData.pages[0];
            const updatedFirstPage = {
            
                ...firstPage,
                items: [newPost, ...firstPage.items],
            
            };

            return {
                ...oldData,
                pages: [ updatedFirstPage, ...oldData.pages.slice(1) ],
            
            };

      });

      router.push("/feed");
    },

    
  });
}

export default useCreatePost;