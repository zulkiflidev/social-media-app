"use client";

import React from 'react';
import AuthGuard from '@/components/shared/AuthGuard';
import useFeed  from '@/features/posts/hooks/useFeed';

import PostCard from "@/components/shared/PostCard";

function FeedPage() {
  return (
    <AuthGuard>
        <FeedContent />
    </AuthGuard>

  )
}

function FeedContent() {

    const { 
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        
    } = useFeed();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error loading posts.</div>; 
    }

    const posts = data?.pages.flatMap( (page) => page.items) ?? [];

    if (posts.length === 0) {
        return <div>No posts found.</div>;

    }

    return (
        <div className="max-w-lg mx-auto p-4 space-y-4">
            {posts.map(
                (post) => (
                    // <div key={post.id} className="border rounded-lg p-4">
                    //     {post.caption}
                    // </div>
                    <PostCard key={post.id} post={post} />

                )
            )}

            {
                hasNextPage && (

                    <button onClick={
                        () => {
                            fetchNextPage();
                        }
                    } disabled={isFetchingNextPage}>
                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                    </button>
                )

            }


        </div>
    );
}
 

export default FeedPage;