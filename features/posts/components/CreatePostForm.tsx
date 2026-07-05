"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import useCreatePost from "../hooks/useCreatePost";

function CreatePostForm() {
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const { mutate: createPost, isPending, isError } = useCreatePost();



  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    
    const selected = e.target.files?.[0];
    
    if (!selected) return;
    
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));



  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !caption.trim()) return;

    createPost({ image: file, caption });

  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <Input type="file" accept="image/*" onChange={handleFileChange} />

      {
        previewUrl && (
            <div className="relative w-full aspect-square bg-muted overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                
            </div>
        )
      }

      <Input
        value={caption}
        onChange={
            (e) => setCaption(e.target.value)
        }

        placeholder="Tulis caption..."
      
      />

      {isError && <p className="text-sm text-red-500">Gagal membuat post. Coba lagi.</p>}

      <Button type="submit" disabled={ isPending || !file || !caption.trim() } className="w-full">
        { isPending ? "Mengunggah..." : "Post" }
      
      </Button>


    </form>




  );
}

export default CreatePostForm;