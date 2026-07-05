"use client";

import AuthGuard from "@/components/shared/AuthGuard";
import PostCard from "@/components/shared/PostCard";

import useMyLikes from "@/features/likes/hooks/useMyLikes";


export default function MyLikesPage() {
  return (
    <AuthGuard>
      <MyLikesContent />
    </AuthGuard>

  );
}

function MyLikesContent() {
  const { data, isLoading, isError } = useMyLikes();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Gagal memuat post yang disukai.</div>;
  
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      
      <h1 className="font-bold text-lg">Liked Posts</h1>

      {
        posts.length === 0 && (
            <p className="text-sm text-center text-muted-foreground">
            Belum ada post yang disukai.
            </p>
        
        )
      }

      { 
        posts.map((post) => (
            <PostCard key={post.id} post={post} />
        
        ))
      }

      
    </div>

  );

}