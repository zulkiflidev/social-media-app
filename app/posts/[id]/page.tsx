"use client";

import AuthGuard from "@/components/shared/AuthGuard";
import PostCard from "@/components/shared/PostCard";
import usePost from "@/features/posts/hooks/usePost";

import { useParams } from "next/navigation";



function PostDetailPage() {


    return (
        <AuthGuard>
            <PostDetailContent />
        </AuthGuard>
    );
}


function PostDetailContent() {

    const params = useParams<{   id: string }>();
    const postId = Number(params.id);

    const { data: post, isLoading, isError} = usePost(postId);

    if (isLoading) {
        return <div className="p-4 text-center">Loading...</div>;
    
    }

    if (isError || !post){
        return <div className="p-4 text-center text-red-500">Post is not found!</div>
    }


    return(

        <div className="max-w-lg mx-auto p-4 space-y-4">


            <PostCard post={post} />

            {/* Komen nanti saja dikerjakannnya...... */}
        </div>
    );



}

export default PostDetailPage;