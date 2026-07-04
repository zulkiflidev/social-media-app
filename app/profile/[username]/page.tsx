"use client";

import { useParams } from "next/navigation";
import Image from "next/image";

import usePublicProfile from "@/features/users/hooks/usePublicProfile";

import useToggleFollow from "@/features/follow/hooks/useToggleFollow";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/redux/hooks";

import useUserPosts from "@/features/users/hooks/useUserPosts";
import Link from "next/link";


function ProfilePage() {

    const params = useParams<{ username: string}>();
    const { data: profile, isLoading, isError } = usePublicProfile(params.username);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !profile ){
        return <div>Profile not found!</div>;
    }



    const currentUser = useAppSelector((state) => state.auth.user);
    const { mutate: toggleFollow, isPending } = useToggleFollow();

    function handleFollowClick() {
        if (!profile) return;
            // toggleFollow({ username: profile.username, isCurrentlyFollowed: profile.isFollowedByMe });
            toggleFollow({ username: profile.username, isCurrentlyFollowed: profile.isFollowing });
    }

    const { data: postsData, isLoading: postsLoading } = useUserPosts(params.username);
    const userPosts = postsData?.pages.flatMap( (page) => page.posts ) ?? [];

    return (
        <div className="max-w-lg mx-auto p-4 space-y-4">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-muted overflow-hidden relative shrink-0">
                    { 
                        profile.avatarUrl && (

                            <Image src={profile.avatarUrl}
                                   alt={profile.username}
                                   fill
                                   sizes="80px"
                                   className="object-cover"
                            />    
                    )}

                </div>

                <div>
                    <h1 className="font-bold text-lf">{profile.username}</h1>
                    <p className="text-sm text-muted-foreground">{profile.name}</p>
                </div>

                {/* <div className="flex gap-6 text-sm">
                   <span><strong>{profile.postsCount}</strong> posts</span>
                   <span><strong>{profile.followersCount}</strong> followers</span>
                   <span><strong>{profile.followingCount}</strong> following</span>

                </div> */}


                {
                    !profile.isMe && (
                            <Button onClick={handleFollowClick} disabled={isPending}>
                                {profile.isFollowing ? "Unfollow" : "Follow"}
                            </Button>
                        )
                }


                {
                    profile.bio &&  <p className="text-sm">{profile.bio}</p>
                }

                {
                    currentUser && currentUser.username !== profile.username && (
                        <Button onClick={handleFollowClick} disabled={isPending}>
                            {/* {profile.isFollowedByMe ? "Unfollow" : "Follow"} */}

                            { 

                                profile.isFollowing ? "Unfollow" : "Follow"
                            }
                        </Button>
                    
                    )
                }

            </div>




            <div className="grid grid-cols-3 gap-1 pt-4">
                {
                    postsLoading && <p className="col-span-3 text-sm text-center text-muted-foreground">Loading...</p>
                }

                {
                    !postsLoading && userPosts.length === 0 && (
                        <p className="col-span-3 text-sm text-center text-muted-foreground">Belum ada post.</p>
                    )
                }

                {
                userPosts.map((post) => (
                        <Link
                        key={post.id}
                        href={`/posts/${post.id}`}
                        className="relative aspect-square bg-muted"
                        
                        >

                        <Image
                            src={post.imageUrl}
                            alt={post.caption}
                            fill
                            sizes="(max-width: 640px) 33vw, 200px"
                            className="object-cover"
                        />
                        
                        </Link>
                    ))
                }
            </div>



        </div>
    );

}

export default ProfilePage;

