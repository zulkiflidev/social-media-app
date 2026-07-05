"use client";

import AuthGuard from "@/components/shared/AuthGuard";
import useFollowers from "@/features/follow/hooks/useFollowers";
import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";
import Link from "next/link";

export default function MyFollowersPage() {
  return (
    <AuthGuard>
      <MyFollowersContent />
    </AuthGuard>
    
  );
}

function MyFollowersContent() {
  
  const currentUser = useAppSelector((state) => state.auth.user);

  const { data, isLoading } = useFollowers(currentUser?.username ?? "");

  const users = data?.pages.flatMap((page) => page.users) ?? [];

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  
  }

  return (
    <div className="max-w-lg mx-auto p-4 space-y-4">
        <h1 className="font-bold text-lg">Followers</h1>

        {
            users.length === 0 && (
                <p className="text-sm text-center text-muted-foreground">Belum ada followers.</p>
        
            )
        }

        <div className="space-y-2">
            
            {
                users.map((user) => (            
                    
                    <Link
                        key={user.id}
                        href={`/profile/${user.username}`}
                        className="flex items-center gap-3 p-2 border rounded-lg hover:bg-muted"
                    >

                        <div className="w-10 h-10 rounded-full bg-muted overflow-hidden relative shrink-0">
                        
                        {
                            user.avatarUrl && (
                                <Image
                                src={user.avatarUrl}
                                alt={user.username}
                                fill
                                sizes="40px"
                                className="object-cover"
                                
                                />
                            )
                        }

                        </div>

                        <div>
                            <p className="text-sm font-medium">{user.username}</p>
                            <p className="text-xs text-muted-foreground">{user.name}</p>

                        </div>
                    
                    </Link>


                ))
            }


        </div>
        
    </div>

    


  );

}