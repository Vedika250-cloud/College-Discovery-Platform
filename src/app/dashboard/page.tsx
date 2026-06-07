"use client";

import { useAppStore } from "@/lib/store";
import { colleges } from "@/lib/data";
import { calculateFitScore } from "@/lib/utils";
import Link from "next/link";
import { Heart, Search, BarChart2, BookOpen, Clock, Settings, User, Bell, Scale } from "lucide-react";

export default function Dashboard() {
  const { profile, savedColleges, compareColleges, notifications, toggleSaveCollege, addToCompare, removeFromCompare } = useAppStore();

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

  const { percentage, missing } = getProfileCompletion();

  const recommended = colleges
    .map(c => ({ college: c, fit: calculateFitScore(profile, c) }))
    .sort((a, b) => b.fit.score - a.fit.score)
    .slice(0, 3);

  const savedList = colleges.filter(c => savedColleges.includes(c.id));
  const compareList = colleges.filter(c => compareColleges.includes(c.id));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Welcome Banner & Profile Completion */}
        <section className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 bg-primary text-primary-foreground rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 z-10">Welcome back, {profile?.name || "Student"}!</h1>
            <p className="opacity-90 z-10 max-w-lg">Your personalized college discovery journey is ready. Based on your profile, we have updated your top matches.</p>
          </div>
          
          <div className="w-full md:w-80 bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground">Profile Completion</h3>
              <span className="text-xl font-bold text-primary">{percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${percentage}%` }}></div>
            </div>
            {missing.length > 0 ? (
              <div className="mt-auto">
                <p className="text-xs text-muted-foreground mb-2">Missing details:</p>
                <ul className="space-y-1">
                  {missing.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2 text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/profile" className="text-xs text-primary font-medium mt-3 inline-block hover:underline">Complete Profile →</Link>
              </div>
            ) : (
              <div className="mt-auto flex items-center gap-2 text-green-500">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span className="text-sm font-medium">Profile is complete!</span>
              </div>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl"><BookOpen size={24}/></div>
            <div>
              <p className="text-sm text-muted-foreground">Total Colleges</p>
              <p className="text-xl font-bold text-foreground">{colleges.length}</p>
            </div>
          </div>
          <div className="bg-card border border-border p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl"><Heart size={24}/></div>
            <div>
              <p className="text-sm text-muted-foreground">Saved</p>
              <p className="text-xl font-bold text-foreground">{savedColleges.length}</p>
            </div>
          </div>
          <div className="bg-card border border-border p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl"><Scale size={24}/></div>
            <div>
              <p className="text-sm text-muted-foreground">Compare Queue</p>
              <p className="text-xl font-bold text-foreground">{compareColleges.length}/3</p>
            </div>
          </div>
          <div className="bg-card border border-border p-4 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl"><Bell size={24}/></div>
            <div>
              <p className="text-sm text-muted-foreground">Notifications</p>
              <p className="text-xl font-bold text-foreground">{notifications.filter(n => !n.read).length} new</p>
            </div>
          </div>
        </section>

        {/* Recommended Colleges */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BarChart2 className="text-primary" /> Recommended For You
            </h2>
            <Link href="/colleges" className="text-sm font-medium text-primary hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommended.map(({ college, fit }) => (
              <div key={college.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col group">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`px-3 py-1 text-xs font-bold rounded-full ${fit.eligibility === 'Safe' ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : fit.eligibility === 'Moderate' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                      {fit.eligibility} Admission
                    </div>
                    <span className="text-sm font-bold text-primary">{fit.score}% Match</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{college.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{college.location}</p>
                </div>
                <div className="px-6 py-4 border-t border-border bg-muted/50 grid grid-cols-2">
                  <Link href={`/colleges/${college.id}`} className="text-sm font-medium hover:text-primary transition-colors">View Details</Link>
                  <button onClick={() => toggleSaveCollege(college.id)} className="text-sm font-medium text-right hover:text-red-500 transition-colors">
                    {savedColleges.includes(college.id) ? "Saved ♥" : "Save"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Saved Colleges Slider */}
        {savedList.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Heart className="text-red-500" /> Saved Colleges
              </h2>
              <Link href="/saved" className="text-sm font-medium text-primary hover:underline">Manage all</Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
              {savedList.map(college => (
                <div key={college.id} className="min-w-[300px] w-[300px] bg-card border border-border rounded-2xl p-5 snap-start">
                  <h3 className="font-bold text-foreground mb-1 truncate">{college.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{college.location}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <Link href={`/colleges/${college.id}`} className="text-xs font-medium bg-muted px-3 py-1.5 rounded-lg hover:bg-border transition-colors">Details</Link>
                    <button onClick={() => addToCompare(college.id)} className="text-xs font-medium text-primary hover:underline">Compare</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Compare Queue */}
        {compareList.length > 0 && (
          <section className="bg-primary/5 border border-primary/20 rounded-3xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Scale className="text-primary" /> Compare Queue ({compareList.length}/3)
                </h2>
                <p className="text-sm text-muted-foreground">Ready to see how they stack up?</p>
              </div>
              <Link href="/compare" className="mt-4 md:mt-0 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
                Compare Now
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {compareList.map(college => (
                <div key={college.id} className="bg-card border border-border rounded-xl p-4 flex justify-between items-center shadow-sm">
                  <span className="font-medium text-foreground truncate max-w-[200px]">{college.name}</span>
                  <button onClick={() => removeFromCompare(college.id)} className="text-muted-foreground hover:text-red-500 transition-colors p-1">&times;</button>
                </div>
              ))}
              {Array.from({ length: 3 - compareList.length }).map((_, i) => (
                <div key={i} className="border-2 border-dashed border-border rounded-xl p-4 flex items-center justify-center text-muted-foreground text-sm font-medium bg-card/50">
                  Empty Slot
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/colleges" className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-2xl hover:border-primary hover:shadow-md transition-all group">
              <Search className="text-muted-foreground group-hover:text-primary mb-3" size={32}/>
              <span className="font-medium text-foreground">Explore</span>
            </Link>
            <Link href="/saved" className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-2xl hover:border-primary hover:shadow-md transition-all group">
              <Heart className="text-muted-foreground group-hover:text-primary mb-3" size={32}/>
              <span className="font-medium text-foreground">Saved</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-2xl hover:border-primary hover:shadow-md transition-all group">
              <User className="text-muted-foreground group-hover:text-primary mb-3" size={32}/>
              <span className="font-medium text-foreground">Profile</span>
            </Link>
            <Link href="/settings" className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-2xl hover:border-primary hover:shadow-md transition-all group">
              <Settings className="text-muted-foreground group-hover:text-primary mb-3" size={32}/>
              <span className="font-medium text-foreground">Settings</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
