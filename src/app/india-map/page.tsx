"use client";

import { useState } from "react";
import { IndiaPoliticalMap } from "@/components/IndiaPoliticalMap";
import { Navbar } from "@/components/Navbar";
import { Map, GraduationCap, Code, HeartPulse, Scale, PenTool, Building2, Landmark } from "lucide-react";

type FilterType = "All" | "Engineering" | "Medical" | "MBA" | "Law" | "Design" | "Government" | "Private";

const FILTERS: { label: FilterType; icon: React.ElementType }[] = [
  { label: "All", icon: Map },
  { label: "Engineering", icon: Code },
  { label: "Medical", icon: HeartPulse },
  { label: "MBA", icon: Building2 },
  { label: "Law", icon: Scale },
  { label: "Design", icon: PenTool },
  { label: "Government", icon: Landmark },
  { label: "Private", icon: GraduationCap },
];

export default function IndiaMapPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
            Explore <span className="text-primary">India</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover thousands of prestigious colleges across all 28 states and 8 union territories.
            Filter by discipline or ownership and click on a state to dive deeper.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {FILTERS.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveFilter(f.label)}
              className={`flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === f.label
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-card text-muted-foreground border border-border hover:bg-muted hover:text-foreground"
              }`}
            >
              <f.icon className="w-4 h-4 mr-2" />
              {f.label}
            </button>
          ))}
        </div>

        {/* Map Container */}
        <div className="w-full relative rounded-3xl shadow-2xl ring-1 ring-border/50 bg-card overflow-hidden">
          {/* Subtle gradient overlay to make it look premium */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/5 to-accent/5 z-0" />
          
          <IndiaPoliticalMap filterType={activeFilter} />
        </div>
      </main>
    </div>
  );
}
