"use client";

import { useAppStore } from "@/lib/store";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/ui/BackButton";
import { useTheme } from "next-themes";
import { LogOut, User, Bell, Shield, Moon, Sun, Monitor } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { logout, profile } = useAppStore();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-6">
          <BackButton label="Back" fallbackRoute="/dashboard" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Settings Sidebar */}
          <div className="md:col-span-1 space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/10 text-primary font-medium text-left">
              <User size={18} /> Account
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium text-left transition-colors">
              <Bell size={18} /> Notifications
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground font-medium text-left transition-colors">
              <Shield size={18} /> Privacy & Security
            </button>
          </div>

          {/* Settings Content */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Account Details */}
            <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Account Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <p className="text-foreground font-medium">{profile?.email || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Password</label>
                  <p className="text-foreground font-medium">••••••••</p>
                  <button className="text-primary text-sm font-medium mt-1 hover:underline">Change Password</button>
                </div>
              </div>
            </section>

            {/* Appearance */}
            <section className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Appearance</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">Theme Preference</label>
                  {mounted && (
                    <div className="flex gap-3">
                      <button 
                        onClick={() => setTheme("light")}
                        className={`flex-1 py-3 flex flex-col items-center gap-2 border rounded-xl transition-all ${theme === 'light' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}
                      >
                        <Sun size={20} />
                        <span className="text-sm font-medium">Light</span>
                      </button>
                      <button 
                        onClick={() => setTheme("dark")}
                        className={`flex-1 py-3 flex flex-col items-center gap-2 border rounded-xl transition-all ${theme === 'dark' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}
                      >
                        <Moon size={20} />
                        <span className="text-sm font-medium">Dark</span>
                      </button>
                      <button 
                        onClick={() => setTheme("system")}
                        className={`flex-1 py-3 flex flex-col items-center gap-2 border rounded-xl transition-all ${theme === 'system' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-muted'}`}
                      >
                        <Monitor size={20} />
                        <span className="text-sm font-medium">System</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="bg-card border border-destructive/20 rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-destructive">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground font-medium transition-colors"
                >
                  <LogOut size={18} /> Sign Out
                </button>
                <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors">
                  Delete Account
                </button>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
