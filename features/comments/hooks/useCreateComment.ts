import React from 'react'
import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query"
import api from "@/lib/api/axios";

import type { Comment, CommentsResponse } from "../types/comments"
import { useAppSelector } from "@/lib/redux/hooks";



interface CreateCommentParams {
    postId: number;
    text: string;
}


function useCreateComment() {

    const queryClient = useQueryClient();
    const currentUser = useAppSelector((state) => state.auth.user);

    return useMutation(
        {
            mutationFn: async({
                postId, text
            }:CreateCommentParams) => {
                
                const response = await api.post(`/posts/${postId}/comments`, {
                    text,}
                );
                return response.data.data;
                
            },

            onMutate: async({ postId, text}) => {
                await queryClient.cancelQueries({
                    queryKey: ["comments", postId]

                });

                const previousComments = queryClient.getQueryData<InfiniteData<CommentsResponse>>(["comments", postId]);

                
                if (currentUser) {

                    const optimisticComment: Comment = {
                        id: -Date.now(),
                        text,
                        createdAt: new Date().toISOString(),
                        author: {
                            id: currentUser.id,
                            username: currentUser.username,
                            name: currentUser.name,
                            avatarUrl: currentUser.avatarUrl,

                        },


                    }


                    queryClient.setQueryData<InfiniteData<CommentsResponse>>(["comments", postId], (oldData) => {
                        
                        if (!oldData) return oldData;

                        const firstPage = oldData.pages[0];
                        const updatedFirstPage = {

                            ...firstPage,
                            items: [optimisticComment, ...firstPage.comments],
                        }

                        return {
                            ...oldData,
                            pages: [updatedFirstPage, ...oldData.pages.slice(1)]
                        }

                    })
                }

                return { previousComments };

            },

            onError: (  _err, { postId }, context ) => {

                if (context?.previousComments) {

                    queryClient.setQueryData(

                        ["comments", postId],

                        context.previousComments

                    );
                }

            },

            onSettled: (_data, _error, { postId}) => {

                queryClient.invalidateQueries({
                    queryKey: ["comments", postId]
                })

            }
             
        }
    )
}

export default useCreateComment