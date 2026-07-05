"use client";

import { useState } from "react";
import Image from "next/image";

import Link from "next/link";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import usePostLikes from "../hooks/usePostLikes";

import useToggleFollow from "@/features/follow/hooks/useToggleFollow";
import { Button } from "@/components/ui/button";


interface LikesDialogProps {
    postId: number;
    likeCount: number;
    
}

function LikesDialog({ postId, likeCount }: LikesDialogProps) {

    const [open, setOpen] = useState(false);

    const {
        data,
        isLoading,
        isError,
    } = usePostLikes(postId, open);

    const { mutate: toggleFollow, isPending } = useToggleFollow();

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            
            <DialogTrigger asChild>
                <button
                    className="text-sm text-muted-foreground hover:underline"
                >
                    {likeCount} like
                </button>

            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Likes</DialogTitle>
                </DialogHeader>

                {
                    isLoading && (
                        <p className="text-sm text-center py-4">
                            Loading...
                        </p>
                    )
                }

                {
                    isError && (
                        <p className="text-sm text-center text-red-500 py-4">
                            Gagal memuat data.
                        </p>
                    )
                }

                {
                    !isLoading &&
                        !isError &&
                        data?.users.length === 0 && (
                            <p className="text-sm text-center py-4 text-muted-foreground">
                                Belum ada yang menyukai post ini.
                            </p>
                        )
                }

                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {
                        data?.users.map((user) => (
                            
                            <div
                                key={user.id}
                                // href={`/profile/${user.username}`}
                                // onClick={() => setOpen(false)}
                                className="flex items-center gap-3 hover:bg-muted rounded-md p-2"
                            
                            >
                                <div className="flex flex-row justify-between w-full  items-center gap-2">                                    
                                    <div className="flex items-center gap-3 hover:bg-muted rounded-md cursor-pointer">                                        
                                       
                                            <div  className="flex relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                                                <Link href={`/profile/${user.username}`} onClick={() => setOpen(false)}>
                                                    <Image
                                                        src={user.avatarUrl ? user.avatarUrl : "/defaultAvatar.png"}
                                                        alt={user.username}
                                                        fill
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                </Link>

                                            </div>

                                            <div  className="flex">
                                                <Link href={`/profile/${user.username}`} onClick={() => setOpen(false)}>
                                                    
                                                    <p className="font-medium">
                                                        {user.name}
                                                    </p>

                                                    <p className="text-sm text-muted-foreground">
                                                        @{user.username}
                                                    </p>
                                                </Link>

                                            </div>
                                        
                                    </div>

                                    <div className="flex ">

                                        {
                                            !user.isMe && (
                                                <Button
                                                    size="sm"
                                                    variant={user.isFollowedByMe ? "outline" : "default"}
                                                    
                                                    onClick={() =>
                                                        toggleFollow({
                                                            username: user.username,
                                                            isCurrentlyFollowed: user.isFollowedByMe,
                                                        })
                                                    }
                                                    className="cursor-pointer"
                                                >
                                                    {user.isFollowedByMe ? "Following" : "Follow"}
                                                </Button>
                                            )
                                        }

                                    </div>
                                </div>

                            </div>


                        ))
                    }


                </div>


            </DialogContent>

        </Dialog>


    );
}

export default LikesDialog;