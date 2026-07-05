"use client";

import AuthGuard from "@/components/shared/AuthGuard";
import CreatePostForm from "@/features/posts/components/CreatePostForm";

export default function CreatePostPage() {
  return (
    <AuthGuard>
      <div className="max-w-lg mx-auto p-4">
            <h1 className="font-bold text-lg mb-4">Buat Post Baru</h1>
            <CreatePostForm />
      </div>

      
    </AuthGuard>

    
  );
}