"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import useFollowers from "@/features/follow/hooks/useFollowers";



export default function FollowersPage() {

  const params = useParams<{ username: string }>();
  const { data, isLoading } = useFollowers(params.username);

  const users = data?.pages.flatMap( (page) => page.users ) ?? [];

  return (
      <div className="max-w-lg mx-auto p-4 space-y-4">
        <h1 className="font-bold text-lg">Followers</h1>

        {
          isLoading && <p className="text-sm text-center">Loading...</p>
        }

        {
          !isLoading && users.length === 0 && (
            <p className="text-sm text-center text-muted-foreground">No Follower.</p>
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


          ))}
        </div>

      </div>
  );
  
}