"use client";

import { useEffect, useState } from "react";
import { College } from "@/lib/data";
import { generateCollegeAnalytics } from "@/lib/utils";
import { motion } from "framer-motion";
import { TrendingUp, Users, Banknote, Target, Info } from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

interface CollegeAnalyticsProps {
  college: College;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number | string; name?: string }[];
  label?: string | number;
  prefix?: string;
  suffix?: string;
}

const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border p-3 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-muted-foreground text-xs font-semibold mb-1">{label}</p>
        <p className="font-bold text-foreground">
          {prefix}{payload[0].value.toLocaleString()}{suffix}
        </p>
      </div>
    );
  }
  return null;
};

export function CollegeAnalytics({ college }: CollegeAnalyticsProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<ReturnType<typeof generateCollegeAnalytics> | null>(null);

  useEffect(() => {
    // Simulate data fetch for a premium feel
    const timer = setTimeout(() => {
      setData(generateCollegeAnalytics(college));
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [college]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-3xl p-6 h-[400px] flex flex-col justify-between">
            <div className="w-1/3 h-6 bg-muted rounded-md animate-pulse" />
            <div className="w-full h-[280px] bg-muted/50 rounded-xl animate-pulse" />
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 h-[400px] flex flex-col justify-between">
            <div className="w-1/3 h-6 bg-muted rounded-md animate-pulse" />
            <div className="w-full h-[280px] bg-muted/50 rounded-xl animate-pulse" />
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 h-[400px] flex flex-col justify-between">
            <div className="w-1/3 h-6 bg-muted rounded-md animate-pulse" />
            <div className="w-full h-[280px] bg-muted/50 rounded-xl animate-pulse" />
          </div>
          <div className="bg-card border border-border rounded-3xl p-6 h-[400px] flex flex-col justify-between">
            <div className="w-1/3 h-6 bg-muted rounded-md animate-pulse" />
            <div className="w-full h-[280px] bg-muted/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const PIE_COLORS = ["#4F46E5", "#E2E8F0"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Placement Trends */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg">
                <TrendingUp size={20} />
              </div>
              <h3 className="font-bold text-lg">Placement CTC Trends</h3>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.placementTrends}>
                <defs>
                  <linearGradient id="colorCtc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} tickFormatter={(val) => `₹${(val/100000).toFixed(1)}L`} />
                <Tooltip content={<CustomTooltip prefix="₹" />} cursor={{stroke: '#E2E8F0', strokeWidth: 1, strokeDasharray: '4 4'}} />
                <Area type="monotone" dataKey="ctc" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorCtc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Historical Cutoffs */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-lg">
                <Target size={20} />
              </div>
              <h3 className="font-bold text-lg">Historical Cutoff Ranks</h3>
            </div>
            <div title="Lower rank is better" className="text-muted-foreground hover:text-foreground cursor-help">
              <Info size={16} />
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.cutoffTrends}>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis reversed axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip content={<CustomTooltip prefix="Rank " />} cursor={{stroke: '#E2E8F0', strokeWidth: 1, strokeDasharray: '4 4'}} />
                <Line type="monotone" dataKey="rank" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Inflation */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg">
                <Banknote size={20} />
              </div>
              <h3 className="font-bold text-lg">Fee Inflation Trend</h3>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.feeTrends} barSize={40}>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} tickFormatter={(val) => `₹${(val/1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip prefix="₹" />} cursor={{fill: '#F1F5F9', fillOpacity: 0.5}} />
                <Bar dataKey="fees" fill="#4F46E5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Admission Competitiveness */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                <Users size={20} />
              </div>
              <h3 className="font-bold text-lg">Acceptance Rate</h3>
            </div>
          </div>
          <div className="h-[280px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.competitiveness}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {data.competitiveness.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  content={({active, payload}) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-card border border-border p-3 rounded-xl shadow-xl">
                          <p className="font-bold">{payload[0].name}: {payload[0].value}%</p>
                        </div>
                      )
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-foreground">{data.competitiveness[0].value}%</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Admitted</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{backgroundColor: PIE_COLORS[0]}}></div>
              <span className="text-muted-foreground">Accepted</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{backgroundColor: PIE_COLORS[1]}}></div>
              <span className="text-muted-foreground">Rejected</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
