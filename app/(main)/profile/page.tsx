"use client";

// import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import usePublicProfile from "@/features/users/hooks/usePublicProfile";
import useUserPosts from "@/features/users/hooks/useUserPosts";

import useToggleFollow from "@/features/follow/hooks/useToggleFollow";
import { Button } from "@/components/ui/button";
import { Check, CheckCircle2, SquareCheck } from 'lucide-react';
import { Images, GalleryHorizontal } from 'lucide-react';

import useUserLikes from "@/features/users/hooks/useUserLikes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart } from "lucide-react";

import FollowListDialog from "@/features/follow/components/FollowListDialog";
import { useAppSelector } from "@/lib/redux/hooks";

import { useRouter } from "next/navigation";


function MyProfilePage() {
  
//   const params = useParams<{ username: string }>();
  const currentUser = useAppSelector((state) => state.auth.user);
  const username = currentUser?.username ?? "";


  const { data: profile, isLoading, isError } = usePublicProfile(username);
  const { data: postsData, isLoading: postsLoading } = useUserPosts(username);
  const { mutate: toggleFollow, isPending } = useToggleFollow();
  const { data: likesData, isLoading: likesLoading } = useUserLikes(username);

  const userPosts = postsData?.pages.flatMap((page) => page.posts) ?? [];
  const userLikes = likesData?.pages.flatMap((page) => page.posts) ?? [];

  const router = useRouter();

  function handleFollowClick() {
    if (!profile) return;
    toggleFollow(
      { 
        username: username, 
        isCurrentlyFollowed: profile.isFollowing 
      }
    );  
  
  }


  function handleEditClick() {
    if (!profile) return;

    router.push("/profile/edit");
  }


  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;

  }

  if (isError || !profile) {
    return <div className="p-4 text-center text-red-500">User is not found!</div>;
  
  }

  //const userLikes = likesData?.pages.flatMap( (page) => page.posts) ?? [];


  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 w-full">
      <div className="flex items-center gap-4 w-full justify-between">
          
          
          <div className="flex flex-row gap-2">
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

              <div className="flex flex-col">
                <h1 className="font-bold text-lg">   {profile.username}</h1>
                <p className="text-sm text-muted-foreground">{profile.name}</p>
            
              </div>
          </div>

          <div>
                <Button onClick={handleEditClick} disabled={isPending}
                          variant="outline"
                          className="p-4"
                          size="lg"
                  >

                    Edit Profile
                  
                </Button>
                
          </div>

      </div>

      {
        
        profile.bio && <p className="text-sm">{profile.bio}</p>
      
      }


      <div className="flex gap-6 w-full justify-around">


          <Link href="#">
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="font-medium text-xl "><strong>{profile.counts.post}</strong></p> 
              <p className="font-medium text-lg text-muted-foreground" >Posts</p>
            </div>
          </Link>


          <FollowListDialog username={username} type="followers"> 
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="font-medium text-xl "><strong>{profile.counts.followers}</strong></p> 
              <p className="font-medium text-lg text-muted-foreground" >Follower</p>
            </div>
          </FollowListDialog>


          <FollowListDialog username={username} type="followers">
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="font-medium text-xl "><strong>{profile.counts.following}</strong></p> 
              <p className="font-medium text-lg text-muted-foreground" >Following</p>
            </div>
          </FollowListDialog>

          <Link href="#">
            <div className="flex flex-col gap-2 justify-center items-center">
              <p className="font-medium text-xl "><strong>{profile.counts.likes}</strong></p> 
              <p className="font-medium text-lg text-muted-foreground" >Likes</p>
            </div>
          </Link>

      </div>

    
      <Tabs defaultValue="posts" className="pt-4">
        <TabsList className="grid w-full grid-cols-2 bg-transparent h-auto p-0 rounded-none ">
          <TabsTrigger value="posts" className="tab-underline-trigger"> 
                                                  
              <Images className="w-5 h-5" /> Gallery 

          </TabsTrigger>
          <TabsTrigger value="likes" className="tab-underline-trigger"> 
                        
              <Heart className="w-6 h-6"/>Liked 
          </TabsTrigger>

        </TabsList>

        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-1 pt-5">
           
            {
              postsLoading && (
                <p className="col-span-3 text-sm text-center text-muted-foreground">Loading...</p>
              
              )
            }
            
            {
              !postsLoading && userPosts.length === 0 && (
                <p className="col-span-3 text-sm text-center text-muted-foreground">Not Post found</p>
              )
            }
            
            {
              userPosts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`} className="relative aspect-square bg-muted">
                  
                  <Image src={post.imageUrl} alt={post.caption} fill 
                         sizes="(max-width: 640px) 33vw, 200px" className="object-cover" 
                         
                         />
                
                </Link>

              ))
            }
          </div>
        </TabsContent>

        <TabsContent value="likes">
          <div className="grid grid-cols-3 gap-1 pt-5">
            
            {
              likesLoading && (
                <p className="col-span-3 text-sm text-center text-muted-foreground">Loading...</p>
              )
            }

            
            {
              !likesLoading && userLikes.length === 0 && (
                <p className="col-span-3 text-sm text-center text-muted-foreground"> No liked posts </p>
              )
            }
            
            {
              userLikes.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`} 
                      className="relative aspect-square bg-muted">
                  
                        <Image src={post.imageUrl} alt={post.caption} fill 
                          sizes="(max-width: 640px) 33vw, 200px" 
                          className="object-cover" />
                  
                </Link>


              ))
            }
          
          </div>

        </TabsContent>


      </Tabs>


    </div>


  );
}


export default MyProfilePage;