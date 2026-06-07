"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useTheme } from "next-themes";
import { Moon, Sun, Search, Bell, Heart, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
 const { theme, setTheme } = useTheme();
 const router = useRouter();
 const { isAuthenticated, logout, profile } = useAppStore();
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
 // eslint-disable-next-line react-hooks/set-state-in-effect
 setMounted(true);
 }, []);

 const handleLogout = () => {
 logout();
 document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
 router.push("/login");
 };

 const isPublic = !isAuthenticated;

 return (
 <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/70 border-b border-border ">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex justify-between items-center h-16">
 <div className="flex items-center">
 <Link href={isPublic ? "/" : "/dashboard"} className="flex items-center gap-2">
 <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
 C
 </div>
 <span className="font-bold text-xl tracking-tight hidden sm:block">
 CollegeDiscover
 </span>
 </Link>
 </div>

 <div className="flex items-center gap-4">
 {mounted && (
 <button
 onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
 className="p-2 rounded-full hover:bg-muted dark:hover:bg-gray-800 transition-colors"
 >
 {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
 </button>
 )}

 {isAuthenticated ? (
 <>
 <Link href="/colleges" className="p-2 rounded-full hover:bg-muted dark:hover:bg-gray-800 transition-colors">
 <Search size={20} />
 </Link>
 <Link href="/colleges?saved=true" className="p-2 rounded-full hover:bg-muted dark:hover:bg-gray-800 transition-colors">
 <Heart size={20} />
 </Link>
 <Link href="/notifications" className="p-2 rounded-full hover:bg-muted dark:hover:bg-gray-800 transition-colors">
 <Bell size={20} />
 </Link>
 <Link href="/profile" className="flex items-center gap-2 p-1.5 pl-3 rounded-full hover:bg-muted dark:hover:bg-gray-800 transition-colors border border-border ">
 <span className="text-sm font-medium">{profile?.name || "User"}</span>
 <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
 <User size={14} className="text-primary" />
 </div>
 </Link>
 <button
 onClick={handleLogout}
 className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
 >
 <LogOut size={20} />
 </button>
 </>
 ) : (
 <div className="flex items-center gap-3">
 <Link
 href="/login"
 className="text-sm font-medium px-4 py-2 hover:text-primary transition-colors"
 >
 Sign In
 </Link>
 <Link
 href="/login?signup=true"
 className="text-sm font-medium px-4 py-2 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
 >
 Sign Up
 </Link>
 </div>
 )}
 </div>
 </div>
 </div>
 </nav>
 );
}
