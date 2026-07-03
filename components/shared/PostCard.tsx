"use client";

import Image from "next/image";

import Link from "next/link";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import type { Post } from "@/features/posts/types/post";

import useToggleLike from "@/features/likes/hooks/useToggleLike";

import { Button } from "@/components/ui/button";


dayjs.extend(relativeTime);

function PostCard({ post}: {  post: Post}) {

    const { mutate: toggleLike, isPending } = useToggleLike();

    function handleLikeClick(){
        toggleLike( {
            postId: post.id, 
            isCurrentlyLiked: post.likeByMe
        });
    }


    return(
        <div className="border rounded-lg overflow-hidden">
            <div className="flex items-center gap-3 p-3">
                <div className="w-8 h-8 rounded-full 
                                bg-muted overflow-hidden relative">

                    { post.author.avatarUrl && (

                        <Image src={post.author.avatarUrl} alt={post.author.username} fill className="object-cover" />

                    )}
                </div>
                
                <div >
                    <Link href={`/users/${post.author.username}`} className="text-sm font-medium">
                        {post.author.username}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                        {dayjs(post.createdAt).fromNow()}
                    </p>
                </div>


            </div>

            <div className="p3 space=y-2">

                <div className="flex items-center gap-4 text-sm">
                    {/* <span>{post.likeCount} like</span> */}
                    <Button onClick={handleLikeClick} disabled={isPending}
                            className={post.likeByMe 
                            ?
                            "text-red-500 font-medium" :
                            "text-foreground"}>
                        {post.likeByMe ? "♥" : "♡"} 
                        {post.likeCount} like
                    
                    </Button>
                    
                    <Link href={`/posts/${post.id}`} className="text-muted-foreground">
                        {post.commentCount} comments
                    </Link>
                

                </div>
                <p className="text-sm">
                <span className="font-medium">{post.author.username}</span>{" "}
                {post.caption}

                </p>


            </div>
            




        </div>
    )
}

export default PostCard;