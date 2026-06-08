"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { useTheme } from "next-themes";
import { Moon, Sun, Search, Bell, User, LogOut, LayoutDashboard, Bookmark, BarChart2, Settings, LayoutGrid, GraduationCap, Map } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
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

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Discover", href: "/colleges", icon: Search },
    { name: "Map", href: "/explore", icon: Map },
    { name: "Compare", href: "/compare", icon: BarChart2 },
    { name: "Track Apps", href: "/applications", icon: LayoutGrid },
    { name: "Scholarships", href: "/scholarships", icon: GraduationCap },
    { name: "Saved", href: "/saved-colleges", icon: Bookmark },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link href={isPublic ? "/" : "/dashboard"} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20">
                C
              </div>
              <span className="font-bold text-2xl tracking-tight hidden lg:block text-foreground">
                CollegeFinder
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1 bg-muted/50 p-1.5 rounded-2xl border border-border">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon size={16} />
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-background rounded-xl shadow-sm border border-border -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            {isAuthenticated ? (
              <>
                <Link 
                  href="/notifications" 
                  className={`p-2.5 rounded-xl transition-colors relative ${pathname === '/notifications' ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                >
                  <Bell size={20} />
                </Link>
                
                <Link 
                  href="/settings"
                  className={`p-2.5 rounded-xl transition-colors ${pathname === '/settings' ? 'bg-primary/10 text-primary' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}`}
                  title="Settings"
                >
                  <Settings size={20} />
                </Link>

                <Link 
                  href="/profile" 
                  className={`flex items-center gap-2 p-1.5 pl-4 rounded-xl transition-colors border ${pathname === '/profile' ? 'bg-primary/5 border-primary/20 text-primary' : 'bg-card border-border hover:bg-muted text-foreground'}`}
                >
                  <span className="text-sm font-bold truncate max-w-[100px]">{profile?.name?.split(' ')[0] || "User"}</span>
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden">
                    {profile?.profileImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} className="text-primary" />
                    )}
                  </div>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-muted transition-colors text-foreground"
                >
                  Sign In
                </Link>
                <Link
                  href="/login?signup=true"
                  className="text-sm font-bold px-5 py-2.5 bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation (Bottom Bar) */}
        {isAuthenticated && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-border p-2 z-50 flex justify-around items-center safe-area-bottom">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[64px] ${
                    isActive ? "text-primary bg-primary/10" : "text-muted-foreground"
                  }`}
                >
                  <Icon size={20} className="mb-1" />
                  <span className="text-[10px] font-medium">{link.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
