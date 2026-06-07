"use client";

import { Navbar } from "@/components/Navbar";
import { useAppStore } from "@/lib/store";
import { colleges } from "@/lib/data";
import { X, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ComparePage() {
 const { compareColleges, removeFromCompare, clearCompare } = useAppStore();
 
 const compareList = compareColleges.map(id => colleges.find(c => c.id === id)).filter(Boolean) as typeof colleges;

 return (
 <div className="min-h-screen bg-background flex flex-col">
 <Navbar />
 
 <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
 <div>
 <Link href="/colleges" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-2">
 <ArrowLeft size={16} /> Back to Colleges
 </Link>
 <h1 className="text-3xl font-bold">Compare Colleges</h1>
 </div>
 
 {compareList.length > 0 && (
 <button 
 onClick={clearCompare}
 className="text-red-500 hover:text-red-600 font-medium text-sm px-4 py-2 border border-red-200 dark:border-red-900/50 rounded-lg bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
 >
 Clear All
 </button>
 )}
 </div>

 {compareList.length === 0 ? (
 <div className="text-center py-20 bg-card border border-border rounded-2xl">
 <h2 className="text-xl font-bold mb-2">No colleges to compare</h2>
 <p className="text-muted-foreground mb-6">Add up to 3 colleges to see them side-by-side.</p>
 <Link href="/colleges" className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
 Find Colleges
 </Link>
 </div>
 ) : (
 <div className="overflow-x-auto pb-8">
 <div className="min-w-[800px] flex gap-6">
 {/* Labels Column */}
 <div className="w-48 flex-shrink-0 pt-20 space-y-4">
 <div className="h-14 flex items-center font-bold text-muted-foreground border-b border-border ">Ranking</div>
 <div className="h-14 flex items-center font-bold text-muted-foreground border-b border-border ">Location</div>
 <div className="h-14 flex items-center font-bold text-muted-foreground border-b border-border ">Ownership</div>
 <div className="h-14 flex items-center font-bold text-muted-foreground border-b border-border ">Fees (Per Year)</div>
 <div className="h-14 flex items-center font-bold text-muted-foreground border-b border-border ">Avg Placement</div>
 <div className="font-bold text-muted-foreground pt-4 border-t border-border mt-2">Top Courses</div>
 </div>

 {/* Data Columns */}
 {compareList.map(college => (
 <div key={college.id} className="flex-1 min-w-[300px] bg-card border border-border rounded-2xl p-6 relative">
 <button 
 onClick={() => removeFromCompare(college.id)}
 className="absolute top-4 right-4 p-1.5 bg-muted hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30 rounded-full transition-colors"
 >
 <X size={16} />
 </button>
 
 <div className="h-16 mb-4">
 <h3 className="font-bold text-lg leading-tight pr-8"><Link href={`/colleges/${college.id}`} className="hover:text-primary">{college.name}</Link></h3>
 </div>

 <div className="space-y-4">
 <div className="h-14 flex items-center border-b border-border font-medium">#{college.rankings}</div>
 <div className="h-14 flex items-center border-b border-border text-sm">{college.location}</div>
 <div className="h-14 flex items-center border-b border-border ">{college.ownership}</div>
 <div className="h-14 flex items-center border-b border-border font-mono">₹{college.fees.toLocaleString()}</div>
 <div className="h-14 flex items-center border-b border-border font-mono text-green-600 dark:text-green-400">₹{college.placements.toLocaleString()}</div>
 <div className="pt-4 border-t border-border mt-2">
 <div className="flex flex-wrap gap-2">
 {college.courses.slice(0, 4).map((course, i) => (
 <span key={i} className="text-xs bg-muted px-2 py-1 rounded border border-border ">
 {course}
 </span>
 ))}
 </div>
 </div>
 </div>
 </div>
 ))}
 
 {/* Empty placeholder if less than 3 */}
 {Array.from({ length: 3 - compareList.length }).map((_, i) => (
 <div key={`empty-${i}`} className="flex-1 min-w-[300px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-6 bg-muted/50/50 ">
 <div className="text-muted-foreground font-medium mb-4">Add College</div>
 <Link href="/colleges" className="px-4 py-2 bg-background border border-border rounded-lg hover:border-primary transition-colors text-sm">
 Browse
 </Link>
 </div>
 ))}
 </div>
 </div>
 )}
 </main>
 </div>
 );
}
