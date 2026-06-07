import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface UserProfile {
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
}

export const useAppStore = create<AppState>()(
 persist(
 (set) => ({
 isAuthenticated: false,
 hasCompletedOnboarding: false,
 login: () => set({ isAuthenticated: true }),
 logout: () => {
 document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
 document.cookie = "hasCompletedOnboarding=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
 set({ isAuthenticated: false, hasCompletedOnboarding: false });
 },
 completeOnboarding: () => set({ hasCompletedOnboarding: true }),

 profile: null,
 updateProfile: (profile) => set({ profile }),

 savedColleges: [],
 toggleSaveCollege: (id) =>
 set((state) => ({
 savedColleges: state.savedColleges.includes(id)
 ? state.savedColleges.filter((c) => c !== id)
 : [...state.savedColleges, id],
 })),

 compareColleges: [],
 addToCompare: (id) =>
 set((state) => ({
 compareColleges:
 state.compareColleges.length < 3 && !state.compareColleges.includes(id)
 ? [...state.compareColleges, id]
 : state.compareColleges,
 })),
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
 }),
 {
 name: "college-discovery-storage",
 }
 )
);
