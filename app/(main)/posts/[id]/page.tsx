"use client";

import AuthGuard from "@/components/shared/AuthGuard";
import PostCard from "@/components/shared/PostCard";
import usePost from "@/features/posts/hooks/usePost";
import { useParams } from "next/navigation";

import { useState, type FormEvent } from "react";
import useComments from "@/features/comments/hooks/useComments";
import useCreateComment from "@/features/comments/hooks/useCreateComment";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useDeleteComment from "@/features/comments/hooks/useDeleteComment";
import { useAppSelector } from "@/lib/redux/hooks";



function PostDetailPage() {


    return (
        <AuthGuard>
            <PostDetailContent />
        </AuthGuard>
    );
}


function PostDetailContent() {

    const params = useParams<{   id: string }>();
    const postId = Number(params.id);
    const { data: post, isLoading, isError} = usePost(postId);

    const { data: commentsData, isLoading: commentsLoading } = useComments(postId);
    const { mutate: createComment, isPending: isCommenting } = useCreateComment();
    
    const [commentText, setCommentText] = useState('');
    const comments = commentsData?.pages.flatMap( (page) => page.comments) ?? [];


    const { mutate: deleteComment } = useDeleteComment();
    const currentUser = useAppSelector(
        (state) => state.auth.user);
    
    function handleDeleteComment(commentId: number) {

        deleteComment({
            commentId, postId
        });

    }


    function handleSubmitComment( e: FormEvent) {
        e.preventDefault();

        if (!commentText.trim()) return;

        createComment(
            { postId, text: commentText },
            { onSuccess: () => setCommentText('')}
        );
    }

    if (isLoading) {
        return <div className="p-4 text-center">Loading...</div>;
    
    }

    if (isError || !post){
        return <div className="p-4 text-center text-red-500">Post is not found!</div>
    }




    return(

        <div className="max-w-lg mx-auto p-4 space-y-4">


            <PostCard post={post} />

            <div className="space-y-3">
                <h2 className="font-medium text-sm">Comments</h2>
                
                <form onSubmit={handleSubmitComment} className="flex gap-2">

                    <Input 
                        value={commentText}
                        onChange={ (e) => setCommentText(e.target.value)}
                        placeholder = "Write any comment..."
                        disabled={isCommenting}
                    />

                    <Button type="submit" disabled={isCommenting || !commentText.trim()}>
                        {/* {isCommenting ? 'Commenting...' : 'Comment'} */}

                        Send

                    </Button>


                </form>


                {
                    commentsLoading && <p className="text-sm text-muted-foreground">Loading...</p>

                }


                {/* 
                    {
                        comments.map(
                            (comment) =>(
                                <div key={comment.id} className="flex gap-3">
                                    <span className="font-medium">{comment.author.username}</span>{" "}
                                    {comment.text}
                                </div>
                            
                            )
                        )
                    } 
                 */}


                {
                    comments.map(
                        (comment) => (

                            <div key={comment.id} className="flex items-center justify-between gap-4">

                                <p className="text-sm">
                                    <span className="font-medium">
                                        {comment.author.username}

                                    </span>{" "}
                                    {comment.text}

                                </p>

                                { currentUser?.id === comment.author.id && (

                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                                        Delete
                                    </Button>

                                )}

                            </div>




                        )
                    )
                }


            </div>


        </div>
    );



}

export default PostDetailPage;