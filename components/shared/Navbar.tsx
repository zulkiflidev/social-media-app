"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/slices/authSlice";

import { clearSession } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";



function Navbar(){

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector(
        (state) => state.auth

    );

    function handleLogout(){
        dispatch(logout());
        clearSession();
        router.push("/login");
    
    }

    return (
        <nav className="border-b px-4 py-3 flex items-center justify-between">
            
            <Link href="/feed" className="font-bold text-lg">
                Sociality
            </Link>
            
            <div className="flex items-center gap-4">
                <Link href="/feed" className="text-sm">
                    Feed
                </Link>

                <Link href="/users/search" className="text-sm">
                    Search
                </Link>

                <Link href="/posts/create" className="text-sm">
                    + Post
                </Link>                
            </div>


            {
                isAuthenticated ? (
                    <div className="flex items-center gap-4">
                        <Link href="/me" className="text-sm font-medium">
                            {user?.name}
                        </Link>

                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                    
                ) : (

                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium">
                            <Button variant="ghost" size="sm">
                                Login
                            </Button>
                        </Link>

                        <Link href="/register" className="text-sm font-medium">
                            <Button size="sm">Register</Button>
                        </Link>
                    </div>
                )
            }

        </nav>
    );

}


export default Navbar;