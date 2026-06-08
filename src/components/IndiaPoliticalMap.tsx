"use client";

import React, { useState, useMemo } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { colleges } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Building, GraduationCap, Banknote, Target, ChevronRight } from "lucide-react";
import Link from "next/link";

const geoUrl = "/data/india.topojson";

// Map GeoJSON names to our strict Data names
const mapStateName = (geoName: string) => {
  if (!geoName) return "";
  if (geoName === "Orissa") return "Odisha";
  if (geoName === "Uttaranchal") return "Uttarakhand";
  if (geoName === "Andaman and Nicobar") return "Andaman and Nicobar Islands";
  if (geoName === "Dadra and Nagar Haveli") return "Dadra and Nagar Haveli and Daman and Diu";
  if (geoName === "Daman and Diu") return "Dadra and Nagar Haveli and Daman and Diu";
  return geoName;
};

interface IndiaPoliticalMapProps {
  filterType: "All" | "Engineering" | "Medical" | "MBA" | "Law" | "Design" | "Government" | "Private";
}

export const IndiaPoliticalMap = ({ filterType }: IndiaPoliticalMapProps) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Compute stats per state
  const stateStats = useMemo(() => {
    const stats: Record<string, { count: number; avgFees: number; avgPlacement: number; topColleges: typeof colleges }> = {};
    
    colleges.forEach(c => {
      // Apply filters
      let matches = true;
      if (filterType !== "All") {
        if (filterType === "Government") matches = c.ownership === "Public";
        else if (filterType === "Private") matches = c.ownership === "Private";
        else matches = c.courses.some(course => {
          if (filterType === "Engineering") return course.toLowerCase().includes("engineering") || course.toLowerCase().includes("technology");
          if (filterType === "Medical") return course.toLowerCase().includes("mbbs") || course.toLowerCase().includes("medical");
          if (filterType === "MBA") return course.toLowerCase().includes("mba") || course.toLowerCase().includes("management");
          if (filterType === "Law") return course.toLowerCase().includes("law") || course.toLowerCase().includes("llb");
          if (filterType === "Design") return course.toLowerCase().includes("design");
          return false;
        });
      }

      if (matches) {
        if (!stats[c.state]) {
          stats[c.state] = { count: 0, avgFees: 0, avgPlacement: 0, topColleges: [] };
        }
        stats[c.state].count++;
        stats[c.state].avgFees += c.fees;
        stats[c.state].avgPlacement += c.placements;
        stats[c.state].topColleges.push(c);
      }
    });

    Object.keys(stats).forEach(state => {
      const s = stats[state];
      s.avgFees = Math.round(s.avgFees / s.count);
      s.avgPlacement = Math.round(s.avgPlacement / s.count);
      // Sort to get top 3 colleges by rating
      s.topColleges = s.topColleges.sort((a, b) => b.rating - a.rating).slice(0, 3);
    });

    return stats;
  }, [filterType]);

  // Max count for scale
  const maxCount = Math.max(...Object.values(stateStats).map(s => s.count), 1);

  // D3 scale for coloring based on college density
  const colorScale = scaleLinear<string>()
    .domain([0, maxCount])
    .range(["#E0E7FF", "#4F46E5"]); // Indigo tailwind colors

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-card rounded-3xl border border-border overflow-hidden">
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [80, 22] // Center of India
        }}
        className="w-full h-[600px] sm:h-[800px]"
      >
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = mapStateName(geo.properties.NAME_1 || geo.properties.st_nm);
                const stats = stateStats[stateName];
                const hasData = stats && stats.count > 0;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => {
                      setTooltipContent(`${stateName} — ${hasData ? stats.count : 0} Colleges`);
                      setTooltipPosition({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseMove={(e) => {
                      setTooltipPosition({ x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      setSelectedState(stateName);
                    }}
                    style={{
                      default: {
                        fill: hasData ? colorScale(stats.count) : "var(--muted)",
                        stroke: "var(--background)",
                        strokeWidth: 0.75,
                        outline: "none",
                        transition: "all 250ms"
                      },
                      hover: {
                        fill: "#8B5CF6", // Accent hover color
                        stroke: "#fff",
                        strokeWidth: 2,
                        outline: "none",
                        cursor: "pointer",
                        transition: "all 250ms"
                      },
                      pressed: {
                        fill: "#6D28D9",
                        outline: "none",
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Floating Tooltip */}
      {tooltipContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed pointer-events-none z-50 bg-foreground text-background px-4 py-2 rounded-xl text-sm font-semibold shadow-xl"
          style={{ top: tooltipPosition.y - 40, left: tooltipPosition.x + 10 }}
        >
          {tooltipContent}
        </motion.div>
      )}

      {/* Side Drawer for State Details */}
      <AnimatePresence>
        {selectedState && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 w-full sm:w-[400px] h-full bg-background/80 backdrop-blur-xl border-l border-border shadow-2xl z-40 flex flex-col"
          >
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{selectedState}</h3>
                <p className="text-muted-foreground text-sm">
                  {stateStats[selectedState]?.count || 0} Colleges Found
                </p>
              </div>
              <button className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground" onClick={() => setSelectedState(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {stateStats[selectedState] && stateStats[selectedState].count > 0 ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card p-4 rounded-2xl border border-border">
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Banknote className="h-4 w-4 mr-2 text-primary" />
                        <span className="text-xs font-semibold">Avg. Fees</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">
                        {formatCurrency(stateStats[selectedState].avgFees)}
                      </p>
                    </div>
                    <div className="bg-card p-4 rounded-2xl border border-border">
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Target className="h-4 w-4 mr-2 text-accent" />
                        <span className="text-xs font-semibold">Avg. Placement</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">
                        {formatCurrency(stateStats[selectedState].avgPlacement)}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Top Institutions</h4>
                    <div className="space-y-3">
                      {stateStats[selectedState].topColleges.map((c, i) => (
                        <Link key={c.id} href={`/colleges/${c.slug}`}>
                          <div className="flex items-center p-3 rounded-xl hover:bg-muted/50 border border-transparent hover:border-border transition-all cursor-pointer group">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4 shrink-0">
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-foreground line-clamp-1">{c.name}</p>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <GraduationCap className="h-3 w-3 mr-1" />
                                {c.ownership} • ★ {c.rating}
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <Building className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <p className="text-muted-foreground font-medium">No colleges found matching the current filters in {selectedState}.</p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border bg-card">
              <Link 
                className="w-full flex items-center justify-center bg-primary text-primary-foreground font-semibold py-3 rounded-full hover:bg-primary/90 transition-colors shadow-md"
                href={`/states/${encodeURIComponent(selectedState)}`}
              >
                  Explore {selectedState}
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
