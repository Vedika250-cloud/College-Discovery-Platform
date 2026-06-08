"use client";

import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/ui/BackButton";
import { useAppStore } from "@/lib/store";
import { colleges } from "@/lib/data";
import Link from "next/link";
import { Heart, MapPin, Check, BarChart2, BookmarkMinus } from "lucide-react";
import { motion } from "framer-motion";

export default function SavedCollegesPage() {
  const { savedColleges, toggleSaveCollege, compareColleges, addToCompare } = useAppStore();

  const savedCollegesData = colleges.filter(c => savedColleges.includes(c.id));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="mb-6">
          <BackButton label="Back to Dashboard" fallbackRoute="/dashboard" />
        </div>

        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Saved Colleges</h1>
            <p className="text-muted-foreground mt-1">
              You have {savedColleges.length} saved {savedColleges.length === 1 ? 'college' : 'colleges'}
            </p>
          </div>
        </div>

        {savedCollegesData.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-2xl shadow-sm">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
              <Heart size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2 text-foreground">No saved colleges yet</h2>
            <p className="text-muted-foreground mb-6">Start exploring and save colleges you&apos;re interested in to compare them later.</p>
            <Link 
              href="/colleges" 
              className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Discover Colleges
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {savedCollegesData.map((college) => {
              const inCompare = compareColleges.includes(college.id);
              const avgRating = college.reviews.length 
                ? (college.reviews.reduce((acc, rev) => acc + rev.rating, 0) / college.reviews.length).toFixed(1)
                : "N/A";

              return (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={college.id} 
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h2 className="text-xl font-bold text-foreground line-clamp-2">
                        {college.name}
                      </h2>
                      <button 
                        onClick={() => toggleSaveCollege(college.id)}
                        className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 transition-colors flex-shrink-0"
                        title="Remove from saved"
                      >
                        <BookmarkMinus size={20} />
                      </button>
                    </div>

                    <div className="space-y-2.5 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-blue-500" />
                        <span className="truncate">{college.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 flex justify-center"><span className="inline-block w-2 h-2 rounded-full bg-purple-500"></span></div>
                        {college.ownership === "Public" ? "Government" : "Private"}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 flex justify-center"><span className="inline-block w-2 h-2 rounded-full bg-green-500"></span></div>
                        Rank #{college.rankings} • {avgRating} ⭐
                      </div>
                      <div className="flex items-center gap-2 font-medium text-foreground">
                        <div className="w-4 flex justify-center"><span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span></div>
                        ₹{college.fees.toLocaleString()}/yr
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 border-t border-border bg-muted/20">
                    <Link 
                      href={`/colleges/${college.id}`}
                      className="py-3.5 text-center text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors border-r border-border"
                    >
                      View Details
                    </Link>
                    <button 
                      onClick={() => !inCompare && addToCompare(college.id)}
                      disabled={inCompare || compareColleges.length >= 3}
                      className="py-3.5 flex items-center justify-center gap-2 text-sm font-medium hover:bg-muted dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {inCompare ? <><Check size={16} className="text-green-500" /> Added</> : <><BarChart2 size={16} /> Compare</>}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
