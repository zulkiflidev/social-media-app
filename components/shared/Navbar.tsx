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
import { Search } from 'lucide-react';

import { Input } from "@/components/ui/input";
import useSearchUsers from "@/features/users/hooks/useSearchUsers"
import { useState, useEffect, useRef } from "react";

import useMe from "@/features/profile/hooks/useMe";


function Navbar(){

    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user, user: reduxUser } = useAppSelector(
        (state) => state.auth

    );

    function handleLogout(){
        dispatch(logout());
        clearSession();
        router.push("/login");
    
    }


    const [inputValue, setInputValue] = useState("");
    const { data: searchResult } = useSearchUsers(inputValue);
    const users = searchResult?.users ?? [];

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    //const { isAuthenticated, user: reduxUser } = useAppSelector((state) => state.auth);
    const { data: me } = useMe(); 
    const targetProfile = me?.profile || me?.data?.profile || me?.data || me;

    const userDisplay = {
        name: targetProfile?.name || reduxUser?.name,
        username: targetProfile?.username || reduxUser?.username,
        avatarUrl: targetProfile?.avatarUrl || reduxUser?.avatarUrl,
    };


    // function setIsFindOpen(value: boolean){
    //     setIsFindOpen(value);
    //     if (!value) {
    //         setInputValue("");
    //     }
    // }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
                setIsMobileSearchOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    return (
        <nav className="border-b px-4 py-3 flex items-center justify-between md:justify-around relative">
            
            <Link href="/timeline" className={`font-bold text-lg ${isMobileSearchOpen ? 'hidden' : 'block'} md:block`}>
                <div className="flex gap-2">
                    <Image src="/Logo.svg" alt="Logo" width={25} height={25} />                
                    <h1 className="font-bold">Sociality</h1>
                </div>
            </Link>
            
            <div 
                className={`
                    ${isMobileSearchOpen ? 'absolute left-0 right-0 px-4' : 'hidden'} 
                    md:flex md:relative md:flex-1 md:max-w-md items-center gap-4
                `} 
                ref={searchRef}
            >
                <Input
                    value={inputValue}
                    
                    onChange={
                        (e) => {
                            setInputValue(e.target.value);
                            setIsSearchOpen(e.target.value.length > 0);
                        }
                    }
                    
                    onFocus={() => {
                        if (inputValue.length > 0) {
                            setIsSearchOpen(true);
                        }
                    }}

                    placeholder="Search..."
                    className="w-full flex-1 focus:outline-none"
                />

                {
                    isSearchOpen && users.length > 0 && (
                        <div className="absolute top-full mt-2 w-full bg-background border rounded-lg shadow-lg z-50
                                        max-h-80 overflow-y-auto">
                            {
                                users.map((user) => (
                                    
                                    <Link
                                        key={user.id}
                                        href={`/profile/${user.username}`}
                                        className="flex items-center gap-3 p-2 hover:bg-muted"
                                        onClick={
                                            () => {
                                                setIsSearchOpen(false);
                                                setInputValue("");
                                            }

                                        }
                                    >
                                                                                
                                        <Image
                                            // src={user.avatarUrl || "/defaultAvatar.png"}
                                            src={user.avatarUrl || "/defaultAvatar.png"}

                                            alt={user.username}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        
                                        {/* <div className="hidden"> */}
                                            <p><span className="text-sm font-medium"> {user.name} </span></p>
                                        {/* </div> */}

                                    </Link>
                                ))
                            }
                        </div>
                    )
                }

                                
            </div>


            <div className="flex items-center gap-2">
                <div className={`md:hidden flex items-center ${isMobileSearchOpen ? 'w-full justify-end' : ''}`}>
                    <Button variant="ghost" size="sm" onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
                        <Search className="h-5 w-5 text-white" />
                    </Button>
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

                    <div className={`${isMobileSearchOpen ? 'hidden' : 'flex'} md:flex`}>

                    <DropdownMenu>

                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="cursor-pointer">

                                <Image 
                                    className="rounded-full" 
                                    src={user?.avatarUrl || "/defaultAvatar.png"} 
                                    alt={user?.username || "User Avatar"} 
                                    width={32} height={32} />

                                <div className="hidden md:block">
                                    {user?.name}
                                </div>

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
            </div>

        </nav>
    );

}


export default Navbar;