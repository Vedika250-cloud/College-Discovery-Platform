"use client";

import { useState, useEffect } from "react";
import { Upload, Plus, Search, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async (query = "") => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/scholarships${query ? "?query=" + encodeURIComponent(query) : ""}`);
      const data = await res.json();
      setScholarships(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchScholarships(search);
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage Scholarships, Colleges, and System Data</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition border border-slate-700">
            <Upload size={18} />
            Import CSV
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition shadow-lg shadow-primary/20">
            <Plus size={18} />
            Add Scholarship
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Analytics Placeholder */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Scholarships</h3>
            <p className="text-3xl font-bold text-white mt-2">{scholarships.length}+</p>
            <div className="flex items-center text-emerald-400 text-sm mt-2">
              <CheckCircle size={14} className="mr-1" /> Vector Indexed
            </div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg">
            <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Colleges</h3>
            <p className="text-3xl font-bold text-white mt-2">293</p>
            <div className="flex items-center text-emerald-400 text-sm mt-2">
              <CheckCircle size={14} className="mr-1" /> Vector Indexed
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Scholarship Database</h2>
            <form onSubmit={handleSearch} className="relative w-64">
              <input
                type="text"
                placeholder="Search scholarships..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-2 pl-3 pr-10 text-sm text-white focus:outline-none focus:border-primary"
              />
              <button type="submit" className="absolute right-2 top-2 text-slate-400 hover:text-white">
                <Search size={16} />
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar p-0">
            {isLoading ? (
              <div className="flex justify-center items-center h-48 text-slate-400">Loading database...</div>
            ) : scholarships.length === 0 ? (
              <div className="flex justify-center items-center h-48 text-slate-400">No scholarships found.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 text-sm">
                    <th className="px-6 py-3 font-medium">Name</th>
                    <th className="px-6 py-3 font-medium">Provider</th>
                    <th className="px-6 py-3 font-medium">Amount</th>
                    <th className="px-6 py-3 font-medium">State</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {scholarships.map((s, i) => (
                    <tr key={s.id || i} className="hover:bg-slate-800/50 transition">
                      <td className="px-6 py-4 text-white font-medium">{s.name}</td>
                      <td className="px-6 py-4 text-slate-300">{s.provider || "-"}</td>
                      <td className="px-6 py-4 text-slate-300">{s.amount || "-"}</td>
                      <td className="px-6 py-4 text-slate-300">{s.state || "All India"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          s.status === "Open" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800 text-slate-400"
                        }`}>
                          {s.status || "Open"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
