import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import api from "@/lib/api/axios";
import type { CommentsResponse } from "../types/comments";

interface DeleteCommentParams {
  commentId: number;
  postId: number;
}

function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation(
    {
        mutationFn: async ({ commentId }: DeleteCommentParams) =>
        {
            await api.delete(`/comments/${commentId}`);
        },

        onMutate: async ({ commentId, postId }) => {
        await queryClient.cancelQueries({ queryKey: ["comments", postId] });

        const previousComments = queryClient.getQueryData<InfiniteData<CommentsResponse>>([
            "comments",
            postId,

        ]);

        queryClient.setQueryData<InfiniteData<CommentsResponse>>(
            ["comments", postId],
            (oldData) => {
            if (!oldData) return oldData;

            return {
                
                ...oldData,
                
                pages: oldData.pages.map((page) => ({
                
                    ...page,
                
                comments: page.comments.filter((comment) => comment.id !== commentId),
                })),

            };
            }
        );

        return { previousComments };
        },

        onError: (_err, { postId }, context) => 
        {
            if (context?.previousComments) {
             queryClient.setQueryData(["comments", postId], context.previousComments);
            }
        },

        onSettled: (_data, _error, { postId }) => 
        {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },


  });


}


export default useDeleteComment;