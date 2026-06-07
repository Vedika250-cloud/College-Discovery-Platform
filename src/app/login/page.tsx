"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";

export default function LoginPage() {
 const [isSignUp, setIsSignUp] = useState(false);
 const router = useRouter();
 const { login } = useAppStore();

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 login();
 document.cookie = "isAuthenticated=true; path=/";
 router.push("/dashboard");
 };

 return (
 <div className="min-h-screen flex items-center justify-center bg-background px-4">
 <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border shadow-xl">
 <div className="text-center mb-8">
 <div className="w-12 h-12 rounded-xl bg-primary mx-auto mb-4 flex items-center justify-center text-white font-bold text-2xl">
 C
 </div>
 <h1 className="text-2xl font-bold mb-2">
 {isSignUp ? "Create an account" : "Welcome back"}
 </h1>
 <p className="text-muted-foreground dark:text-muted-foreground text-sm">
 {isSignUp
 ? "Start your college discovery journey"
 : "Enter your credentials to access your account"}
 </p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-4">
 {isSignUp && (
 <div>
 <label className="block text-sm font-medium mb-1">Full Name</label>
 <input
 type="text"
 required
 className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
 placeholder="John Doe"
 />
 </div>
 )}
 <div>
 <label className="block text-sm font-medium mb-1">Email</label>
 <input
 type="email"
 required
 className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
 placeholder="you@example.com"
 />
 </div>
 <div>
 <label className="block text-sm font-medium mb-1">Password</label>
 <input
 type="password"
 required
 className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
 placeholder="••••••••"
 />
 </div>
 <button
 type="submit"
 className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
 >
 {isSignUp ? "Sign Up" : "Sign In"}
 </button>
 </form>

 <div className="mt-6 text-center text-sm">
 <span className="text-muted-foreground">
 {isSignUp ? "Already have an account?" : "Don't have an account?"}
 </span>{" "}
 <button
 onClick={() => setIsSignUp(!isSignUp)}
 className="text-primary font-medium hover:underline"
 >
 {isSignUp ? "Sign In" : "Sign Up"}
 </button>
 </div>
 </div>
 </div>
 );
}
