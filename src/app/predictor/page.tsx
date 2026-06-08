"use client";

import { useState, useMemo, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { colleges } from "@/lib/data";
import { calculateAdmissionChance } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/ui/BackButton";
import { motion } from "framer-motion";
import { Search, GraduationCap, Target, ChevronDown, CheckCircle2, AlertTriangle, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function PredictorPage() {
  const { profile } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollegeId, setSelectedCollegeId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const filteredColleges = useMemo(() => {
    if (!searchTerm) return [];
    return colleges.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5);
  }, [searchTerm]);

  const selectedCollege = colleges.find(c => c.id === selectedCollegeId);

  const prediction = selectedCollege ? calculateAdmissionChance(profile, selectedCollege) : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        <div className="flex items-center justify-between mb-2">
          <BackButton label="Back to Dashboard" fallbackRoute="/dashboard" />
        </div>

        <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Target size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Admission Chance Predictor</h1>
          <p className="text-muted-foreground text-lg">
            Cross-reference your academic profile against historical cutoffs and college rankings to predict your admission probability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: College Selection & Profile Context */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">1. Select a College</h2>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input 
                  type="text" 
                  placeholder="Search colleges (e.g. IIT Bombay)..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>

              {searchTerm && filteredColleges.length > 0 && !selectedCollege && (
                <div className="mt-2 border border-border rounded-xl overflow-hidden bg-card shadow-lg divide-y divide-border">
                  {filteredColleges.map(c => (
                    <button 
                      key={c.id} 
                      onClick={() => {
                        setSelectedCollegeId(c.id);
                        setSearchTerm("");
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center justify-between"
                    >
                      <span className="font-medium text-sm truncate">{c.name}</span>
                      <ChevronDown size={16} className="-rotate-90 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}
              {searchTerm && filteredColleges.length === 0 && (
                <div className="mt-2 text-sm text-muted-foreground text-center p-4">No colleges found.</div>
              )}

              {selectedCollege && (
                <div className="mt-4 p-4 border border-primary/20 bg-primary/5 rounded-2xl relative">
                  <button 
                    onClick={() => setSelectedCollegeId(null)}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw size={16} />
                  </button>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Target College</p>
                  <h3 className="font-bold text-foreground text-lg leading-tight mb-1">{selectedCollege.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedCollege.location}</p>
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">2. Your Profile Context</h2>
                <Link href="/profile" className="text-sm font-medium text-primary hover:underline">Edit Profile</Link>
              </div>
              {mounted && profile ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl">
                    <span className="text-sm font-medium text-muted-foreground">12th Percentage</span>
                    <span className="font-bold">{profile.class12Percentage || "N/A"}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl">
                    <span className="text-sm font-medium text-muted-foreground">JEE Main Percentile</span>
                    <span className="font-bold">{profile.exams?.jeeMainPercentile || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl">
                    <span className="text-sm font-medium text-muted-foreground">JEE Advanced Rank</span>
                    <span className="font-bold">{profile.exams?.jeeAdvancedRank || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl">
                    <span className="text-sm font-medium text-muted-foreground">BITSAT Score</span>
                    <span className="font-bold">{profile.exams?.bitsatScore || "N/A"}</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-muted/50 rounded-xl text-center text-sm text-muted-foreground">
                  Loading profile data...
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Prediction Results */}
          <div className="lg:col-span-7">
            {prediction && selectedCollege ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-3xl p-8 shadow-sm h-full flex flex-col"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold mb-2">Prediction Results</h2>
                  <p className="text-muted-foreground">Based on historical cutoffs for {selectedCollege.name}</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10 justify-center mb-10 flex-1">
                  
                  {/* Probability Chart Gauge */}
                  <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full" 
                         style={{ 
                           background: `conic-gradient(var(--color-${prediction.category === 'Safe' ? 'green' : prediction.category === 'Moderate' ? 'yellow' : 'red'}-500) ${prediction.chance * 3.6}deg, var(--color-muted) 0deg)`,
                           transition: 'all 1s ease-out'
                         }}
                    ></div>
                    <div className="absolute inset-4 rounded-full bg-card flex flex-col items-center justify-center">
                      <span className="text-5xl sm:text-6xl font-black text-foreground">{prediction.chance}%</span>
                      <span className="text-sm font-medium text-muted-foreground mt-2">Probability</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 w-full md:w-auto">
                    <div className={`p-6 rounded-2xl border-2 flex items-center gap-4
                      ${prediction.category === 'Safe' ? 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-900/50' : 
                        prediction.category === 'Moderate' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/10 dark:border-yellow-900/50' : 
                        'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-900/50'}`}
                    >
                      <div className={`p-3 rounded-xl ${prediction.category === 'Safe' ? 'bg-green-100 text-green-600 dark:bg-green-900/50' : prediction.category === 'Moderate' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50' : 'bg-red-100 text-red-600 dark:bg-red-900/50'}`}>
                        {prediction.category === 'Safe' ? <CheckCircle2 size={24} /> : prediction.category === 'Moderate' ? <AlertTriangle size={24} /> : <AlertCircle size={24} />}
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-wider opacity-80 mb-1">Category</p>
                        <h3 className={`text-2xl font-black ${prediction.category === 'Safe' ? 'text-green-700 dark:text-green-400' : prediction.category === 'Moderate' ? 'text-yellow-700 dark:text-yellow-400' : 'text-red-700 dark:text-red-400'}`}>
                          {prediction.category} Match
                        </h3>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <GraduationCap className="text-primary" /> AI Recommendations
                  </h3>
                  <div className="space-y-3">
                    {prediction.recommendations.map((rec, idx) => (
                      <div key={idx} className="bg-muted/50 border border-border p-4 rounded-xl flex gap-3 text-sm font-medium text-foreground">
                        <span className="text-primary mt-0.5">•</span> {rec}
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="bg-card border border-border border-dashed rounded-3xl p-12 h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Target size={32} className="opacity-50" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">Awaiting Selection</h3>
                <p className="max-w-xs">Select a college from the left panel to generate your personalized admission prediction.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      <style jsx>{`
        :root {
          --color-green-500: #22c55e;
          --color-yellow-500: #eab308;
          --color-red-500: #ef4444;
          --color-muted: hsl(var(--muted));
        }
      `}</style>
    </div>
  );
}
