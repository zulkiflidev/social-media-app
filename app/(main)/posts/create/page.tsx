"use client";

import AuthGuard from "@/components/shared/AuthGuard";
import CreatePostForm from "@/features/posts/components/CreatePostForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();

  return (
    <AuthGuard>
      <div className="max-w-2xl mx-auto p-4 w-full">
        <div className="flex flex-col gap-10 items-start w-full">
          
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 py-2 text-lg font-medium text-gray-300 bg-transparent 
                      rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
          >              
            <ArrowLeft className="w-4 h-4" />
            <span>Add Post</span>
          </Button>

          <CreatePostForm />


        </div>
      </div>
    </AuthGuard>
  );
}