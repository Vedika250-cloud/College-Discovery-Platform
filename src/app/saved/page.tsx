"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { colleges } from "@/lib/data";
import { calculateFitScore } from "@/lib/utils";
import Link from "next/link";
import { Search, Heart, SlidersHorizontal, Scale, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SavedCollegesPage() {
  const { profile, savedColleges, toggleSaveCollege, addToCompare, compareColleges } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"fit" | "fees_low" | "fees_high" | "placements">("fit");

  const savedData = colleges
    .filter(c => savedColleges.includes(c.id))
    .map(c => ({ college: c, fit: calculateFitScore(profile, c) }));

  // Filter
  const filtered = savedData.filter(({ college }) => 
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "fit") return b.fit.score - a.fit.score;
    if (sortBy === "fees_low") return a.college.fees - b.college.fees;
    if (sortBy === "fees_high") return b.college.fees - a.college.fees;
    if (sortBy === "placements") return b.college.placements - a.college.placements;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Heart className="text-red-500 fill-red-500" size={32}/> Saved Colleges
            </h1>
            <p className="text-muted-foreground mt-2">You have saved {savedColleges.length} colleges to your list.</p>
          </div>

          {savedColleges.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="text" 
                  placeholder="Search saved..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "fit" | "fees_low" | "fees_high" | "placements")}
                  className="w-full sm:w-auto appearance-none pl-10 pr-8 py-2 border border-border rounded-xl bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="fit">Sort by Match Score</option>
                  <option value="fees_low">Lowest Fees First</option>
                  <option value="fees_high">Highest Fees First</option>
                  <option value="placements">Highest Placements</option>
                </select>
                <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              </div>
            </div>
          )}
        </div>

        {savedColleges.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-3xl text-center px-4">
            <div className="bg-red-100 dark:bg-red-900/20 p-6 rounded-full mb-6">
              <Heart className="text-red-500" size={48} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">No saved colleges yet</h2>
            <p className="text-muted-foreground max-w-md mb-8">Start exploring colleges and click the heart icon to save your favorites here for easy access.</p>
            <Link href="/colleges" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
              Explore Colleges
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {sorted.map(({ college, fit }) => (
                <motion.div 
                  key={college.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all group flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`px-3 py-1 text-xs font-bold rounded-full ${fit.eligibility === 'Safe' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : fit.eligibility === 'Moderate' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {fit.eligibility} Admission
                      </div>
                      <button 
                        onClick={() => toggleSaveCollege(college.id)}
                        className="p-2 rounded-full flex-shrink-0 transition-colors bg-red-50 text-red-500 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50"
                        title="Remove from saved"
                      >
                        <Heart size={20} className="fill-red-500" />
                      </button>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">{college.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-6"><MapPin size={14}/> {college.location}</p>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between pb-2 border-b border-border">
                        <span className="text-muted-foreground">Fees/Year</span>
                        <span className="font-semibold text-foreground">₹{college.fees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between pb-2 border-b border-border">
                        <span className="text-muted-foreground">Avg Placement</span>
                        <span className="font-semibold text-green-600 dark:text-green-400">₹{college.placements.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-border bg-muted/30">
                    <button 
                      onClick={() => addToCompare(college.id)}
                      disabled={compareColleges.includes(college.id) || compareColleges.length >= 3}
                      className="py-4 flex items-center justify-center gap-2 text-sm font-medium hover:bg-muted transition-colors border-r border-border disabled:opacity-50"
                    >
                      <Scale size={16} />
                      {compareColleges.includes(college.id) ? "Added" : "Compare"}
                    </button>
                    <Link 
                      href={`/colleges/${college.id}`}
                      className="py-4 flex items-center justify-center text-sm font-medium text-primary hover:bg-muted transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {sorted.length === 0 && searchQuery !== "" && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No saved colleges match your search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
