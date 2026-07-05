"use client";


import { useState, useEffect } from "react";
import AuthGuard from "@/components/shared/AuthGuard";
import useSearchUsers from "@/features/users/hooks/useSearchUsers";

import { Input } from "@/components/ui/input";
import Image from "next/image";

import Link from "next/link";


export default function SearchPage() {

    return (
        <AuthGuard>
            <SearchContent />
        </AuthGuard>
    );
}


function SearchContent() {

    const [inputValue, setInputValue] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(
        () => {
            const timer = setTimeout(() => {
                setDebouncedQuery(inputValue);
            }, 400);

            return () => clearTimeout(timer);

        }, [inputValue]
    );

    const { data, isLoading, isError } = useSearchUsers(debouncedQuery);    
    const users = data?.users ?? [];

    return(

         <div className="max-w-lg mx-auto p-4 space-y-4">

                <Input
                    value={inputValue}
                    onChange={
                        (e) => setInputValue(e.target.value)
                    }
                    placeholder="Cari username atau nama..."
                />

                {
                    debouncedQuery.trim() === "" && (
                        <p className="text-sm text-muted-foreground text-center">
                        Type here to find user...
                        </p>
                    )
                }

                {
                    isLoading && <p className="text-sm text-center">Finding...</p>
                }

                {
                    isError && (
                        <p className="text-sm text-red-500 text-center">Failed to load...</p>
                    )
                }

                {
                    debouncedQuery.trim() !== "" && !isLoading && users.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center">
                            User not found
                        </p>
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
                            )
                        )
                    }



                </div>
            </div>


        );

}