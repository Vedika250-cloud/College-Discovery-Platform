"use client";

import { useState, useEffect } from "react";
import { useAppStore, ApplicationStatus, Application } from "@/lib/store";
import { colleges } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Plus, Edit2, FileText, Trash2, X, LayoutGrid, Building, CheckCircle2, FileUp, Hourglass, XCircle, Clock, Calendar } from "lucide-react";
import Link from "next/link";

const STATUSES: { name: ApplicationStatus; color: string; icon: React.ElementType }[] = [
  { name: "Not Started", color: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700", icon: Building },
  { name: "Applying", color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-900", icon: Edit2 },
  { name: "Submitted", color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-900", icon: FileUp },
  { name: "Under Review", color: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-900", icon: Hourglass },
  { name: "Accepted", color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-900", icon: CheckCircle2 },
  { name: "Rejected", color: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-900", icon: XCircle }
];

export default function ApplicationsPage() {
  const { applications, addApplication, updateApplication, deleteApplication } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppId, setEditingAppId] = useState<string | null>(null);

  // Form State
  const [formCollegeId, setFormCollegeId] = useState("");
  const [formStatus, setFormStatus] = useState<ApplicationStatus>("Not Started");
  const [formNotes, setFormNotes] = useState("");
  const [formDeadline, setFormDeadline] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const openAddModal = () => {
    setEditingAppId(null);
    setFormCollegeId("");
    setFormStatus("Not Started");
    setFormNotes("");
    setFormDeadline("");
    setIsModalOpen(true);
  };

  const openEditModal = (app: Application) => {
    setEditingAppId(app.id);
    setFormCollegeId(app.collegeId);
    setFormStatus(app.status);
    setFormNotes(app.notes || "");
    setFormDeadline(app.deadline || "");
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCollegeId) return;

    if (editingAppId) {
      updateApplication(editingAppId, {
        collegeId: formCollegeId,
        status: formStatus,
        notes: formNotes,
        deadline: formDeadline
      });
    } else {
      addApplication({
        collegeId: formCollegeId,
        status: formStatus,
        notes: formNotes,
        deadline: formDeadline
      });
    }
    setIsModalOpen(false);
  };

  // Available colleges to add (exclude already added unless editing that specific app)
  const availableColleges = colleges.filter(c => 
    !applications.some(app => app.collegeId === c.id) || (editingAppId && applications.find(a => a.id === editingAppId)?.collegeId === c.id)
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-full mx-auto px-4 sm:px-6 py-8 w-full">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <LayoutGrid className="text-primary" size={28} /> Application Tracker
            </h1>
            <p className="text-muted-foreground mt-1">Manage all your college applications in one place.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus size={18} /> New Application
          </button>
        </div>

        {/* Kanban Board */}
        {mounted && (
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x hide-scrollbar h-[calc(100vh-200px)] min-h-[500px]">
            {STATUSES.map(statusObj => {
              const columnApps = applications.filter(a => a.status === statusObj.name);
              const Icon = statusObj.icon;
              return (
                <div key={statusObj.name} className="flex-shrink-0 w-[320px] sm:w-[350px] snap-start flex flex-col h-full bg-muted/30 rounded-2xl p-4 border border-border">
                  
                  {/* Column Header */}
                  <div className={`flex items-center justify-between mb-4 p-3 rounded-xl border ${statusObj.color}`}>
                    <div className="flex items-center gap-2 font-bold">
                      <Icon size={18} />
                      {statusObj.name}
                    </div>
                    <span className="bg-background/50 px-2 py-0.5 rounded-md text-sm font-semibold">{columnApps.length}</span>
                  </div>

                  {/* Column Items */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 hide-scrollbar">
                    {columnApps.length === 0 ? (
                      <div className="h-24 flex items-center justify-center border-2 border-dashed border-border rounded-xl text-muted-foreground text-sm font-medium opacity-50">
                        Empty
                      </div>
                    ) : (
                      columnApps.map(app => {
                        const college = colleges.find(c => c.id === app.collegeId);
                        if (!college) return null;
                        
                        return (
                          <div key={app.id} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group relative">
                            
                            {/* Card Actions */}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                              <button onClick={() => openEditModal(app)} className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"><Edit2 size={14}/></button>
                              <button onClick={() => deleteApplication(app.id)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"><Trash2 size={14}/></button>
                            </div>

                            <Link href={`/colleges/${college.id}`} className="font-bold text-foreground hover:text-primary transition-colors block mb-1 pr-14">
                              {college.name}
                            </Link>
                            
                            <div className="text-xs text-muted-foreground mb-4">
                              {college.location}
                            </div>

                            <div className="space-y-2">
                              {app.deadline && (
                                <div className="flex items-center gap-2 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1.5 rounded-lg w-fit border border-amber-200 dark:border-amber-900/50">
                                  <Clock size={14} /> {app.deadline}
                                </div>
                              )}
                              
                              {app.notes && (
                                <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg border border-border">
                                  <FileText size={14} className="shrink-0 mt-0.5" />
                                  <p className="line-clamp-2">{app.notes}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border shadow-xl rounded-3xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-xl font-bold">{editingAppId ? "Edit Application" : "New Application"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"><X size={20}/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              
              <div className="space-y-2">
                <label className="text-sm font-medium">College</label>
                <select 
                  required
                  value={formCollegeId}
                  onChange={(e) => setFormCollegeId(e.target.value)}
                  disabled={!!editingAppId}
                  className="w-full p-3 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
                >
                  <option value="" disabled>Select a college...</option>
                  {editingAppId && !availableColleges.find(c => c.id === formCollegeId) && (
                    <option value={formCollegeId}>{colleges.find(c => c.id === formCollegeId)?.name}</option>
                  )}
                  {availableColleges.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <select 
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value as ApplicationStatus)}
                  className="w-full p-3 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                >
                  {STATUSES.map(s => (
                    <option key={s.name} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Deadline</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input 
                    type="date"
                    value={formDeadline}
                    onChange={(e) => setFormDeadline(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes & Requirements</label>
                <textarea 
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="e.g. Need to submit SOP, LORs by 15th..."
                  rows={3}
                  className="w-full p-3 bg-muted border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 font-medium rounded-xl hover:bg-muted transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                  {editingAppId ? "Save Changes" : "Add Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
