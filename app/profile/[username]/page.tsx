"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import usePublicProfile from "@/features/users/hooks/usePublicProfile";
import useUserPosts from "@/features/users/hooks/useUserPosts";

import useToggleFollow from "@/features/follow/hooks/useToggleFollow";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  
  const params = useParams<{ username: string }>();

  const { data: profile, isLoading, isError } = usePublicProfile(params.username);
  const { data: postsData, isLoading: postsLoading } = useUserPosts(params.username);
  const { mutate: toggleFollow, isPending } = useToggleFollow();

  const userPosts = postsData?.pages.flatMap((page) => page.posts) ?? [];

  // function handleFollowClick() {
  //   if (!profile) return;

  //   toggleFollow(
  //     { 
  //       username: profile.username, isCurrentlyFollowed: profile.isFollowing 
  //   });
  // }

  function handleFollowClick() {
    if (!profile) return;
    toggleFollow(
      { 
        username: params.username, 
        isCurrentlyFollowed: profile.isFollowing 
      }
    );  
  
  }

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;

  }

  if (isError || !profile) {
    return <div className="p-4 text-center text-red-500">Pengguna tidak ditemukan.</div>;
  
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-muted overflow-hidden relative shrink-0">

          {
            profile.avatarUrl && (

                <Image
                  src={ profile.avatarUrl }
                  alt={ profile.username }
                  fill
                  sizes="80px"
                  className="object-cover"
                />
            
            )}
            
        </div>

        <div>
          <h1 className="font-bold text-lg">{profile.username}</h1>
          <p className="text-sm text-muted-foreground">{profile.name}</p>
       
        </div>
      
      </div>

      <div className="flex gap-6 text-sm">
        <span><strong>{profile.counts.posts}</strong> posts</span>
        
        <Link href={`/profile/${profile.username}/followers`}>
          <strong>{ profile.counts.followers }</strong> followers

        </Link>

        <Link href={`/profile/${profile.username}/following`}>
          <strong> { profile.counts.following }</strong> following
        </Link>
      
      
      </div>

      {
        profile.bio && <p className="text-sm">{profile.bio}</p>
      }

      {
        !profile.isMe && (
          <Button onClick={handleFollowClick} disabled={isPending}>
            {profile.isFollowing ? "Unfollow" : "Follow"}
          
          </Button>
        )
      }

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