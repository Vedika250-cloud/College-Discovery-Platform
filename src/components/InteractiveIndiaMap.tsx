"use client";

import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const INDIA_TOPO_JSON = "/data/india.topojson";

export interface StateStats {
  name: string;
  total: number;
  gov: number;
  pvt: number;
  topCollege?: string;
  avgRating: number;
}

interface InteractiveIndiaMapProps {
  data: Record<string, StateStats>;
  highlightedState: string;
  setHighlightedState: (s: string) => void;
}

const mapStateNameToDBState = (geoName: string) => {
  if (geoName === "Andaman and Nicobar") return "Andaman and Nicobar Islands";
  if (geoName === "Jammu and Kashmir") return "Jammu and Kashmir";
  if (geoName.includes("Dadra") || geoName.includes("Daman")) return "Dadra and Nagar Haveli and Daman and Diu";
  return geoName;
};

// Dynamic Color Scale
const getColor = (count: number) => {
  if (count === 0) return "#1E293B";
  if (count <= 5) return "#4338CA";
  if (count <= 10) return "#6366F1";
  if (count <= 20) return "#818CF8";
  if (count <= 30) return "#A78BFA";
  return "#C084FC";
};

export function InteractiveIndiaMap({ data, highlightedState }: InteractiveIndiaMapProps) {
  const router = useRouter();
  const [tooltipContent, setTooltipContent] = useState<StateStats | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipContent(null);
  };

  return (
    <div 
      className="relative w-full h-[600px] sm:h-[700px] md:h-[800px] bg-card/50 rounded-3xl border border-border overflow-hidden flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 1000,
          center: [80, 22] // Center over India
        }}
        className="w-full h-full outline-none"
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const geoName = geo.properties.NAME_1 || geo.properties.st_nm || geo.id;
              const dbName = mapStateNameToDBState(geoName);
              const stateData = data[dbName] || { name: dbName, total: 0, gov: 0, pvt: 0, avgRating: 0 };
              
              const isHighlighted = highlightedState.toLowerCase() === dbName.toLowerCase();
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    if (stateData.total > 0) {
                      router.push(`/colleges?state=${encodeURIComponent(dbName)}`);
                    }
                  }}
                  onMouseEnter={() => {
                    setTooltipContent(stateData);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent(null);
                  }}
                  style={{
                    default: {
                      fill: getColor(stateData.total),
                      stroke: isHighlighted ? "#A5B4FC" : "#334155",
                      strokeWidth: isHighlighted ? 1.5 : 0.5,
                      outline: "none",
                      transition: "all 0.3s ease",
                    },
                    hover: {
                      fill: "#A5B4FC", // Indigo 300
                      stroke: "#E0E7FF",
                      strokeWidth: 1.5,
                      outline: "none",
                      cursor: stateData.total > 0 ? "pointer" : "default",
                      transition: "all 0.3s ease",
                    },
                    pressed: {
                      fill: "#818CF8",
                      stroke: "#E0E7FF",
                      strokeWidth: 2,
                      outline: "none",
                    },
                  }}
                  className={`transition-all duration-300 ${isHighlighted ? 'brightness-125 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]' : ''}`}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {/* Floating Tooltip using Framer Motion */}
      <AnimatePresence>
        {tooltipContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.15 }}
            className="fixed pointer-events-none z-50 bg-background/95 backdrop-blur-sm border border-border shadow-xl rounded-xl p-4 min-w-[200px]"
            style={{
              left: mousePosition.x + 15,
              top: mousePosition.y + 15,
            }}
          >
            <h4 className="font-bold text-lg text-foreground mb-2 border-b border-border pb-1">
              {tooltipContent.name === "Jammu and Kashmir" ? "Jammu & Kashmir & Ladakh" : tooltipContent.name}
            </h4>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-medium text-foreground">{tooltipContent.total} Colleges</span>
              <span className="text-muted-foreground">{tooltipContent.gov} Government</span>
              <span className="text-muted-foreground">{tooltipContent.pvt} Private</span>
              <span className="text-amber-400 font-medium">{tooltipContent.avgRating}/5 Rating</span>
              {tooltipContent.topCollege && tooltipContent.total > 0 && (
                <span className="mt-1 pt-1 border-t border-border font-medium text-primary truncate max-w-[180px]">
                  Top College: {tooltipContent.topCollege}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
