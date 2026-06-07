"use client";

import { useState, useEffect } from "react";
import { useAppStore, UserProfile } from "@/lib/store";
import { User, Mail, MapPin, GraduationCap, Phone, Edit2, Save, X, BookOpen, Building } from "lucide-react";
import { motion } from "framer-motion";

const SectionHeader = ({ title, icon: Icon }: { title: string, icon: React.ElementType }) => (
  <div className="flex items-center gap-2 mb-4 border-b border-border pb-2">
    <Icon className="text-primary" size={20} />
    <h2 className="text-xl font-bold text-foreground">{title}</h2>
  </div>
);

export default function ProfilePage() {
  const { profile, updateProfile } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  if (!profile || !formData) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const updateExam = (field: keyof UserProfile["exams"], value: string) => {
    setFormData(prev => prev ? {
      ...prev,
      exams: { ...prev.exams, [field]: value }
    } : prev);
  };

  const updatePreference = (field: keyof UserProfile["preferences"], value: string) => {
    setFormData(prev => prev ? {
      ...prev,
      preferences: { ...prev.preferences, [field]: value }
    } : prev);
  };



  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors">
              <Edit2 size={18} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button onClick={handleCancel} className="flex items-center gap-2 bg-muted text-foreground px-5 py-2.5 rounded-xl font-medium hover:bg-border transition-colors">
                <X size={18} /> Cancel
              </button>
              <button onClick={handleSave} className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors">
                <Save size={18} /> Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          
          {/* Personal Info */}
          <motion.section layout className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <SectionHeader title="Personal Information" icon={User} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                {isEditing ? <input type="text" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.name} onChange={e => updateField('name', e.target.value)} /> : <div className="p-2.5 font-medium text-foreground">{profile.name || '-'}</div>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                {isEditing ? <input type="email" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.email} onChange={e => updateField('email', e.target.value)} /> : <div className="p-2.5 font-medium text-foreground flex items-center gap-2"><Mail size={16}/> {profile.email || '-'}</div>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                {isEditing ? <input type="text" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.phone} onChange={e => updateField('phone', e.target.value)} /> : <div className="p-2.5 font-medium text-foreground flex items-center gap-2"><Phone size={16}/> {profile.phone || '-'}</div>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">City & State</label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <input type="text" className="w-1/2 p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.city} onChange={e => updateField('city', e.target.value)} placeholder="City" />
                    <input type="text" className="w-1/2 p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.state} onChange={e => updateField('state', e.target.value)} placeholder="State" />
                  </div>
                ) : <div className="p-2.5 font-medium text-foreground flex items-center gap-2"><MapPin size={16}/> {profile.city}, {profile.state}</div>}
              </div>
            </div>
          </motion.section>

          {/* Academic Info */}
          <motion.section layout className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <SectionHeader title="Academic Record" icon={GraduationCap} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Class 10th %</label>
                {isEditing ? <input type="number" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.class10Percentage} onChange={e => updateField('class10Percentage', e.target.value)} /> : <div className="p-2.5 font-bold text-foreground">{profile.class10Percentage || '-'}%</div>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Class 12th %</label>
                {isEditing ? <input type="number" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.class12Percentage} onChange={e => updateField('class12Percentage', e.target.value)} /> : <div className="p-2.5 font-bold text-foreground">{profile.class12Percentage || '-'}%</div>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Stream</label>
                {isEditing ? (
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.stream} onChange={e => updateField('stream', e.target.value)}>
                    <option value="">Select</option>
                    <option value="PCM">PCM</option>
                    <option value="PCB">PCB</option>
                    <option value="PCMB">PCMB</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                  </select>
                ) : <div className="p-2.5 font-medium text-foreground">{profile.stream || '-'}</div>}
              </div>
            </div>
          </motion.section>

          {/* Entrance Exams */}
          <motion.section layout className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <SectionHeader title="Entrance Exams" icon={BookOpen} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { key: 'jeeMainPercentile', label: 'JEE Main (%)' },
                { key: 'jeeAdvancedRank', label: 'JEE Adv (Rank)' },
                { key: 'bitsatScore', label: 'BITSAT' },
                { key: 'viteeeRank', label: 'VITEEE (Rank)' },
                { key: 'comedkRank', label: 'COMEDK (Rank)' },
                { key: 'mhtCetPercentile', label: 'MHT CET (%)' },
                { key: 'cuetScore', label: 'CUET' },
                { key: 'catPercentile', label: 'CAT (%)' },
              ].map(exam => (
                <div key={exam.key} className="space-y-1 bg-muted/30 p-3 rounded-xl border border-border">
                  <label className="text-xs font-medium text-muted-foreground">{exam.label}</label>
                  {isEditing ? (
                    <input 
                      type="number" 
                      className="w-full p-1.5 rounded bg-background border border-border text-foreground text-sm" 
                      value={((formData.exams || {}) as Record<string, string>)[exam.key]} 
                      onChange={e => updateExam(exam.key as keyof UserProfile["exams"], e.target.value)} 
                    />
                  ) : (
                    <div className="font-bold text-foreground text-lg">{((profile.exams || {}) as Record<string, string>)[exam.key] || '-'}</div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Preferences */}
          <motion.section layout className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <SectionHeader title="College Preferences" icon={Building} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Preferred Course</label>
                {isEditing ? (
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.preferences.coursePreference} onChange={e => updatePreference('coursePreference', e.target.value)}>
                    <option value="">Any</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                  </select>
                ) : <div className="p-2.5 font-medium text-foreground">{profile.preferences.coursePreference || 'Any'}</div>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Budget Limit</label>
                {isEditing ? (
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.preferences.budget} onChange={e => updatePreference('budget', e.target.value)}>
                    <option value="">Any</option>
                    <option value="150000">₹1.5 Lakhs</option>
                    <option value="300000">₹3.0 Lakhs</option>
                    <option value="500000">₹5.0 Lakhs</option>
                    <option value="1000000">Any</option>
                  </select>
                ) : <div className="p-2.5 font-medium text-foreground">{profile.preferences.budget ? `₹${Number(profile.preferences.budget).toLocaleString()}` : 'Any'}</div>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Hostel Required?</label>
                {isEditing ? (
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.preferences.hostelRequired} onChange={e => updatePreference('hostelRequired', e.target.value)}>
                    <option value="">Any</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                ) : <div className="p-2.5 font-medium text-foreground">{profile.preferences.hostelRequired || 'Flexible'}</div>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Placement Expectations</label>
                {isEditing ? (
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.preferences.placementExpectation} onChange={e => updatePreference('placementExpectation', e.target.value)}>
                    <option value="">Any</option>
                    <option value="500000">5+ LPA</option>
                    <option value="1000000">10+ LPA</option>
                    <option value="1500000">15+ LPA</option>
                    <option value="2000000">20+ LPA</option>
                  </select>
                ) : <div className="p-2.5 font-medium text-foreground">{profile.preferences.placementExpectation ? `₹${Number(profile.preferences.placementExpectation).toLocaleString()}+` : 'Any'}</div>}
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">Ownership</label>
                {isEditing ? (
                  <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground" value={formData.preferences.ownershipType} onChange={e => updatePreference('ownershipType', e.target.value)}>
                    <option value="">Any</option>
                    <option value="Public">Public/Govt</option>
                    <option value="Private">Private</option>
                  </select>
                ) : <div className="p-2.5 font-medium text-foreground">{profile.preferences.ownershipType || 'Any'}</div>}
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </div>
  );
}
