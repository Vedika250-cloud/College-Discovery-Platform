"use client";

import { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { colleges } from "@/lib/data";
import { calculateFitScore } from "@/lib/utils";
import Link from "next/link";
import {
  Heart, Search, BarChart2, Clock, User, Scale, 
  Zap, Bookmark, ChevronRight, X, GraduationCap, Sparkles, Target, LayoutGrid, Map, Code, Building2, ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function Dashboard() {
  const { profile, savedColleges, compareColleges, toggleSaveCollege, removeFromCompare, applications, setAICounselorOpen } = useAppStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const getProfileCompletion = () => {
    if (!profile) return { percentage: 0, missing: ["All details missing"] };
    const requiredFields = [
      { key: profile.name, label: "Name" },
      { key: profile.class12Percentage, label: "Academics" },
      { key: profile.exams?.jeeMainPercentile || profile.exams?.bitsatScore || profile.exams?.cuetScore, label: "Entrance Exams" },
      { key: profile.preferences?.hostelRequired, label: "Hostel Preference" },
      { key: profile.preferences?.budget, label: "Budget Preference" },
      { key: profile.preferences?.coursePreference, label: "Course Preference" }
    ];
    const filled = requiredFields.filter(f => f.key && f.key.trim() !== "");
    const missing = requiredFields.filter(f => !f.key || f.key.trim() === "").map(f => f.label);
    const percentage = Math.round((filled.length / requiredFields.length) * 100);
    return { percentage, missing };
  };
  const { percentage } = getProfileCompletion();

  const recommended = colleges
    .map(c => ({ college: c, fit: calculateFitScore(profile, c) }))
    .sort((a, b) => b.fit.score - a.fit.score)
    .slice(0, 5); // Take top 5 for horizontal scroll

  const savedList = colleges.filter(c => savedColleges.includes(c.id));
  const compareList = colleges.filter(c => compareColleges.includes(c.id));
  
  // Create mock recent activity based on state
  const recentActivity = [
    ...(savedList.length > 0 ? [{ id: 1, type: 'save', text: `You saved ${savedList[0].name}`, time: 'Recently' }] : []),
    ...(compareList.length > 0 ? [{ id: 2, type: 'compare', text: `Added ${compareList[0].name} to compare queue`, time: 'Recently' }] : []),
    { id: 3, type: 'profile', text: `Profile is ${percentage}% complete`, time: 'Ongoing' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 w-full">
        
        {/* Welcome Banner & Profile Strength */}
        <section className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-gradient-to-br from-primary to-indigo-700 text-primary-foreground rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 z-10">Welcome back, {profile?.name?.split(' ')[0] || "Student"}!</h1>
            <p className="opacity-90 z-10 max-w-lg text-lg">Your personalized dashboard to explore and track your college journey.</p>
          </div>
          
          <div className="w-full lg:w-96 bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-center">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2"><Zap className="text-yellow-500" size={18} /> Profile Strength</h3>
              <span className="text-xl font-bold text-primary">{percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5 mb-3 overflow-hidden">
              <div className="bg-primary h-2.5 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
            </div>
            {percentage < 100 ? (
               <Link href="/profile" className="text-sm font-medium text-primary hover:underline self-end">Complete Profile &rarr;</Link>
            ) : (
               <p className="text-sm text-green-600 dark:text-green-500 font-medium self-end">Profile Complete!</p>
            )}
          </div>
        </section>

        {/* Quick Actions Row */}
        <section className="flex flex-wrap gap-4">
          <Link href="/colleges" className="flex-1 min-w-[150px] bg-card hover:bg-muted border border-border rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors text-center group">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full group-hover:scale-110 transition-transform"><Search size={20}/></div>
            <span className="font-semibold text-sm">Find Colleges</span>
          </Link>
          <Link href="/predictor" className="flex-1 min-w-[150px] bg-card hover:bg-muted border border-border rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors text-center group">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-500 rounded-full group-hover:scale-110 transition-transform"><Target size={20}/></div>
            <span className="font-semibold text-sm">Check Eligibility</span>
          </Link>
          <Link href="/compare" className="flex-1 min-w-[150px] bg-card hover:bg-muted border border-border rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors text-center group">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-500 rounded-full group-hover:scale-110 transition-transform"><Scale size={20}/></div>
            <span className="font-semibold text-sm">Compare Colleges</span>
          </Link>
          <Link href="/scholarships" className="flex-1 min-w-[150px] bg-card hover:bg-muted border border-border rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors text-center group">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/30 text-orange-500 rounded-full group-hover:scale-110 transition-transform"><GraduationCap size={20}/></div>
            <span className="font-semibold text-sm">Scholarships</span>
          </Link>
          <Link href="/applications" className="flex-1 min-w-[150px] bg-card hover:bg-muted border border-border rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors text-center group">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-full group-hover:scale-110 transition-transform"><LayoutGrid size={20}/></div>
            <span className="font-semibold text-sm">Track Apps</span>
          </Link>
          <button onClick={() => setAICounselorOpen(true)} className="flex-1 min-w-[150px] bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl p-4 flex flex-col items-center justify-center gap-2 transition-colors text-center group shadow-md shadow-primary/20">
            <div className="p-3 bg-white/20 rounded-full group-hover:scale-110 transition-transform"><Sparkles size={20}/></div>
            <span className="font-semibold text-sm">AI Counselor</span>
          </button>
        </section>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Saved Colleges</p>
            <span className="text-3xl font-bold text-foreground">{savedColleges.length}</span>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Compared</p>
            <span className="text-3xl font-bold text-foreground">{compareColleges.length}</span>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Recommendations</p>
            <span className="text-3xl font-bold text-foreground">{recommended.length}+</span>
          </div>
          <div className="bg-card border border-border p-5 rounded-2xl flex flex-col gap-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Scholarships</p>
            <span className="text-3xl font-bold text-foreground">12</span>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Recommended Colleges (Horizontal Cards) */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <BarChart2 className="text-primary" size={24} /> Recommended Colleges
                </h2>
                <Link href="/colleges" className="text-sm font-medium text-primary hover:underline">View all</Link>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                {recommended.map(({ college, fit }) => (
                  <div key={college.id} className="min-w-[280px] sm:min-w-[320px] bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col group snap-start shrink-0">
                    <div className="h-32 bg-muted relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={college.gallery[0] || '/placeholder.jpg'} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm text-primary font-bold text-xs px-2.5 py-1 rounded-lg">
                        {fit.score}% Fit
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">{college.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 truncate">{college.location}</p>
                      
                      <div className="mt-auto flex gap-2">
                        <Link href={`/colleges/${college.id}`} className="flex-1 text-center bg-primary/10 text-primary py-2 rounded-xl text-sm font-medium hover:bg-primary/20 transition-colors">Details</Link>
                        <button 
                          onClick={() => toggleSaveCollege(college.id)} 
                          className={`p-2 rounded-xl border transition-colors ${savedColleges.includes(college.id) ? "bg-red-50 border-red-200 text-red-500 dark:bg-red-900/30 dark:border-red-900/50" : "bg-background border-border text-muted-foreground hover:text-red-500 hover:border-red-200"}`}
                        >
                          <Heart size={18} className={savedColleges.includes(college.id) ? "fill-current" : ""} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Application Tracker Widget */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <LayoutGrid className="text-primary" size={24} /> Application Tracker
                </h2>
                <Link href="/applications" className="text-sm font-medium text-primary hover:underline">Manage all</Link>
              </div>

              {applications.length === 0 ? (
                <div className="bg-card border border-border border-dashed rounded-2xl p-8 text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-3"><LayoutGrid size={24} /></div>
                  <h3 className="font-semibold text-foreground mb-1">No Active Applications</h3>
                  <p className="text-sm text-muted-foreground mb-4">Keep track of your college applications, deadlines, and statuses.</p>
                  <Link href="/applications" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">Start Tracking</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {applications.slice(0, 4).map(app => {
                    const col = colleges.find(c => c.id === app.collegeId);
                    if (!col) return null;
                    return (
                      <Link href="/applications" key={app.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={col.gallery[0] || '/placeholder.jpg'} alt={col.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">{col.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{app.status}</span>
                              {app.deadline && <span className="text-xs text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1"><Clock size={10} /> {app.deadline}</span>}
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" size={20} />
                      </Link>
                    )
                  })}
                </div>
              )}
            </section>

            {/* Saved Colleges (Horizontal Cards) */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Bookmark className="text-primary" size={24} /> Saved Colleges
                </h2>
                <Link href="/saved-colleges" className="text-sm font-medium text-primary hover:underline">See all</Link>
              </div>
              
              {savedList.length === 0 ? (
                <div className="bg-card border border-border border-dashed rounded-2xl p-8 text-center text-muted-foreground">
                  No saved colleges yet. Discover and save colleges you like!
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                  {savedList.map((college) => (
                    <div key={college.id} className="min-w-[280px] sm:min-w-[320px] bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col group snap-start shrink-0">
                      <div className="h-32 bg-muted relative overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={college.gallery[0] || '/placeholder.jpg'} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">{college.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 truncate">{college.location}</p>
                        
                        <div className="mt-auto flex gap-2">
                          <Link href={`/colleges/${college.id}`} className="flex-1 text-center bg-primary text-primary-foreground py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">Details</Link>
                          <button 
                            onClick={() => toggleSaveCollege(college.id)} 
                            className="p-2 rounded-xl border bg-red-50 border-red-200 text-red-500 dark:bg-red-900/30 dark:border-red-900/50 transition-colors"
                          >
                            <Heart size={18} className="fill-current" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Compare Queue */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Scale className="text-primary" size={24} /> Compare Queue
                </h2>
                {compareColleges.length > 0 && (
                  <Link href="/compare" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                    Compare Now
                  </Link>
                )}
              </div>
              
              {compareColleges.length === 0 ? (
                <div className="bg-card border border-border border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground mb-3">
                    <Scale size={24} />
                  </div>
                  <h3 className="font-semibold text-foreground">Queue is empty</h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-sm">Add up to 3 colleges to compare them side-by-side.</p>
                </div>
              ) : (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <ul className="divide-y divide-border">
                    {compareList.map(college => (
                      <li key={college.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-muted overflow-hidden shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={college.gallery[0] || '/placeholder.jpg'} alt={college.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <Link href={`/colleges/${college.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">{college.name}</Link>
                            <p className="text-xs text-muted-foreground">{college.location}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCompare(college.id)}
                          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          title="Remove from queue"
                        >
                          <X size={18} />
                        </button>
                      </li>
                    ))}
                    {compareColleges.length < 3 && (
                      <li className="p-4 text-center">
                        <Link href="/colleges" className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2 hover:text-primary transition-colors">
                          <div className="w-8 h-8 rounded-full border-2 border-dashed border-border flex items-center justify-center">
                            <span className="text-lg">+</span>
                          </div>
                          Add {3 - compareColleges.length} more college{3 - compareColleges.length > 1 ? 's' : ''}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </section>
            
          </div>

          {/* Sidebar Area (Right 1 col) */}
          <div className="lg:col-span-1 space-y-8">

            {/* Explore India Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl flex items-center gap-2 text-indigo-900 dark:text-indigo-100">
                  <Map className="text-primary" size={24} /> Explore India
                </h3>
              </div>
              <p className="text-sm text-indigo-800/70 dark:text-indigo-200/70 mb-5">
                Discover colleges across 28 states and 8 union territories using our interactive political map.
              </p>
              
              <div className="space-y-3 mb-6">
                <Link href="/india-map" className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 transition-colors border border-indigo-100 dark:border-indigo-900/30 group">
                  <span className="font-medium text-sm flex items-center gap-2"><Map size={16} className="text-primary"/> Full Interactive Map</span>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <Link href="/states/Maharashtra" className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 transition-colors border border-indigo-100 dark:border-indigo-900/30 group">
                  <span className="font-medium text-sm flex items-center gap-2"><Code size={16} className="text-blue-500"/> Top Tech States</span>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <Link href="/states/Karnataka" className="flex items-center justify-between p-3 rounded-xl bg-white/60 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 transition-colors border border-indigo-100 dark:border-indigo-900/30 group">
                  <span className="font-medium text-sm flex items-center gap-2"><Building2 size={16} className="text-purple-500"/> Top MBA States</span>
                  <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </div>

              <Link href="/india-map" className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-primary/90 transition-colors">
                Open Map <ArrowRight size={16} />
              </Link>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm sticky top-28">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Clock className="text-primary" size={24} /> Recent Activity
              </h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 group">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-card bg-muted text-muted-foreground shrink-0 shadow-sm z-10 mt-0.5 group-hover:scale-110 transition-transform">
                      {activity.type === 'save' && <Heart size={16} className="text-red-500 fill-red-500/20" />}
                      {activity.type === 'compare' && <Scale size={16} className="text-purple-500" />}
                      {activity.type === 'profile' && <User size={16} className="text-blue-500" />}
                    </div>
                    <div className="flex-1 p-3 rounded-2xl bg-muted/40 border border-border shadow-sm group-hover:border-primary/30 transition-colors">
                      <div className="text-xs text-muted-foreground mb-1 font-medium">{activity.time}</div>
                      <div className="text-sm font-medium text-foreground leading-snug">{activity.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </main>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
