"use client";

import { useState, useMemo, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { scholarships } from "@/lib/data";
import { calculateScholarshipMatch } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Search, GraduationCap, Building, Banknote, Calendar, ArrowRight, Filter, Target, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ScholarshipsPage() {
  const { profile } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filters
  const [filters, setFilters] = useState({
    meritBased: false,
    needBased: false,
    government: false,
    private: false,
    matchedOnly: true // Default to true if profile exists
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!profile) {
      setFilters(prev => ({ ...prev, matchedOnly: false }));
    }
  }, [profile]);

  const filteredScholarships = useMemo(() => {
    let result = scholarships;

    // 1. Search Term
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(lower) || s.description.toLowerCase().includes(lower));
    }

    // 2. Type Filter (Merit/Need)
    if (filters.meritBased || filters.needBased) {
      result = result.filter(s => {
        if (filters.meritBased && (s.type === "Merit based" || s.type === "Both")) return true;
        if (filters.needBased && (s.type === "Need based" || s.type === "Both")) return true;
        return false;
      });
    }

    // 3. Provider Filter (Gov/Private)
    if (filters.government || filters.private) {
      result = result.filter(s => {
        if (filters.government && s.provider === "Government") return true;
        if (filters.private && s.provider === "Private") return true;
        return false;
      });
    }

    // 4. Matched Only
    if (filters.matchedOnly && profile) {
      result = result.filter(s => calculateScholarshipMatch(profile, s).isEligible);
    }

    return result;
  }, [searchTerm, filters, profile]);

  const handleFilterToggle = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="bg-primary/5 border-b border-border py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-primary font-medium mb-4">
              <GraduationCap size={24} /> Scholarship Finder
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Fund Your Education</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover and apply for scholarships matching your academic profile, financial needs, and career goals.
            </p>
          </div>

          <div className="w-full md:w-auto flex-shrink-0">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input 
                type="text" 
                placeholder="Search scholarships..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:ring-2 focus:ring-primary shadow-sm outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full flex flex-col lg:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-card border border-border rounded-3xl p-6 sticky top-28 shadow-sm">
            <div className="flex items-center gap-2 font-bold text-lg mb-6">
              <Filter size={20} className="text-primary" /> Filters
            </div>

            {mounted && profile && (
              <div className="mb-6 pb-6 border-b border-border">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-2">
                    <Target size={18} className={filters.matchedOnly ? "text-primary" : "text-muted-foreground"} />
                    <span className="font-semibold group-hover:text-primary transition-colors">Matched For You</span>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors relative ${filters.matchedOnly ? 'bg-primary' : 'bg-muted border border-border'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${filters.matchedOnly ? 'left-6' : 'left-1'}`} />
                  </div>
                </label>
                <p className="text-xs text-muted-foreground mt-2 ml-7">Only show scholarships you are eligible for.</p>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Type</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={filters.meritBased} onChange={() => handleFilterToggle('meritBased')} className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                    <span>Merit based</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={filters.needBased} onChange={() => handleFilterToggle('needBased')} className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                    <span>Need based</span>
                  </label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Provider</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={filters.government} onChange={() => handleFilterToggle('government')} className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                    <span>Government</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" checked={filters.private} onChange={() => handleFilterToggle('private')} className="w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                    <span>Private</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Results ({filteredScholarships.length})</h2>
          </div>

          {filteredScholarships.length === 0 ? (
            <div className="bg-card border border-border border-dashed rounded-3xl p-12 text-center text-muted-foreground">
              <GraduationCap size={48} className="mx-auto mb-4 opacity-20" />
              <h3 className="text-xl font-bold text-foreground mb-2">No scholarships found</h3>
              <p>Try adjusting your filters or disabling the &quot;Matched For You&quot; toggle.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {filteredScholarships.map(scholarship => {
                
                const matchInfo = mounted && profile ? calculateScholarshipMatch(profile, scholarship) : null;

                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={scholarship.id} 
                    className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full relative overflow-hidden"
                  >
                    {/* Top tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${scholarship.type.includes('Merit') ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30' : scholarship.type.includes('Need') ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/30' : 'bg-purple-50 text-purple-600 dark:bg-purple-900/30'}`}>
                        {scholarship.type}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-muted text-muted-foreground flex items-center gap-1">
                        <Building size={12} /> {scholarship.provider}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{scholarship.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-1">{scholarship.description}</p>

                    <div className="space-y-3 mb-6 bg-muted/30 p-4 rounded-2xl border border-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg"><Banknote size={16} /></div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Amount</p>
                          <p className="font-bold text-sm">{scholarship.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-lg"><Calendar size={16} /></div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase">Deadline</p>
                          <p className="font-bold text-sm">{scholarship.deadline}</p>
                        </div>
                      </div>
                    </div>

                    {/* Match Context if applicable */}
                    {matchInfo && (
                      <div className="mb-6">
                        <div className={`flex items-start gap-2 text-sm p-3 rounded-xl border ${matchInfo.isEligible ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/10 dark:border-green-900/50 dark:text-green-400' : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/10 dark:border-red-900/50 dark:text-red-400'}`}>
                          {matchInfo.isEligible ? <CheckCircle2 size={18} className="shrink-0 mt-0.5" /> : <XCircle size={18} className="shrink-0 mt-0.5" />}
                          <div className="space-y-1">
                            <p className="font-bold">{matchInfo.isEligible ? 'You are eligible!' : 'Not eligible based on profile'}</p>
                            <ul className="list-disc pl-4 text-xs opacity-80 space-y-0.5">
                              {matchInfo.reasons.map((r, i) => <li key={i}>{r}</li>)}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-auto">
                      <a 
                        href={scholarship.applyLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-foreground hover:bg-foreground/90 text-background rounded-xl font-medium transition-colors"
                      >
                        Apply Now <ArrowRight size={16} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
