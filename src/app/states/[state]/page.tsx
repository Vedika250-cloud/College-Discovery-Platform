"use client";

import { use, useMemo } from "react";
import { colleges } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { MapPin, Building, GraduationCap, Banknote, Target, ChevronRight, Star } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import Link from "next/link";
import { motion } from "framer-motion";

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function StateExplorerPage({ params }: { params: Promise<{ state: string }> }) {
  // Extract state param properly avoiding sync unwrap issues in Next 15 if applicable
  const resolvedParams = use(params);
  const stateName = decodeURIComponent(resolvedParams.state);
  
  const stateColleges = useMemo(() => {
    return colleges.filter(c => c.state === stateName);
  }, [stateName]);

  const stats = useMemo(() => {
    if (stateColleges.length === 0) return null;
    
    let totalFees = 0;
    let totalPlacement = 0;
    let publicCount = 0;
    let privateCount = 0;

    const topCoursesMap: Record<string, number> = {};

    stateColleges.forEach(c => {
      totalFees += c.fees;
      totalPlacement += c.placements;
      if (c.ownership === "Public") publicCount++;
      else privateCount++;

      c.courses.forEach(course => {
        topCoursesMap[course] = (topCoursesMap[course] || 0) + 1;
      });
    });

    const popularCourses = Object.entries(topCoursesMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(entry => entry[0]);

    return {
      count: stateColleges.length,
      avgFees: Math.round(totalFees / stateColleges.length),
      avgPlacement: Math.round(totalPlacement / stateColleges.length),
      ownershipData: [
        { name: 'Public', value: publicCount },
        { name: 'Private', value: privateCount }
      ],
      popularCourses
    };
  }, [stateColleges]);

  if (!stats) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <MapPin className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <h1 className="text-3xl font-bold text-foreground">State Not Found</h1>
          <p className="text-muted-foreground mt-2 max-w-md">
            We couldn&apos;t find any colleges matching &quot;{stateName}&quot;.
          </p>
          <Link href="/india-map" className="mt-6 text-primary hover:underline font-semibold">
            ← Back to India Map
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const topColleges = [...stateColleges].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-card border-b border-border py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
            {stateName}
          </h1>
          <p className="text-xl text-muted-foreground flex items-center justify-center gap-2">
            <Building className="h-5 w-5" />
            {stats.count} Premium Institutions
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="bg-card border border-border p-6 rounded-3xl shadow-sm flex flex-col justify-center">
            <div className="flex items-center text-muted-foreground mb-4">
              <Banknote className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold tracking-wide uppercase text-sm">Avg. Annual Fees</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{formatCurrency(stats.avgFees)}</p>
          </motion.div>
          
          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.1}} className="bg-card border border-border p-6 rounded-3xl shadow-sm flex flex-col justify-center">
            <div className="flex items-center text-muted-foreground mb-4">
              <Target className="h-5 w-5 mr-2 text-accent" />
              <h3 className="font-semibold tracking-wide uppercase text-sm">Avg. Placement</h3>
            </div>
            <p className="text-3xl font-bold text-foreground">{formatCurrency(stats.avgPlacement)}</p>
          </motion.div>

          <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay:0.2}} className="bg-card border border-border p-6 rounded-3xl shadow-sm">
            <h3 className="font-semibold tracking-wide uppercase text-sm text-muted-foreground mb-4">Ownership Distribution</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.ownershipData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.ownershipData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                  />
                  <Legend iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main List */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
              Top Ranked in {stateName}
            </h2>
            <div className="space-y-4">
              {topColleges.map((c, i) => (
                <Link key={c.id} href={`/colleges/${c.slug}`}>
                  <motion.div 
                    initial={{x:-20, opacity:0}} 
                    animate={{x:0, opacity:1}} 
                    transition={{delay: i * 0.1}}
                    className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 group"
                  >
                    <div className="w-full sm:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative bg-muted">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.gallery[0]} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-2 left-2 bg-background/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-foreground shadow-sm">
                        #{i + 1}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">{c.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-3 gap-3">
                        <span className="flex items-center"><MapPin className="h-3 w-3 mr-1"/> {c.city}</span>
                        <span className="flex items-center text-amber-500 font-semibold"><Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500"/> {c.rating}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        <span className="bg-muted text-muted-foreground text-xs px-2.5 py-1 rounded-md">{c.ownership}</span>
                        <span className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-md font-semibold">{formatCurrency(c.placements)} Avg Package</span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center justify-center px-4">
                      <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Link href={`/colleges?state=${encodeURIComponent(stateName)}`} className="inline-flex items-center justify-center px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-colors">
                View All {stats.count} Colleges <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-card border border-border p-6 rounded-3xl shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4">Popular Programs</h3>
              <ul className="space-y-3">
                {stats.popularCourses.map((course, idx) => (
                  <li key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-transparent hover:border-border transition-colors">
                    <span className="text-sm font-medium text-foreground flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                      {course}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
