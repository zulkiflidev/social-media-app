"use client";

import { useState, useEffect, type FormEvent } from "react";
import AuthGuard from "@/components/shared/AuthGuard";

import useMe from "@/features/profile/hooks/useMe";
import useUpdateProfile from "@/features/profile/hooks/useUpdateProfile";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  return (
    <AuthGuard>
      <EditProfileContent />
    </AuthGuard>
  );
}

function EditProfileContent() {
  const { data: me, isLoading } = useMe();
  const { mutate: updateProfile, isPending, isError } = useUpdateProfile();
  const router = useRouter();


  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!me) return;

    const targetProfile = me.profile || me.data?.profile || me.data || me;

    

    if (targetProfile && (targetProfile.name !== undefined || targetProfile.username !== undefined)) {
      setName(targetProfile.name ?? "");
      setUsername(targetProfile.username ?? "");
      
      setEmail(targetProfile.email ?? "");
      setPhone(targetProfile.phone ?? "");
      setBio(targetProfile.bio ?? "");

    }    
  }, [me]);  

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (!file) return;
      setAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
  }

  function handleSubmit(e: FormEvent) {
      e.preventDefault();
      updateProfile({
        name,
        username,
        email,
        phone,
        bio,
        avatar: avatarFile ?? undefined,

        
      });
  }

  if (isLoading) {
    return <div className="p-4 text-center">Loading from API...</div>;


  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      
      <h1 className="font-bold text-lg mb-4">
        
        <Button onClick={() => router.back()} variant="ghost">
          ← Edit Profile
        </Button>

      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">

          <div className="w-full md:w-1/4 flex flex-col items-center gap-2">
        
            <div className="relative w-24 h-24 rounded-full bg-muted overflow-hidden">

              <img
                src={previewUrl || me?.avatarUrl || me?.data?.profile?.avatarUrl || "/defaultAvatar.png"}
                alt="Avatar"
                className="w-full h-full object-cover"


              />
        
            </div>

            <Input type="file" accept="image/*" onChange={handleAvatarChange} />



          </div>

          <div className="flex-1 space-y-3">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-medium">Username</label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div>
              <label className="text-sm font-medium">Bio</label>
              <Input value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>

            {
              isError && (
                <p className="text-sm text-red-500">Failed to update profile, please try again...</p>
              )
            }

            <Button type="submit" disabled={isPending} className="w-full">
              
              {isPending ? "Saving..." : "Update Profile"}

            </Button>
          </div>


      </form>


    </div>
  );
}