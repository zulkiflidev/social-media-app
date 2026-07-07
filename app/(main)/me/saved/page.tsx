"use client";

import AuthGuard from "@/components/shared/AuthGuard";
import useSavedPosts from "@/features/saves/hooks/useSavedPosts";
import Image from "next/image";
import Link from "next/link";

export default function SavedPage() {
  return (
    <AuthGuard>
      <SavedContent />
    </AuthGuard>

    
  );
}

function SavedContent() {
  const { data, isLoading, isError } = useSavedPosts();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="p-4 text-center text-red-500">Failed to load saved list...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
      <h1 className="font-bold text-lg">Saved Posts</h1>

      { 
        posts.length === 0 && (
            <p className="text-sm text-center text-muted-foreground">
              There are no saved posts yet.
            </p>
        )
      }

      <div className="grid grid-cols-3 gap-1">

        {
            posts.map((post) => (
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