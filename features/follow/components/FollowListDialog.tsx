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

import useFollowers from "../hooks/useFollowers";
import useFollowing from "../hooks/useFollowing";

import useToggleFollow from "../hooks/useToggleFollow";
import { useAppSelector } from "@/lib/redux/hooks";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface FollowListDialogProps {
  username: string;
  type: "followers" | "following";
  children: React.ReactNode;
}

function FollowListDialog({ username, type, children }: FollowListDialogProps) {
  const [open, setOpen] = useState(false);

  const followersQuery = useFollowers(type === "followers" && open ? username : "");
  const followingQuery = useFollowing(type === "following" && open ? username : "");
  const { data, isLoading } = type === "followers" ? followersQuery : followingQuery;

  const users = data?.pages.flatMap((page) => page.users) ?? [];

  const currentUser = useAppSelector((state) => state.auth.user);
  const { mutate: toggleFollow } = useToggleFollow();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild> 
        <div>
            {children} 
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>

          <DialogTitle> { type === "followers" ? "Followers" : "Following"} </DialogTitle>

        </DialogHeader>

        {
            isLoading && (
                <p className="text-sm text-center py-4">Loading...</p>
            )
        }

        {
            !isLoading && users.length === 0 && (
                <p className="text-sm text-center py-4 text-muted-foreground">
                    { type === "followers" ? "Don't have any followers yet" : "Not following anyone yet."}
                </p>

            )
        }

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {
            users.map((user) => (
                <div
                key={user.id}
                className="flex items-center justify-between gap-2 hover:bg-muted rounded-md p-2"
                >
                    <div className="flex items-center gap-3">
                        
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                        
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

                        <Link href={`/profile/${user.username}`} onClick={() => setOpen(false)}>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">@{user.username}</p>

                        </Link>


                    </div>


                    {
                        currentUser?.id !== user.id && (
                            <Button
                                size="sm"
                                variant={user.isFollowedByMe ? "outline" : "default"}
                                onClick={() =>
                                    toggleFollow({
                                        username: user.username,
                                        isCurrentlyFollowed: user.isFollowedByMe,
                                    
                                    })
                                }
                            >
                                {user.isFollowedByMe ? <Check className="w-4 h-4" /> : ""}
                                {user.isFollowedByMe ? "Following" : "Follow"}
                                
                            </Button>
                        )
                    }


                </div>

          ))}


        </div>

      </DialogContent>
    </Dialog>
  );
}

export default FollowListDialog;