"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { IndiaGridMap } from "@/components/IndiaGridMap";
import { colleges } from "@/lib/data";
import { Map as MapIcon, Navigation, Building2, MapPin, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ExplorePage() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const stateColleges = useMemo(() => {
    if (!selectedState) return [];
    return colleges.filter(c => c.state === selectedState);
  }, [selectedState]);

  // Sort by ranking/placements for "Top Colleges"
  const topColleges = useMemo(() => {
    return [...stateColleges].sort((a, b) => a.rankings - b.rankings).slice(0, 3);
  }, [stateColleges]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="bg-primary/5 border-b border-border py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-6">
            <MapIcon size={28} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Explore India</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover top colleges across different states. Use the interactive map below to explore regional opportunities.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full flex flex-col xl:flex-row gap-8">
        
        {/* Map Section */}
        <div className="flex-1 bg-card border border-border rounded-3xl p-6 lg:p-10 shadow-sm flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-8 text-center flex items-center gap-2">
            <Navigation className="text-primary" size={24} /> Select a Region
          </h2>
          <IndiaGridMap 
            selectedState={selectedState} 
            onStateSelect={setSelectedState} 
          />
        </div>

        {/* State Details Panel */}
        <div className="w-full xl:w-[400px] shrink-0">
          <AnimatePresence mode="wait">
            {!selectedState ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full bg-card border border-border border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center text-muted-foreground"
              >
                <MapPin size={48} className="mb-4 opacity-20" />
                <h3 className="text-xl font-bold text-foreground mb-2">No State Selected</h3>
                <p>Click on any state in the grid map to view its top colleges and statistics.</p>
              </motion.div>
            ) : (
              <motion.div 
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col"
              >
                <div className="bg-primary p-8 text-primary-foreground relative overflow-hidden">
                  <MapPin size={120} className="absolute -right-10 -bottom-10 opacity-10" />
                  <h2 className="text-3xl font-bold mb-2 relative z-10">{selectedState}</h2>
                  <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm font-medium relative z-10">
                    <Building2 size={16} /> {stateColleges.length} Colleges Available
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {stateColleges.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground py-10">
                      <Building2 size={32} className="mb-3 opacity-20" />
                      <p>No colleges listed in our database for this state yet.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                          <TrendingUp size={20} className="text-primary" /> Top Colleges
                        </h3>
                      </div>
                      
                      <div className="space-y-4 mb-8">
                        {topColleges.map((college, idx) => (
                          <Link 
                            key={college.id} 
                            href={`/colleges/${college.id}`}
                            className="block p-4 border border-border rounded-2xl hover:border-primary/50 hover:bg-muted/50 transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                                #{idx + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                                  {college.name}
                                </h4>
                                <p className="text-xs text-muted-foreground truncate">{college.location}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <Link 
                          href={`/colleges?state=${encodeURIComponent(selectedState)}`}
                          className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                        >
                          View All in {selectedState} <ArrowRight size={18} />
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
