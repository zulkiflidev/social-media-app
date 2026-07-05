"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";

function AuthGuard({children}: {
    children: React.ReactNode
}){

    const router = useRouter();
    const pathname = usePathname();
    
    // const {isAuthenticated = useAppSelector(
    //     (state) => state.auth.isAuthenticated
    // )

    const { isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);



    useEffect(
        () => {

            if ( isInitialized && !isAuthenticated){
                router.push(`/login?returnTo=${encodeURIComponent(pathname)}`);
            }
        }, [isAuthenticated, pathname, router]

    );


    if (!isInitialized) {
        return <div className="p-4 text-center">Loading...</div>
    }
    
    if (!isAuthenticated) {
        return null;
    }
    return <>{children}</>;
}

export default AuthGuard;