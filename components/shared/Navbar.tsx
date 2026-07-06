"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logout } from "@/lib/redux/slices/authSlice";

import { clearSession } from "@/lib/auth/session";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User, CircleUser, LogOut } from 'lucide-react';




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
        <nav className="border-b px-4 py-3 flex items-center justify-around">
            
            <Link href="/feed" className="font-bold text-lg">
                Sociality
            </Link>
            
            <div className="flex items-center gap-4">


                {/* <Input
                    value={inputValue}
                    onChange={
                        (e) => setInputValue(e.target.value)
                    }
                    placeholder="Cari username atau nama..."
                /> */}

                                
            </div>

            {
                isAuthenticated ? (

                    // <div className="flex items-center gap-4">                        
                    //     <Image 
                    //         className="rounded-full" 
                    //         src={user?.avatarUrl || "/defaultAvatar.png"} 
                    //         alt={user?.username || "User Avatar "} 
                    //         width={32} height={32} />                        
                    //     <Link href="/me" className="text-sm font-medium">
                    //         {user?.name}
                    //     </Link>
                    // </div>

                    <DropdownMenu>

                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="cursor-pointer">
                                <Image 
                                    className="rounded-full" 
                                    src={user?.avatarUrl || "/defaultAvatar.png"} 
                                    alt={user?.username || "User Avatar"} 
                                    width={32} height={32} />

                                {user?.name}

                            </Button>

                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">

                            <DropdownMenuLabel>

                                <div className="flex flex-col gap-4 items-start py-4">
                                    <p className="font-bold text-md text-foreground">{user?.name}</p>
                                    <p className="text-xs text-muted-foreground font-normal">@{user?.username}</p>
                                </div>

                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem asChild>
                                <Link href="/profile">
                                    <User className="w-4 h-4" />
                                    Profile
                                    
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                
                    
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