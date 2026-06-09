"use client";

import { Navbar } from "@/components/Navbar";
import { useAppStore } from "@/lib/store";
import { colleges } from "@/lib/data";
import Link from "next/link";
import { calculateFitScore } from "@/lib/utils";
import { Heart, Search, BarChart2, Check, SlidersHorizontal, MapPin, X } from "lucide-react";
import { Suspense, useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

function CollegesContent() {
  const { savedColleges, toggleSaveCollege, compareColleges, addToCompare, profile } = useAppStore();
  const searchParams = useSearchParams();
  const showSavedOnly = searchParams.get("saved") === "true";

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOwnership, setFilterOwnership] = useState("Both");
  const [filterState, setFilterState] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterFees, setFilterFees] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterPlacement, setFilterPlacement] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const stateParam = searchParams.get("state");
    if (stateParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilterState(stateParam);
    }
  }, [searchParams]);

  // Extract unique options for dropdowns
  const uniqueStates = useMemo(() => {
    const states = colleges.map(c => c.state || "").filter(Boolean);
    return Array.from(new Set(states)).sort();
  }, []);

  const uniqueCities = useMemo(() => {
    const cities = colleges.map(c => c.city || "").filter(Boolean);
    return Array.from(new Set(cities)).sort();
  }, []);

  const uniqueCourses = useMemo(() => {
    const allCourses = colleges.flatMap(c => c.courses);
    return Array.from(new Set(allCourses)).sort();
  }, []);

  const filteredColleges = useMemo(() => {
    return colleges.filter(college => {
      // Saved filter
      if (showSavedOnly && !savedColleges.includes(college.id)) return false;
      
      // Search term filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        if (!college.name.toLowerCase().includes(term) && !college.location.toLowerCase().includes(term)) {
          return false;
        }
      }

      // Ownership filter ("Both", "Government", "Private")
      if (filterOwnership === "Government" && college.ownership !== "Public") return false;
      if (filterOwnership === "Private" && college.ownership !== "Private") return false;

      // State filter
      if (filterState) {
        if (college.state !== filterState) return false;
      }

      // Course filter
      if (filterCourse && !college.courses.includes(filterCourse)) return false;

      // Fees filter
      if (filterFees) {
        if (filterFees === "<1L" && college.fees >= 100000) return false;
        if (filterFees === "1L-2L" && (college.fees < 100000 || college.fees >= 200000)) return false;
        if (filterFees === ">2L" && college.fees < 200000) return false;
      }

      // Rating filter
      if (filterRating) {
        const avgRating = college.reviews.length 
          ? college.reviews.reduce((acc, rev) => acc + rev.rating, 0) / college.reviews.length 
          : 0;
        const minRating = Number(filterRating);
        if (avgRating < minRating) return false;
      }

      // City filter
      if (filterCity) {
        if (college.city !== filterCity) return false;
      }

      // Placement filter
      if (filterPlacement) {
        if (filterPlacement === ">5LPA" && college.placements < 500000) return false;
        if (filterPlacement === ">10LPA" && college.placements < 1000000) return false;
        if (filterPlacement === ">15LPA" && college.placements < 1500000) return false;
      }

      return true;
    });
  }, [showSavedOnly, searchTerm, filterOwnership, filterState, filterCourse, filterFees, filterRating, filterCity, filterPlacement, savedColleges]);

  const clearFilters = () => {
    setFilterOwnership("Both");
    setFilterState("");
    setFilterCourse("");
    setFilterFees("");
    setFilterRating("");
    setFilterCity("");
    setFilterPlacement("");
    setSearchTerm("");
  };

  const activeFiltersCount = [filterOwnership !== "Both", filterState, filterCourse, filterFees, filterRating, filterCity, filterPlacement].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {showSavedOnly ? "Saved Colleges" : "Discover Colleges"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {filteredColleges.length} {filteredColleges.length === 1 ? 'college' : 'colleges'} found
            </p>
          </div>
          
          {/* Main Search Bar */}
          <div className="flex w-full md:w-auto gap-2">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Search colleges, cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all ${showFilters || activeFiltersCount > 0 ? 'bg-primary text-primary-foreground border-primary shadow-md' : 'bg-card border-border hover:bg-muted text-foreground'}`}
            >
              <SlidersHorizontal size={18} />
              <span className="hidden sm:inline font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-background text-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Expandable Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-card border border-border p-5 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg flex items-center gap-2"><SlidersHorizontal size={18} className="text-primary"/> Advanced Filters</h3>
                  {activeFiltersCount > 0 && (
                    <button onClick={clearFilters} className="text-sm text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors">
                      <X size={14} /> Clear All
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">State</label>
                    <select
                      value={filterState}
                      onChange={(e) => setFilterState(e.target.value)}
                      className="w-full p-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">All States</option>
                      {uniqueStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ownership</label>
                    <select
                      value={filterOwnership}
                      onChange={(e) => setFilterOwnership(e.target.value)}
                      className="w-full p-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="Both">Both (Default)</option>
                      <option value="Government">Government</option>
                      <option value="Private">Private</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Course</label>
                    <select
                      value={filterCourse}
                      onChange={(e) => setFilterCourse(e.target.value)}
                      className="w-full p-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">All Courses</option>
                      {uniqueCourses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fees Range</label>
                    <select
                      value={filterFees}
                      onChange={(e) => setFilterFees(e.target.value)}
                      className="w-full p-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Any Fees</option>
                      <option value="<1L">Below 1 Lakh</option>
                      <option value="1L-2L">1 Lakh - 2 Lakhs</option>
                      <option value=">2L">Above 2 Lakhs</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Min Rating</label>
                    <select
                      value={filterRating}
                      onChange={(e) => setFilterRating(e.target.value)}
                      className="w-full p-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Any Rating</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="2">2+ Stars</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">City</label>
                    <select
                      value={filterCity}
                      onChange={(e) => setFilterCity(e.target.value)}
                      className="w-full p-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">All Cities</option>
                      {uniqueCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Placement</label>
                    <select
                      value={filterPlacement}
                      onChange={(e) => setFilterPlacement(e.target.value)}
                      className="w-full p-2.5 border border-border rounded-xl bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="">Any Average</option>
                      <option value=">5LPA">&gt; 5 LPA</option>
                      <option value=">10LPA">&gt; 10 LPA</option>
                      <option value=">15LPA">&gt; 15 LPA</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredColleges.map((college) => {
            const isSaved = savedColleges.includes(college.id);
            const inCompare = compareColleges.includes(college.id);
            const fit = profile ? calculateFitScore(profile, college) : null;
            const avgRating = college.reviews.length 
              ? (college.reviews.reduce((acc, rev) => acc + rev.rating, 0) / college.reviews.length).toFixed(1)
              : "N/A";

            return (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={college.id} 
                className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
              >
                <div className="p-6 flex-1 relative">
                  <button 
                    onClick={() => toggleSaveCollege(college.id)}
                    className={`absolute top-4 right-4 p-2.5 rounded-full flex-shrink-0 transition-all z-10 shadow-sm backdrop-blur-sm ${isSaved ? "bg-red-50 text-red-500 dark:bg-red-900/30" : "bg-background/80 border border-border text-muted-foreground hover:text-red-500 hover:bg-background"}`}
                  >
                    <Heart size={20} className={isSaved ? "fill-current" : ""} />
                  </button>

                  <div className="pr-12 mb-4">
                    <h2 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/colleges/${college.id}`}>{college.name}</Link>
                    </h2>
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

                  {fit && (
                    <div className="bg-background rounded-xl p-3.5 border border-border">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Fit Score</span>
                        <span className={`text-sm font-bold ${fit.score > 70 ? 'text-green-500' : fit.score > 40 ? 'text-yellow-500' : 'text-red-500'}`}>
                          {fit.level} ({fit.score}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted/80 rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full transition-all duration-1000" style={{ width: `${fit.score}%`, backgroundColor: fit.score > 70 ? '#22c55e' : fit.score > 40 ? '#eab308' : '#ef4444' }}></div>
                      </div>
                    </div>
                  )}
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

        {filteredColleges.length === 0 && (
          <div className="text-center py-20 bg-card border border-border rounded-2xl shadow-sm mt-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">No colleges found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search term to find what you&apos;re looking for.</p>
            <button onClick={clearFilters} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors">
              Clear All Filters
            </button>
          </div>
        )}
      </main>
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
