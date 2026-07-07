"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { Home, Plus, User } from "lucide-react";

function BottomNavBar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();  

  useEffect(() => {
    function handleScroll() {

        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            setVisible(false);
        } 
        
        else {
            setVisible(true);
        }

        lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/timeline", icon: Home, label: "Home" },
    { href: "/posts/create", icon: Plus, label: "Create" },
    { href: "/profile", icon: User, label: "Profile" },

  ];

  return (
    <div
      className={`fixed bottom-5 left-0 right-0 z-40 px-4 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-20"
      }`}
    >

        <div className="max-w-max mx-auto flex items-center gap-4 p-2 bg-[#181D27] rounded-full shadow-lg border border-gray-800">
            {
            navItems.map((item) => {
                const Icon = item.icon;          
                const isActive = pathname === item.href;

                    return (
                        <Link
                        key={item.href}
                        href={item.href}
                        className={`p-3 rounded-full transition-all duration-200 ease-in-out 
                            ${
                                isActive
                                ? "bg-blue-600 text-white"  
                                : "text-gray-400 hover:text-white hover:bg-gray-800"  
                            }
                        `}
                        >
                        <Icon className="w-6 h-6" />
                        </Link>
                    
                    );
                })


                
            }
        </div>
    </div>


  );
}

export default BottomNavBar;