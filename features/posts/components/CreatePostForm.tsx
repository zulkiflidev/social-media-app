"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCreatePost from "../hooks/useCreatePost";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UploadCloud } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl mx-auto p-4 mb-50">
      <div className="space-y-2">
        <Label htmlFor="photo">Photo</Label>        
        <div className="relative w-full h-50 border border-gray-600 border-dashed rounded-lg flex flex-col items-center 
                        justify-center overflow-hidden bg-muted/50">
          {previewUrl ? (
            <div className="absolute inset-0 w-full h-full">                        
              <img src={previewUrl} alt="Preview" className="w-full h-full object-contain bg-black" />                  
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2 text-muted-foreground p-4 text-center">
              <UploadCloud className="w-10 h-10 stroke-[1.5]" />
              <p className="text-sm">Click to upload or drag and drop</p>
              <p className="text-sm">PNG or JPG (Max 5Mb)</p>

            </div>
          )}
          <Input 
            id="photo"
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        <Label htmlFor="message">Caption</Label>
        <Textarea 
          value={caption}
          placeholder="Create your caption..." 
          id="message" 
          rows={8} 
          onChange={(e) => setCaption(e.target.value)}
          className="resize-none h-25"
        />        
      </div>

      {isError && <p className="text-sm text-red-500">Failed to create Post, please try again...</p>}

      <Button type="submit" disabled={isPending || !file || !caption.trim()} className="w-full h-11">
        {isPending ? "Processing..." : "Share"}
      </Button>

      
    </form>
  );
}

export default CreatePostForm;