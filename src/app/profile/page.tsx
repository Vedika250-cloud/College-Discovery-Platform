"use client";

import { useState, useEffect, useRef } from "react";
import { useAppStore, UserProfile } from "@/lib/store";
import { User, Mail, MapPin, GraduationCap, Edit2, Save, X, BookOpen, Building, Camera, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/ui/BackButton";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be smaller than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    updateField("profileImage", "");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <div className="mb-6">
          <BackButton label="Back to Dashboard" fallbackRoute="/dashboard" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm">
              <Edit2 size={18} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-3 w-full md:w-auto">
              <button onClick={handleCancel} className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-muted text-foreground px-5 py-2.5 rounded-xl font-medium hover:bg-border transition-colors">
                <X size={18} /> Cancel
              </button>
              <button onClick={handleSave} className="flex-1 md:flex-none flex justify-center items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-sm">
                <Save size={18} /> Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Avatar & Quick Info */}
          <div className="lg:col-span-1 space-y-6">
            <motion.section layout className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
              <div className="relative group mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-md bg-muted flex items-center justify-center relative">
                  {(isEditing ? formData.profileImage : profile.profileImage) ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={isEditing ? formData.profileImage : profile.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-muted-foreground">{getInitials(profile.name || "User")}</span>
                  )}
                  
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => fileInputRef.current?.click()} className="text-white p-2">
                        <Camera size={24} />
                      </button>
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <div className="flex justify-center gap-2 mt-4">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
                    >
                      Change
                    </button>
                    {(formData.profileImage) && (
                      <button 
                        onClick={removeImage}
                        className="text-xs font-medium bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity flex items-center gap-1"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/jpeg, image/png, image/webp" 
                      className="hidden" 
                    />
                  </div>
                )}
              </div>
              
              <h2 className="text-xl font-bold text-foreground">{isEditing ? formData.name || 'Your Name' : profile.name}</h2>
              <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1"><Mail size={14} /> {isEditing ? formData.email || 'Email Address' : profile.email}</p>
              <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1"><MapPin size={14} /> {isEditing ? `${formData.city}, ${formData.state}` : `${profile.city}, ${profile.state}`}</p>
            </motion.section>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Info */}
            <motion.section layout className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <SectionHeader title="Personal Information" icon={User} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  {isEditing ? <input type="text" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.name} onChange={e => updateField('name', e.target.value)} /> : <div className="p-2.5 font-medium text-foreground">{profile.name || '-'}</div>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  {isEditing ? <input type="email" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.email} onChange={e => updateField('email', e.target.value)} /> : <div className="p-2.5 font-medium text-foreground">{profile.email || '-'}</div>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  {isEditing ? <input type="text" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.phone} onChange={e => updateField('phone', e.target.value)} /> : <div className="p-2.5 font-medium text-foreground">{profile.phone || '-'}</div>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">City & State</label>
                  {isEditing ? (
                    <div className="flex gap-2">
                      <input type="text" className="w-1/2 p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.city} onChange={e => updateField('city', e.target.value)} placeholder="City" />
                      <input type="text" className="w-1/2 p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.state} onChange={e => updateField('state', e.target.value)} placeholder="State" />
                    </div>
                  ) : <div className="p-2.5 font-medium text-foreground">{profile.city}, {profile.state}</div>}
                </div>
              </div>
            </motion.section>

            {/* Academic Info */}
            <motion.section layout className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <SectionHeader title="Academic Record" icon={GraduationCap} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Class 10th %</label>
                  {isEditing ? <input type="number" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.class10Percentage} onChange={e => updateField('class10Percentage', e.target.value)} /> : <div className="p-2.5 font-bold text-foreground">{profile.class10Percentage || '-'}%</div>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Class 12th %</label>
                  {isEditing ? <input type="number" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.class12Percentage} onChange={e => updateField('class12Percentage', e.target.value)} /> : <div className="p-2.5 font-bold text-foreground">{profile.class12Percentage || '-'}%</div>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Stream</label>
                  {isEditing ? (
                    <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.stream} onChange={e => updateField('stream', e.target.value)}>
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { key: 'jeeMainPercentile', label: 'JEE Main (%)' },
                  { key: 'jeeAdvancedRank', label: 'JEE Adv (Rank)' },
                  { key: 'bitsatScore', label: 'BITSAT' },
                  { key: 'viteeeRank', label: 'VITEEE (Rank)' },
                  { key: 'comedkRank', label: 'COMEDK (Rank)' },
                  { key: 'mhtCetPercentile', label: 'MHT CET (%)' },
                  { key: 'cuetScore', label: 'CUET' },
                  { key: 'catPercentile', label: 'CAT (%)' },
                  { key: 'matScore', label: 'MAT' },
                  { key: 'xatPercentile', label: 'XAT (%)' },
                  { key: 'gateScore', label: 'GATE' },
                  { key: 'otherExams', label: 'Other Exams' },
                ].map(exam => (
                  <div key={exam.key} className="space-y-1 bg-muted/30 p-3 rounded-xl border border-border">
                    <label className="text-xs font-medium text-muted-foreground">{exam.label}</label>
                    {isEditing ? (
                      <input 
                        type="number" 
                        className="w-full p-1.5 rounded bg-background border border-border text-foreground text-sm focus:ring-2 focus:ring-primary/50 outline-none transition-all" 
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Preferred Course</label>
                  {isEditing ? (
                    <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.preferences.coursePreference} onChange={e => updatePreference('coursePreference', e.target.value)}>
                      <option value="">Any</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Civil">Civil</option>
                      <option value="Information Technology">Information Technology</option>
                    </select>
                  ) : <div className="p-2.5 font-medium text-foreground">{profile.preferences.coursePreference || 'Any'}</div>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Budget Limit</label>
                  {isEditing ? (
                    <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.preferences.budget} onChange={e => updatePreference('budget', e.target.value)}>
                      <option value="">Any</option>
                      <option value="150000">₹1.5 Lakhs</option>
                      <option value="300000">₹3.0 Lakhs</option>
                      <option value="500000">₹5.0 Lakhs</option>
                      <option value="1000000">₹10 Lakhs</option>
                      <option value="2000000">₹20 Lakhs</option>
                    </select>
                  ) : <div className="p-2.5 font-medium text-foreground">{profile.preferences.budget ? `₹${Number(profile.preferences.budget).toLocaleString()}` : 'Any'}</div>}
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-muted-foreground">Hostel Required?</label>
                  {isEditing ? (
                    <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.preferences.hostelRequired} onChange={e => updatePreference('hostelRequired', e.target.value)}>
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
                    <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.preferences.placementExpectation} onChange={e => updatePreference('placementExpectation', e.target.value)}>
                      <option value="">Any</option>
                      <option value="500000">5+ LPA</option>
                      <option value="1000000">10+ LPA</option>
                      <option value="1500000">15+ LPA</option>
                      <option value="2000000">20+ LPA</option>
                    </select>
                  ) : <div className="p-2.5 font-medium text-foreground">{profile.preferences.placementExpectation ? `₹${Number(profile.preferences.placementExpectation).toLocaleString()}+` : 'Any'}</div>}
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Ownership</label>
                  {isEditing ? (
                    <select className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/50 outline-none transition-all" value={formData.preferences.ownershipType} onChange={e => updatePreference('ownershipType', e.target.value)}>
                      <option value="">Both (Default)</option>
                      <option value="Public">Government</option>
                      <option value="Private">Private</option>
                    </select>
                  ) : <div className="p-2.5 font-medium text-foreground">{profile.preferences.ownershipType === 'Public' ? 'Government' : profile.preferences.ownershipType || 'Both'}</div>}
                </div>
              </div>
            </motion.section>

          </div>
        </div>
      </main>
    </div>
  );
}
