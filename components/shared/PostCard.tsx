"use client";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import type { Post } from "@/features/posts/types/post";
import useToggleLike from "@/features/likes/hooks/useToggleLike";
import { Button } from "@/components/ui/button";

import useToggleSave from "@/features/saves/hooks/useToggleSave";
import useDeletePost from "@/features/posts/hooks/useDeletePost";
import { useAppSelector } from "@/lib/redux/hooks";

import { Heart } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { MessageSquare, MessageCircle, MessageSquareMore } from 'lucide-react';

import ExpandableText from "./ExpandableText";
import LikesDialog from "@/features/likes/components/LikesDialog";


import { useState } from "react";
import PostDetailModal from "./PostDetailModal";



dayjs.extend(relativeTime);

function PostCard({ post}: {  post: Post}) {

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

    const currentUser = useAppSelector((state) => state.auth.user);
    const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

    function handleDeleteClick() {
        if (confirm("Yakin ingin menghapus post ini?")) {
            deletePost(post.id);

        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);


    return(
        <div className="border rounded-lg overflow-hidden">
            <div className="flex items-center gap-3 p-6">
                <div className="w-12 h-12 rounded-full 
                                bg-muted overflow-hidden relative">

                    { 
                        post.author.avatarUrl && (

                            <Image 
                                src={post.author.avatarUrl} 
                                alt={post.author.username} 
                                fill
                                sizes="32px"
                                className="object-cover" />

                        )
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
            
{/* 
            <div className="relative w-full aspect-square bg-muted ">

                <Button variant="ghost" className="cursor-pointe  p-0 h-full w-full"
                        onClick={() => setIsModalOpen(true)}>
                    <Image 
                        src={ post.imageUrl }
                        alt={ post.caption }
                        fill
                        sizes="(max-width: 640px) 100vw, 512px"
                        className="object-cover"
                    />


                </Button>

            </div> */}


            <div className="relative w-full aspect-square bg-muted ">
                <Button variant="ghost" className="cursor-pointer p-0 h-full w-full" onClick={() => setIsModalOpen(true)}>
                    <Image 
                        src={ post.imageUrl }
                        alt={ post.caption }
                        fill
                        sizes="(max-width: 640px) 100vw, 512px"
                        className="object-cover"
                    />
                
                </Button>


            </div>

            <div className="p-3 space-y-2">

                <div className="flex items-center gap-2 text-sm">

                    {/* <span>{post.likeCount} like</span> */}
                    <Button onClick={handleLikeClick} disabled={isPending}
                            className={post.likedByMe 
                            ?
                            "text-red-500 font-medium" :
                            "text-foreground"}
                            variant="ghost"
                            >

                        {
                            post.likedByMe ? 
                            <Heart className="!h-5 !w-5 text-red-500" fill="currentColor" /> : 
                            <Heart className="!h-5 !w-5" />
                    
                        } 
                        
                        {post.likeCount} 
                    
                    </Button>
                                        
                    {/* <Link href={`/posts/${post.id}`} className="text-muted-foreground">
                        {post.commentCount} comments
                    </Link> */}
                    
                    <Link href={`/posts/${post.id}`} className="">
                        
                        <div className="flex gap-2 items-center">
                            <MessageSquareMore className="h-5 w-5" /> {post.commentCount} 
                        </div>

                    </Link>

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
                
                </div>


                <div className="flex flex-col gap-1 pl-3">
                    <p className="text-sm">
                        <span className="text-md font-bold">{post.author.username}</span>{" "}
                    </p>   
                    {/* <p className="text-sm">{post.caption}</p> */}
                    {/* <p className="text-sm line-clamp-2 hover:line-clamp-none cursor-pointer transition-all">
                        {post.caption}
                    </p>     */}
                    <ExpandableText text={post.caption} />                

                </div>

                <div className="flex gap-2 pl-3">
                    {/* <p className="text-sm text-muted-foreground">{post.likeCount} like</p> */}
                    <LikesDialog
                            postId={post.id}
                            likeCount={post.likeCount}
                        />                    
                </div>
                

                {/* {
                    currentUser?.id === post.author.id && (
                        <Button variant="ghost" size="sm" onClick={ handleDeleteClick } disabled={isDeleting}>
                            Delete
                        </Button>
                    )
                }
                */}

            </div>
            
            <PostDetailModal
                post={post}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}

            />

        </div>
    )
}

export default PostCard;