"use client";


import { useParams } from "next/navigation";
import Image from "next/image";

import usePublicProfile from "@/features/users/hooks/usePublicProfile";

function ProfilePage() {

    const params = useParams<{ username: string}>();
    const { data: profile, isLoading, isError } = usePublicProfile(params.username);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !profile ){
        return <div>Profile not found!</div>;
    }

    return (
        <div className="max-w-lg mx-auto p-4 space-y-4">
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-muted overflow-hidden relative shrink-0">
                    { 
                        profile.avatarUrl && (

                            <Image src={profile.avatarUrl}
                                   alt={profile.username}
                                   fill
                                   sizes="80px"
                                   className="object-cover"
                            />    
                    )}

                </div>

                <div>
                    <h1 className="font-bold text-lf">{profile.username}</h1>
                    <p className="text-sm text-muted-foreground">{profile.name}</p>
                </div>

                <div className="flex gap-6 text-sm">
                   <span><strong>{profile.postsCount}</strong> posts</span>
                   <span><strong>{profile.followersCount}</strong> followers</span>
                   <span><strong>{profile.followingCount}</strong> following</span>


                </div>

                {
                    profile.bio &&  <p className="text-sm">{profile.bio}</p>
                }

            </div>

        </div>
    );

}

export default ProfilePage;

