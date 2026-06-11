"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { InteractiveIndiaMap, StateStats } from "@/components/InteractiveIndiaMap";
import { colleges } from "@/lib/data";
import { Map as MapIcon, Navigation, Building2, Search, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const stateDataMap = useMemo(() => {
    const data: Record<string, StateStats & { totalRating: number }> = {};
    
    colleges.forEach(c => {
      let stateName = c.state;
      // Merge Ladakh into J&K so the map path correctly shows their combined stats
      if (stateName === "Ladakh") stateName = "Jammu and Kashmir";

      if (!data[stateName]) {
        data[stateName] = { name: stateName, total: 0, gov: 0, pvt: 0, topCollege: c.name, totalRating: 0, avgRating: 0 };
      }
      
      data[stateName].total++;
      if (c.ownership === "Public") {
        data[stateName].gov++;
      } else {
        data[stateName].pvt++;
      }

      data[stateName].totalRating += (c.rating || 0);
      data[stateName].avgRating = Number((data[stateName].totalRating / data[stateName].total).toFixed(1));
      
      // Update top college if current is better ranked (lower number is better)
      const currentTop = colleges.find(tc => tc.name === data[stateName].topCollege);
      if (currentTop && c.rankings < currentTop.rankings) {
        data[stateName].topCollege = c.name;
      }
    });
    
    return data;
  }, []);

  const totalStates = Object.keys(stateDataMap).length;
  const totalColleges = colleges.length;
  const totalGov = colleges.filter(c => c.ownership === "Public").length;
  const totalPvt = colleges.filter(c => c.ownership === "Private").length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="bg-primary/5 border-b border-border py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-6">
            <MapIcon size={28} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">India College Heatmap</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover top institutions geographically. Hover over any state to view statistics, or click to explore its colleges.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full flex flex-col gap-8">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <Navigation className="text-primary mb-3" size={24} />
            <span className="text-3xl font-bold text-foreground">{totalStates}</span>
            <span className="text-sm text-muted-foreground mt-1">States Covered</span>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <Building2 className="text-blue-500 mb-3" size={24} />
            <span className="text-3xl font-bold text-foreground">{totalColleges}</span>
            <span className="text-sm text-muted-foreground mt-1">Total Colleges</span>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <BookOpen className="text-emerald-500 mb-3" size={24} />
            <span className="text-3xl font-bold text-foreground">{totalGov}</span>
            <span className="text-sm text-muted-foreground mt-1">Govt Colleges</span>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
            <GraduationCap className="text-purple-500 mb-3" size={24} />
            <span className="text-3xl font-bold text-foreground">{totalPvt}</span>
            <span className="text-sm text-muted-foreground mt-1">Private Colleges</span>
          </div>
        </div>

        {/* Map Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card border border-border rounded-2xl p-4 shadow-sm">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Highlight a state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground transition-all"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Density:</span>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm border border-border" style={{ backgroundColor: '#1E293B' }} title="0 Colleges"></div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">0</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#4338CA' }} title="1-5 Colleges"></div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">1-5</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#6366F1' }} title="6-10 Colleges"></div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">6-10</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#818CF8' }} title="11-20 Colleges"></div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">11-20</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#A78BFA' }} title="21-30 Colleges"></div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">21-30</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#C084FC' }} title="30+ Colleges"></div>
              <span className="text-[10px] sm:text-xs text-muted-foreground">30+</span>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          <InteractiveIndiaMap 
            data={stateDataMap} 
            highlightedState={searchQuery}
            setHighlightedState={setSearchQuery}
          />
        </motion.div>
        
      </main>
    </div>
  );
}
