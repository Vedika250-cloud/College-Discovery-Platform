"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppStore, UserProfile } from "@/lib/store";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

const steps = [
 { id: "personal", title: "Personal Details" },
 { id: "academic", title: "Academic Record" },
 { id: "exams", title: "Entrance Exams" },
 { id: "preferences", title: "College Preferences" }
];

export default function OnboardingPage() {
 const router = useRouter();
 const { updateProfile, completeOnboarding } = useAppStore();
 const [currentStep, setCurrentStep] = useState(0);

 const [formData, setFormData] = useState<UserProfile>({
 name: "",
 email: "",
 phone: "",
 city: "",
 state: "",
 class10Percentage: "",
 class12Percentage: "",
 stream: "",
 exams: {
 jeeMainPercentile: "",
 jeeAdvancedRank: "",
 bitsatScore: "",
 viteeeRank: "",
 comedkRank: "",
 mhtCetPercentile: "",
 cuetScore: "",
 catPercentile: "",
 matScore: "",
 xatPercentile: "",
 gateScore: "",
 otherExams: "",
 },
 preferences: {
 coursePreference: "",
 budget: "",
 preferredState: "",
 ownershipType: "",
 hostelRequired: "",
 placementExpectation: "",
 }
 });

 const handleNext = () => {
 if (currentStep < steps.length - 1) {
 setCurrentStep(curr => curr + 1);
 } else {
 updateProfile(formData);
 completeOnboarding();
 document.cookie = "hasCompletedOnboarding=true; path=/";
 router.push("/dashboard");
 }
 };

 const handleBack = () => {
 if (currentStep > 0) {
 setCurrentStep(curr => curr - 1);
 }
 };

 const updateField = (field: string, value: string) => {
 setFormData(prev => ({ ...prev, [field]: value }));
 };

 const updateExam = (field: keyof UserProfile["exams"], value: string) => {
 setFormData(prev => ({
 ...prev,
 exams: { ...prev.exams, [field]: value }
 }));
 };

 const updatePreference = (field: keyof UserProfile["preferences"], value: string) => {
 setFormData(prev => ({
 ...prev,
 preferences: { ...prev.preferences, [field]: value }
 }));
 };

 return (
 <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
 <div className="w-full max-w-3xl">
 <div className="mb-8">
 <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to CollegeFinder</h1>
 <p className="text-muted-foreground">We&apos;re preparing your personalized dashboard based on your profile.</p>
 </div>

 <div className="flex justify-between mb-8 relative">
 <div className="absolute top-1/2 left-0 right-0 h-1 bg-border -z-10 -translate-y-1/2 rounded-full overflow-hidden">
 <motion.div 
 className="h-full bg-primary"
 initial={{ width: "0%" }}
 animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
 transition={{ duration: 0.3 }}
 />
 </div>
 {steps.map((step, idx) => (
 <div key={step.id} className="flex flex-col items-center gap-2">
 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 transition-colors duration-300 ${
 idx <= currentStep ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"
 }`}>
 {idx < currentStep ? <CheckCircle2 size={20} /> : idx + 1}
 </div>
 <span className={`text-xs font-medium hidden sm:block ${idx <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>
 {step.title}
 </span>
 </div>
 ))}
 </div>

 <div className="bg-card border border-border shadow-lg rounded-2xl p-6 sm:p-10 overflow-hidden relative min-h-[400px]">
 <AnimatePresence mode="wait">
 <motion.div
 key={currentStep}
 initial={{ x: 50, opacity: 0 }}
 animate={{ x: 0, opacity: 1 }}
 exit={{ x: -50, opacity: 0 }}
 transition={{ duration: 0.3 }}
 >
 {currentStep === 0 && (
 <div className="space-y-6">
 <h2 className="text-2xl font-bold text-foreground mb-6">Personal Details</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Full Name</label>
 <input type="text" className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.name} onChange={e => updateField('name', e.target.value)} placeholder="John Doe" />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Email Address</label>
 <input type="email" className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.email} onChange={e => updateField('email', e.target.value)} placeholder="john@example.com" />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Phone Number</label>
 <input type="tel" className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.phone} onChange={e => updateField('phone', e.target.value)} placeholder="+91 9876543210" />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">City</label>
 <input type="text" className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.city} onChange={e => updateField('city', e.target.value)} placeholder="Mumbai" />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">State</label>
 <input type="text" className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.state} onChange={e => updateField('state', e.target.value)} placeholder="Maharashtra" />
 </div>
 </div>
 </div>
 )}

 {currentStep === 1 && (
 <div className="space-y-6">
 <h2 className="text-2xl font-bold text-foreground mb-6">Academic Record</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Class 10th Percentage</label>
 <input type="number" className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.class10Percentage} onChange={e => updateField('class10Percentage', e.target.value)} placeholder="e.g. 92" />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Class 12th Percentage</label>
 <input type="number" className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.class12Percentage} onChange={e => updateField('class12Percentage', e.target.value)} placeholder="e.g. 88" />
 </div>
 <div className="space-y-2 md:col-span-2">
 <label className="text-sm font-medium text-foreground">12th Stream</label>
 <select className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.stream} onChange={e => updateField('stream', e.target.value)}>
 <option value="">Select Stream</option>
 <option value="PCM">PCM (Physics, Chemistry, Math)</option>
 <option value="PCB">PCB (Physics, Chemistry, Biology)</option>
 <option value="PCMB">PCMB</option>
 <option value="Commerce">Commerce</option>
 <option value="Arts">Arts/Humanities</option>
 </select>
 </div>
 </div>
 </div>
 )}

 {currentStep === 2 && (
 <div className="space-y-6">
 <h2 className="text-2xl font-bold text-foreground mb-2">Entrance Exams</h2>
 <p className="text-sm text-muted-foreground mt-1">Tell us about yourself so we can personalize your experience.</p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[40vh] overflow-y-auto pr-2">
 <div className="space-y-1">
 <label className="text-xs font-medium text-muted-foreground">JEE Main Percentile</label>
 <input type="number" step="0.01" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.exams.jeeMainPercentile} onChange={e => updateExam('jeeMainPercentile', e.target.value)} placeholder="e.g. 98.5" />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-medium text-muted-foreground">JEE Advanced Rank</label>
 <input type="number" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.exams.jeeAdvancedRank} onChange={e => updateExam('jeeAdvancedRank', e.target.value)} placeholder="e.g. 5000" />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-medium text-muted-foreground">BITSAT Score</label>
 <input type="number" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.exams.bitsatScore} onChange={e => updateExam('bitsatScore', e.target.value)} placeholder="e.g. 280" />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-medium text-muted-foreground">VITEEE Rank</label>
 <input type="number" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.exams.viteeeRank} onChange={e => updateExam('viteeeRank', e.target.value)} placeholder="e.g. 15000" />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-medium text-muted-foreground">COMEDK Rank</label>
 <input type="number" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.exams.comedkRank} onChange={e => updateExam('comedkRank', e.target.value)} placeholder="e.g. 12000" />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-medium text-muted-foreground">MHT CET Percentile</label>
 <input type="number" step="0.01" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.exams.mhtCetPercentile} onChange={e => updateExam('mhtCetPercentile', e.target.value)} placeholder="e.g. 96.5" />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-medium text-muted-foreground">CUET Score</label>
 <input type="number" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.exams.cuetScore} onChange={e => updateExam('cuetScore', e.target.value)} placeholder="e.g. 750" />
 </div>
 <div className="space-y-1">
 <label className="text-xs font-medium text-muted-foreground">GATE Score</label>
 <input type="number" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.exams.gateScore} onChange={e => updateExam('gateScore', e.target.value)} placeholder="e.g. 800" />
 </div>
 <div className="space-y-1 md:col-span-2">
 <label className="text-xs font-medium text-muted-foreground">Other Exams (Comma separated)</label>
 <input type="text" className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.exams.otherExams} onChange={e => updateExam('otherExams', e.target.value)} placeholder="e.g. NID DAT, NIFT" />
 </div>
 </div>
 </div>
 )}

 {currentStep === 3 && (
 <div className="space-y-6">
 <h2 className="text-2xl font-bold text-foreground mb-6">College Preferences</h2>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Preferred Course</label>
 <select className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.preferences.coursePreference} onChange={e => updatePreference('coursePreference', e.target.value)}>
 <option value="">Select Course</option>
 <option value="Computer Science">Computer Science / IT</option>
 <option value="Electronics">Electronics / Electrical</option>
 <option value="Mechanical">Mechanical / Civil</option>
 <option value="Biotechnology">Biotechnology</option>
 <option value="Data Science">Data Science / AI</option>
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Budget (Per Year)</label>
 <select className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.preferences.budget} onChange={e => updatePreference('budget', e.target.value)}>
 <option value="">Select Budget</option>
 <option value="150000">Under ₹1.5 Lakhs</option>
 <option value="300000">₹1.5L - ₹3.0 Lakhs</option>
 <option value="500000">₹3.0L - ₹5.0 Lakhs</option>
 <option value="1000000">Any Budget</option>
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Preferred State</label>
 <input type="text" className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.preferences.preferredState} onChange={e => updatePreference('preferredState', e.target.value)} placeholder="e.g. Maharashtra" />
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Institution Type</label>
 <select className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.preferences.ownershipType} onChange={e => updatePreference('ownershipType', e.target.value)}>
 <option value="">No Preference</option>
 <option value="Public">Government / Public</option>
 <option value="Private">Private</option>
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Hostel Required?</label>
 <select className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.preferences.hostelRequired} onChange={e => updatePreference('hostelRequired', e.target.value)}>
 <option value="">Select Option</option>
 <option value="Yes">Yes, absolutely</option>
 <option value="No">No, I&apos;ll manage</option>
 <option value="Flexible">Doesn&apos;t matter</option>
 </select>
 </div>
 <div className="space-y-2">
 <label className="text-sm font-medium text-foreground">Minimum Placement Expectation</label>
 <select className="w-full p-3 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none" value={formData.preferences.placementExpectation} onChange={e => updatePreference('placementExpectation', e.target.value)}>
 <option value="">Select Expectation</option>
 <option value="500000">₹5+ Lakhs/year</option>
 <option value="1000000">₹10+ Lakhs/year</option>
 <option value="1500000">₹15+ Lakhs/year</option>
 <option value="2000000">₹20+ Lakhs/year</option>
 </select>
 </div>
 </div>
 </div>
 )}
 </motion.div>
 </AnimatePresence>
 </div>

 <div className="flex justify-between items-center mt-8">
 <button 
 onClick={handleBack} 
 disabled={currentStep === 0}
 className="px-6 py-3 rounded-xl font-medium flex items-center gap-2 text-foreground bg-card border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
 >
 <ChevronLeft size={20} /> Back
 </button>
 
 <button 
 onClick={handleNext}
 className="px-8 py-3 rounded-xl font-medium flex items-center gap-2 text-primary-foreground bg-primary hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
 >
 {currentStep === steps.length - 1 ? "Complete Setup" : "Continue"}
 {currentStep < steps.length - 1 && <ChevronRight size={20} />}
 </button>
 </div>
 </div>
 </div>
 );
}
