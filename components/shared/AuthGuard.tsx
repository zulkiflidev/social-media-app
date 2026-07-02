"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";

function AuthGuard({children}: {
    children: React.ReactNode
}){

    const router = useRouter();
    const pathname = usePathname();
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );


    useEffect(
        () => {

            if (!isAuthenticated){
                router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
            }
        }, [isAuthenticated, pathname, router]

    );

    if (!isAuthenticated) {
        return null;
    }
    return <>{children}</>;
}