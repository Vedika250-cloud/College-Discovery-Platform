import { create } from "zustand";
import { persist } from "zustand/middleware";
import { colleges } from "@/lib/data";


export interface UserProfile {
  profileImage?: string;
  name: string;
 email: string;
 phone: string;
 city: string;
 state: string;
 class10Percentage: string;
 class12Percentage: string;
 stream: string;
 exams: {
 jeeMainPercentile: string;
 jeeAdvancedRank: string;
 bitsatScore: string;
 viteeeRank: string;
 comedkRank: string;
 mhtCetPercentile: string;
 cuetScore: string;
 catPercentile: string;
 matScore: string;
 xatPercentile: string;
 gateScore: string;
 otherExams: string;
 };
 preferences: {
 coursePreference: string;
 budget: string;
 preferredState: string;
 ownershipType: string;
 hostelRequired: string;
 placementExpectation: string;
 };
}

export type ApplicationStatus = "Not Started" | "Applying" | "Submitted" | "Under Review" | "Accepted" | "Rejected";

export interface Application {
 id: string;
 collegeId: string;
 status: ApplicationStatus;
 notes: string;
 deadline: string;
 dateAdded: string;
}

export interface Notification {
 id: string;
 message: string;
 read: boolean;
 date: string;
}

interface AppState {
 isAuthenticated: boolean;
 hasCompletedOnboarding: boolean;
 login: () => void;
 logout: () => void;
 completeOnboarding: () => void;
 
 isAICounselorOpen: boolean;
 setAICounselorOpen: (open: boolean) => void;
 
 profile: UserProfile | null;
 updateProfile: (profile: UserProfile) => void;

 savedColleges: string[];
 toggleSaveCollege: (id: string) => void;

 compareColleges: string[];
 addToCompare: (id: string) => void;
 removeFromCompare: (id: string) => void;
 clearCompare: () => void;

 notifications: Notification[];
 addNotification: (message: string) => void;
 markNotificationRead: (id: string) => void;
 markAllNotificationsRead: () => void;
 deleteNotification: (id: string) => void;
 clearAllNotifications: () => void;

 applications: Application[];
 addApplication: (app: Omit<Application, "id" | "dateAdded">) => void;
 updateApplication: (id: string, updates: Partial<Application>) => void;
 deleteApplication: (id: string) => void;
}

export const useAppStore = create<AppState>()(
 persist(
 (set, get) => ({
 isAuthenticated: false,
 hasCompletedOnboarding: false,
 isAICounselorOpen: false,
 setAICounselorOpen: (open) => set({ isAICounselorOpen: open }),
 login: () => set({ isAuthenticated: true }),
 logout: () => {
 document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
 document.cookie = "hasCompletedOnboarding=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
 set({ isAuthenticated: false, hasCompletedOnboarding: false });
 },
 completeOnboarding: () => {
   const state = get();
   state.addNotification("Profile completed successfully");
   state.addNotification("New recommendations generated based on your profile");
   state.addNotification("2 new scholarships matched your profile");
   set({ hasCompletedOnboarding: true });
 },

 profile: null,
 updateProfile: (profile) => set({ profile }),

 savedColleges: [],
 toggleSaveCollege: (id) => {
   const state = get();
   const isSaved = state.savedColleges.includes(id);
   if (!isSaved) {
     const college = colleges.find(c => c.id === id);
     if (college) {
       state.addNotification(`You saved ${college.name}`);
     }
   }
   set({
     savedColleges: isSaved
     ? state.savedColleges.filter((c) => c !== id)
     : [...state.savedColleges, id],
   });
 },

 compareColleges: [],
 addToCompare: (id) => {
   const state = get();
   const isCompared = state.compareColleges.includes(id);
   if (!isCompared && state.compareColleges.length < 3) {
     const college = colleges.find(c => c.id === id);
     if (college) {
       state.addNotification(`Added ${college.name} to comparison`);
     }
   }
   set({
     compareColleges:
     state.compareColleges.length < 3 && !isCompared
     ? [...state.compareColleges, id]
     : state.compareColleges,
   });
 },
 removeFromCompare: (id) =>
 set((state) => ({
 compareColleges: state.compareColleges.filter((c) => c !== id),
 })),
 clearCompare: () => set({ compareColleges: [] }),

 notifications: [],
 addNotification: (message) =>
 set((state) => ({
 notifications: [
 { id: Date.now().toString(), message, read: false, date: new Date().toISOString() },
 ...state.notifications,
 ],
 })),
 markNotificationRead: (id) =>
 set((state) => ({
 notifications: state.notifications.map((n) =>
 n.id === id ? { ...n, read: true } : n
 ),
 })),
 markAllNotificationsRead: () =>
 set((state) => ({
 notifications: state.notifications.map((n) => ({ ...n, read: true })),
 })),
 deleteNotification: (id) =>
 set((state) => ({
 notifications: state.notifications.filter((n) => n.id !== id),
 })),
 clearAllNotifications: () => set({ notifications: [] }),

 applications: [],
 addApplication: (app) => set((state) => {
   state.addNotification(`Application created`);
   return {
     applications: [...state.applications, { ...app, id: Date.now().toString(), dateAdded: new Date().toISOString() }]
   };
 }),
 updateApplication: (id, updates) => set((state) => ({
   applications: state.applications.map(app => app.id === id ? { ...app, ...updates } : app)
 })),
 deleteApplication: (id) => set((state) => ({
   applications: state.applications.filter(app => app.id !== id)
 })),
 }),
 {
 name: "college-discovery-storage",
 }
 )
);
