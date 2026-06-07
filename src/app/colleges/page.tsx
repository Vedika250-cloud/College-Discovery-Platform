"use client";

import { Navbar } from "@/components/Navbar";
import { useAppStore } from "@/lib/store";
import { colleges } from "@/lib/data";
import Link from "next/link";
import { calculateFitScore } from "@/lib/utils";
import { Heart, Search, BarChart2, Check } from "lucide-react";
import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

function CollegesContent() {
 const { savedColleges, toggleSaveCollege, compareColleges, addToCompare, profile } = useAppStore();
 const searchParams = useSearchParams();
 const showSavedOnly = searchParams.get("saved") === "true";

 const [searchTerm, setSearchTerm] = useState("");
 const [filterOwnership, setFilterOwnership] = useState("");

 const filteredColleges = useMemo(() => {
 return colleges.filter(college => {
 if (showSavedOnly && !savedColleges.includes(college.id)) return false;
 if (searchTerm && !college.name.toLowerCase().includes(searchTerm.toLowerCase()) && !college.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
 if (filterOwnership && college.ownership !== filterOwnership) return false;
 return true;
 });
 }, [showSavedOnly, searchTerm, filterOwnership, savedColleges]);

 return (
 <div className="min-h-screen bg-background flex flex-col">
 <Navbar />
 
 <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
 <h1 className="text-3xl font-bold">
 {showSavedOnly ? "Saved Colleges" : "Discover Colleges"}
 </h1>
 
 {/* Filters & Search */}
 <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
 <div className="relative">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
 <input
 type="text"
 placeholder="Search colleges, cities..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full sm:w-64 pl-10 pr-4 py-2 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
 />
 </div>
 <select
 value={filterOwnership}
 onChange={(e) => setFilterOwnership(e.target.value)}
 className="p-2 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
 >
 <option value="">All Ownerships</option>
 <option value="Public">Public</option>
 <option value="Private">Private</option>
 </select>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
 {filteredColleges.map((college) => {
 const isSaved = savedColleges.includes(college.id);
 const inCompare = compareColleges.includes(college.id);
 const fit = profile ? calculateFitScore(profile, college) : null;

 return (
 <div key={college.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group flex flex-col">
 <div className="p-6 flex-1">
 <div className="flex justify-between items-start mb-4 gap-2">
 <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
 <Link href={`/colleges/${college.id}`}>{college.name}</Link>
 </h2>
 <button 
 onClick={() => toggleSaveCollege(college.id)}
 className={`p-2 rounded-full flex-shrink-0 transition-colors ${isSaved ? "bg-red-50 text-red-500 dark:bg-red-900/30" : "bg-muted/50 text-muted-foreground hover:text-red-500 "}`}
 >
 <Heart size={20} className={isSaved ? "fill-current" : ""} />
 </button>
 </div>
 
 <div className="space-y-2 mb-6 text-sm text-muted-foreground dark:text-muted-foreground">
 <div className="flex items-center gap-2">
 <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
 {college.location}
 </div>
 <div className="flex items-center gap-2">
 <span className="inline-block w-2 h-2 rounded-full bg-purple-500"></span>
 {college.ownership}
 </div>
 <div className="flex items-center gap-2">
 <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
 Rank #{college.rankings}
 </div>
 </div>

 {fit && (
 <div className="bg-background rounded-xl p-3 border border-border mb-6">
 <div className="flex justify-between items-center mb-1">
 <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fit Score</span>
 <span className={`text-sm font-bold ${fit.score > 70 ? 'text-green-500' : fit.score > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
 {fit.level}
 </span>
 </div>
 <div className="w-full bg-muted/80 rounded-full h-2">
 <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${fit.score}%` }}></div>
 </div>
 </div>
 )}
 </div>

 <div className="grid grid-cols-2 border-t border-border bg-muted/50 ">
 <Link 
 href={`/colleges/${college.id}`}
 className="py-3 text-center text-sm font-medium hover:bg-muted dark:hover:bg-gray-800 transition-colors border-r border-border "
 >
 Details
 </Link>
 <button 
 onClick={() => !inCompare && addToCompare(college.id)}
 disabled={inCompare || compareColleges.length >= 3}
 className="py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-muted dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
 >
 {inCompare ? <><Check size={16} /> Added</> : <><BarChart2 size={16} /> Compare</>}
 </button>
 </div>
 </div>
 );
 })}
 </div>

 {filteredColleges.length === 0 && (
 <div className="text-center py-20">
 <h3 className="text-xl font-bold mb-2">No colleges found</h3>
 <p className="text-muted-foreground">Try adjusting your search or filters.</p>
 </div>
 )}
 </main>

 {/* Compare Tray */}
 {compareColleges.length > 0 && (
 <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-2xl p-4 z-40 transform translate-y-0 transition-transform">
 <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
 <div className="flex items-center gap-4">
 <span className="font-bold">{compareColleges.length}/3 Selected</span>
 <div className="flex gap-2">
 {compareColleges.map(id => {
 const c = colleges.find(col => col.id === id);
 return c ? (
 <div key={id} className="text-xs bg-muted px-3 py-1.5 rounded-full border border-border line-clamp-1 max-w-[150px]">
 {c.name}
 </div>
 ) : null;
 })}
 </div>
 </div>
 <div className="flex gap-3 w-full md:w-auto">
 <Link href="/compare" className="flex-1 md:flex-none text-center px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
 Compare Now
 </Link>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}

export default function CollegesPage() {
 return (
 <Suspense fallback={<div className="min-h-screen bg-background flex flex-col items-center justify-center">Loading colleges...</div>}>
 <CollegesContent />
 </Suspense>
 );
}
