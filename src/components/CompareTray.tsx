"use client";

import { useAppStore } from "@/lib/store";
import { colleges } from "@/lib/data";
import { X, Scale, ChevronUp, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CompareTray() {
  const { compareColleges, removeFromCompare, clearCompare } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(true);

  if (compareColleges.length === 0) return null;

  const compareList = compareColleges.map(id => colleges.find(c => c.id === id)).filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 pointer-events-none flex justify-center">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="pointer-events-auto bg-card border border-border shadow-2xl rounded-t-2xl sm:rounded-2xl w-full max-w-4xl overflow-hidden"
      >
        <div 
          className="bg-primary px-4 py-2 flex justify-between items-center cursor-pointer select-none text-primary-foreground"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2 font-medium">
            <Scale size={18} />
            <span>Compare Colleges ({compareColleges.length}/3)</span>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden bg-card"
            >
              <div className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="flex-1 flex flex-wrap gap-4 justify-center sm:justify-start w-full">
                  {compareList.map(college => college && (
                    <div key={college.id} className="relative bg-muted rounded-xl p-3 flex-1 min-w-[200px] border border-border flex justify-between items-center">
                      <span className="font-medium text-sm truncate pr-6">{college.name}</span>
                      <button 
                        onClick={() => removeFromCompare(college.id)} 
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-red-500 rounded-full hover:bg-background transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                    <div key={i} className="bg-background border-2 border-dashed border-border rounded-xl p-3 flex-1 min-w-[200px] flex items-center justify-center text-muted-foreground text-sm font-medium">
                      Add to Compare
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col gap-2 w-full sm:w-auto shrink-0">
                  <Link 
                    href="/compare"
                    className="w-full text-center px-6 py-2 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    Compare Now
                  </Link>
                  <button 
                    onClick={clearCompare}
                    className="w-full text-center px-6 py-2 text-sm font-medium text-muted-foreground hover:text-red-500 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
