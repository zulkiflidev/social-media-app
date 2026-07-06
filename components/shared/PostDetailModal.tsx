"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import type { Post } from "@/features/posts/types/post";

import useComments from "@/features/comments/hooks/useComments";
import useCreateComment from "@/features/comments/hooks/useCreateComment";
import useDeleteComment from "@/features/comments/hooks/useDeleteComment";

import { useAppSelector } from "@/lib/redux/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import Link from "next/link";
import dayjs from "dayjs";

import { MessageSquare, MessageCircle, MessageSquareMore } from 'lucide-react';
import { Heart } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { Smile, Laugh } from 'lucide-react';
import { Share2, ExternalLink, Share } from 'lucide-react';

import useToggleLike from "@/features/likes/hooks/useToggleLike";
import useToggleSave from "@/features/saves/hooks/useToggleSave";


interface PostDetailModalProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function PostDetailModal({ post, open, onOpenChange }: PostDetailModalProps) {
    const { data: commentsData, isLoading: commentsLoading } = useComments(post.id);
    const { mutate: createComment, isPending: isCommenting } = useCreateComment();

    const { mutate: deleteComment } = useDeleteComment();
    const currentUser = useAppSelector((state) => state.auth.user);

    const [commentText, setCommentText] = useState("");
    const comments = commentsData?.pages.flatMap((page) => page.comments) ?? [];

    function handleSubmitComment(e: FormEvent) {
        e.preventDefault();
        if (!commentText.trim()) return;

        createComment(
            { postId: post.id, text: commentText },
            { onSuccess: () => setCommentText("") }
        );


    }

    function handleDeleteComment(commentId: number) {
        deleteComment({ 
            commentId, 
            postId: 
            post.id 
            
        });

    }


    const { mutate: toggleLike, isPending } = useToggleLike();
    function handleLikeClick(){
        toggleLike( {
            postId: post.id, 
            isCurrentlyLiked: post.likedByMe

        });
    }

    const { mutate: toggleSave, isPending: isSaveSaving } = useToggleSave();
    function handleSaveClick() {
        toggleSave({
            postId: post.id,
            isCurrentlySaved: post.savedByMe ?? false

        });
    }



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>

      {/* <DialogContent className="w-[95vw] max-w-6xl h-[90vh]  p-0"> */}
        <DialogContent className="w-[95vw] max-w-6xl sm:max-w-6xl h-[90vh] p-0">

            {/* <div className="grid w-full h-full min-h-0 grid-cols-1 md:grid-cols-[4fr_2fr] h-[80vh]">                        */}
            <div className="grid w-full h-full min-h-0 grid-cols-1 md:grid-cols-[4fr_2fr] grid-rows-[minmax(0,1fr)]">

                {/* <div className="relative bg-black hidden md:block"> */}
                <div className="relative w-full h-full bg-black hidden md:block">
                        <Image
                            src={post.imageUrl}
                            alt={post.caption}
                            fill
                            sizes="50vw"
                            className="object-contain"


                        />
                </div>

                <div className="flex flex-col h-full min-h-0 overflow-hidden">
                    <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3">

                        <div className="flex items-center gap-3 ">
                            <div className="w-12 h-12 rounded-full 
                                            bg-muted overflow-hidden relative">

                                {  
                                    <Image 
                                        src={post.author.avatarUrl ? post.author.avatarUrl : "/defaultAvatar.png"} 
                                        alt={post.author.username} 
                                        fill
                                        sizes="32px"
                                        className="object-cover" />
                                }

                            </div>


                            <div >
                                <Link href={`/profile/${post.author.username}`} className="text-sm font-medium">
                                    {post.author.username}
                                </Link>

                                <p className="text-xs text-muted-foreground">
                                    {
                                        dayjs(post.createdAt).fromNow()
                                    }
                                </p>
                            </div>
                        </div>


                        <div className="flex-1 min-h-0 overflow-y-auto  space-y-3">

                            <div>
                                <p className="text-xs font-light">
                                {                                
                                    post.caption                                
                                }
                                </p>
                            </div>


                            <hr className="border-t border-gray-800 my-4" />

                            <h2 className="font-bold text-sm">Comments</h2>

                            {
                                commentsLoading && (
                                    <p className="text-sm text-muted-foreground">Loading...</p>
                                )
                            }

                            {
                                comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className="flex flex-col items-start justify-start gap-4"
                                    >

                                        <div className="flex items-center gap-2 ">
                                            <div className="w-12 h-12 rounded-full 
                                                            bg-muted overflow-hidden relative">

                                                {  
                                                    <Image 
                                                        src={comment.author.avatarUrl ? comment.author.avatarUrl : "/defaultAvatar.png"} 
                                                        alt={comment.author.username} 
                                                        fill
                                                        sizes="32px"
                                                        className="object-cover" />
                                                }

                                            </div>


                                            <div >
                                                <Link href={`/profile/${comment.author.username}`} className="text-sm font-medium">
                                                    {comment.author.username}
                                                </Link>

                                                <p className="text-xs text-muted-foreground">
                                                    {
                                                        dayjs(comment.createdAt).fromNow()
                                                    }
                                                </p>
                                            </div>
                                        </div>


                                        <p className="text-sm">
                                            {/* <span className="font-medium"> { comment.author.username } </span>{" "} */}
                                            {comment.text}
                                        </p>

                                        {
                                            currentUser?.id === comment.author.id && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={
                                                        () => handleDeleteComment( comment.id) 
                                                    }
                                                    className="text-muted-foreground p-0 -mt-4"
                                                >
                                                
                                                    Delete
                                                
                                                </Button>
                                            )
                                        }

                                        
                                    </div>
                                ))
                            }
                        </div>


                    </div>

                    

                                      

                    <form onSubmit={ handleSubmitComment }
                          className="flex gap-2 p-4 border-t"
                    >

                        <div className="flex flex-col gap-2 items-start w-full">
                            
                            <div className="flex flex-row items-center justify-between gap-2 w-full">

                                <div className="flex gap-2 items-center">
                                    <Button 
                                        className={post.likedByMe 
                                        ?
                                        "text-red-500 font-medium" :
                                        "text-foreground"}
                                        variant="ghost"
                                        onClick={ handleLikeClick }
                                        >

                                            {
                                                post.likedByMe ? 
                                                <Heart className="!h-5 !w-5 text-red-500" fill="currentColor" /> : 
                                                <Heart className="!h-5 !w-5" />                            
                                            }                                 
                                            {post.likeCount}                     
                                    </Button>
                                                                                                        
                                    <div className="flex gap-2 items-center">
                                        <MessageSquareMore className="h-5 w-5" /> {post.commentCount} 
                                    </div>
                                </div>

                                <div className="flex gap-2 items-center">
                                    
                                    <Button onClick={handleSaveClick} disabled={isSaveSaving}
                                            className=
                                            {
                                            post.savedByMe ?
                                                "text-red-500 font-medium ml-auto" : "text-foreground ml-auto"
                                            }
                                            variant="ghost"
                                    >                        

                                        <Bookmark 
                                                size={30} 
                                                fill={post.savedByMe ? "currentColor" : "none"} 
                                                className={post.savedByMe ? "text-yellow-500 !h-5 !w-5" : "text-gray-500 !h-6 !w-6"}
                                                />

                                    </Button>

                                    <Share className="w-5 h-5 text-gray-500" />
                                </div>
            
                            </div>

                            <div className="flex flex-row items-center gap-2 w-full">
                                <Smile className="w-6 h-6 text-white" />
                                <Input
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Add Comment"
                                    disabled={isCommenting}
                                    className="flex-1"

                                />
                                <Button type="submit" disabled={isCommenting || !commentText.trim()}>
                                    Send
                                </Button>


                            
                            </div>
                        </div>

                        


                    </form>


                </div>

            </div>

        </DialogContent>
    </Dialog>


  );
}

export default PostDetailModal;