"use client";

import { Navbar } from "@/components/Navbar";
import { useAppStore } from "@/lib/store";
import { colleges } from "@/lib/data";
import { calculateFitScore } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, BarChart2, Check, MapPin, Building, GraduationCap, IndianRupee, Trophy, Info, TrendingUp, Target, Activity } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";
import { CollegeAnalytics } from "@/components/CollegeAnalytics";

export default function CollegeDetailsPage() {
 const params = useParams();
 const id = params.id as string;
 
 const college = colleges.find(c => c.id === id);
 const { profile, savedColleges, toggleSaveCollege, compareColleges, addToCompare } = useAppStore();

 if (!college) {
 return (
 <div className="min-h-screen bg-background flex flex-col">
 <Navbar />
 <main className="flex-1 max-w-7xl mx-auto px-4 py-20 text-center w-full">
 <h1 className="text-3xl font-bold mb-4">College Not Found</h1>
 <p className="text-muted-foreground mb-8">The college you are looking for does not exist.</p>
 <Link href="/colleges" className="text-primary hover:underline">Return to Colleges</Link>
 </main>
 </div>
 );
 }

 const isSaved = savedColleges.includes(college.id);
 const inCompare = compareColleges.includes(college.id);
 const fit = profile ? calculateFitScore(profile, college) : null;

 return (
 <div className="min-h-screen bg-background flex flex-col">
 <Navbar />
 
 <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
 <div className="mb-6">
 <BackButton label="Back to Search" fallbackRoute="/colleges" />
 </div>

 {/* Header Section */}
 <div className="bg-card border border-border rounded-3xl p-8 mb-8 relative overflow-hidden">
 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
 
 <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
 <div>
 <h1 className="text-4xl font-bold mb-4">{college.name}</h1>
 <div className="flex flex-wrap gap-4 text-sm font-medium text-foreground ">
 <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
 <MapPin size={16} className="text-blue-500" /> {college.location}
 </div>
 <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
 <Building size={16} className="text-purple-500" /> {college.ownership}
 </div>
 <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
 <Trophy size={16} className="text-yellow-500" /> NIRF Rank #{college.rankings}
 </div>
 </div>
 </div>

 <div className="flex flex-wrap gap-3 w-full md:w-auto">
 <Link 
   href="/predictor"
   className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/20 dark:border-blue-900/50 dark:hover:bg-blue-900/40"
 >
   <Target size={20} /> Check Chances
 </Link>
 <button 
 onClick={() => toggleSaveCollege(college.id)}
 className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
 isSaved 
 ? "bg-red-50 text-red-500 border border-red-200 dark:bg-red-900/20 dark:border-red-900/50" 
 : "bg-background border border-border hover:bg-muted/50 dark:hover:bg-gray-900"
 }`}
 >
 <Heart size={20} className={isSaved ? "fill-current" : ""} />
 {isSaved ? "Saved" : "Save"}
 </button>
 
 <button 
 onClick={() => !inCompare && addToCompare(college.id)}
 disabled={inCompare || compareColleges.length >= 3}
 className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
 inCompare
 ? "bg-primary/10 text-primary border border-primary/20 cursor-not-allowed"
 : "bg-primary text-white hover:bg-primary/90"
 }`}
 >
 {inCompare ? <><Check size={20} /> Added to Compare</> : <><BarChart2 size={20} /> Compare</>}
 </button>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <div className="lg:col-span-2 space-y-8">
 {/* About Section */}
 <section className="bg-card border border-border rounded-2xl p-6">
 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
 <Info className="text-primary" /> About
 </h2>
 <p className="text-foreground leading-relaxed">
 {college.description}
 </p>
 </section>

 {/* Courses Section */}
 <section className="bg-card border border-border rounded-2xl p-6">
 <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
 <GraduationCap className="text-primary" /> Top Courses Offered
 </h2>
 <div className="grid sm:grid-cols-2 gap-3">
 {college.courses.map((course, i) => (
 <div key={i} className="bg-background border border-border p-3 rounded-xl flex items-center gap-3">
 <div className="w-2 h-2 rounded-full bg-primary/50"></div>
 <span className="font-medium">{course}</span>
 </div>
 ))}
 </div>
 </section>
 </div>

 <div className="space-y-8">
 {/* Quick Stats */}
 <section className="bg-card border border-border rounded-2xl p-6">
 <h2 className="text-xl font-bold mb-6">Key Statistics</h2>
 <div className="space-y-6">
 <div>
 <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
 <IndianRupee size={16} /> Annual Fees
 </div>
 <div className="text-2xl font-bold font-mono">
 ₹{college.fees.toLocaleString()}
 </div>
 </div>
 <div>
 <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
 <TrendingUp className="text-green-500" size={16} /> Average Placement
 </div>
 <div className="text-2xl font-bold font-mono text-green-600 dark:text-green-400">
 ₹{college.placements.toLocaleString()}
 </div>
 </div>
 </div>
 </section>

 {/* Fit Score */}
 {fit && (
 <section className="bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/20 rounded-2xl p-6">
 <h2 className="text-xl font-bold mb-6">Your Fit Score</h2>
 
 <div className="flex items-center gap-4 mb-6">
 <div className="relative w-20 h-20 flex items-center justify-center">
 <svg className="w-full h-full transform -rotate-90">
 <circle cx="40" cy="40" r="36" className="stroke-gray-200 fill-none" strokeWidth="8" />
 <circle cx="40" cy="40" r="36" className="stroke-primary fill-none transition-all duration-1000" strokeWidth="8" strokeDasharray="226" strokeDashoffset={226 - (226 * fit.score) / 100} strokeLinecap="round" />
 </svg>
 <div className="absolute inset-0 flex items-center justify-center flex-col">
 <span className="text-xl font-bold leading-none">{fit.score}%</span>
 </div>
 </div>
 <div>
 <div className={`text-lg font-bold ${fit.score > 70 ? 'text-green-500' : fit.score > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
 {fit.level}
 </div>
 <div className="text-sm text-muted-foreground">Based on your profile preferences</div>
 </div>
 </div>

 <div className="space-y-4">
 {fit.strengths.length > 0 && (
 <div>
 <div className="text-sm font-bold text-green-600 dark:text-green-400 mb-2 uppercase tracking-wider">Strengths</div>
 <ul className="space-y-1">
 {fit.strengths.map((s, i) => (
 <li key={i} className="text-sm flex items-start gap-2">
 <span className="text-green-500 mt-0.5">•</span> {s}
 </li>
 ))}
 </ul>
 </div>
 )}
 {fit.tradeoffs.length > 0 && (
 <div>
 <div className="text-sm font-bold text-red-600 dark:text-red-400 mb-2 uppercase tracking-wider">Trade-offs</div>
 <ul className="space-y-1">
 {fit.tradeoffs.map((s, i) => (
 <li key={i} className="text-sm flex items-start gap-2">
 <span className="text-red-500 mt-0.5">•</span> {s}
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 </section>
 )}
 </div>
 </div>

  {/* Analytics Section */}
  <div className="mt-8">
    <div className="flex items-center gap-2 mb-6">
      <Activity className="text-primary" size={28} />
      <h2 className="text-3xl font-bold">Analytics & Trends</h2>
    </div>
    <CollegeAnalytics college={college} />
  </div>
  </main>
 </div>
 );
}
