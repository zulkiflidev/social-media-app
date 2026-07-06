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

// import usePostLikes from "../hooks/usePostLikes";

import useToggleFollow from "@/features/follow/hooks/useToggleFollow";
import { Button } from "@/components/ui/button";


interface PostDialogProps {
    postId: number;
    likeCount: number;
    
}

function PostDialog({ postId, likeCount }: PostDialogProps) {

    const [open, setOpen] = useState(false);

    // const {
    //     data,
    //     isLoading,
    //     isError,
    // } = usePostLikes(postId, open);

    // const { mutate: toggleFollow, isPending } = useToggleFollow();

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

                {/* {
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
                } */}

                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    


                </div>


            </DialogContent>

        </Dialog>


    );
}

export default PostDialog;