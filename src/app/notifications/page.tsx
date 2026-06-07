"use client";

import { Navbar } from "@/components/Navbar";
import { useAppStore } from "@/lib/store";
import { Bell, Check, Trash2, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
 const { notifications, markNotificationRead, markAllNotificationsRead, deleteNotification, clearAllNotifications } = useAppStore();

 return (
 <div className="min-h-screen bg-background flex flex-col">
 <Navbar />
 
 <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
 <div className="flex justify-between items-center mb-8">
 <div className="flex items-center gap-3">
 <h1 className="text-3xl font-bold">Notifications</h1>
 {notifications.filter(n => !n.read).length > 0 && (
 <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
 {notifications.filter(n => !n.read).length} New
 </span>
 )}
 </div>
 
 {notifications.length > 0 && (
 <div className="flex gap-2">
 <button 
 onClick={markAllNotificationsRead}
 className="text-sm font-medium px-3 py-1.5 hover:bg-muted dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-1.5"
 >
 <CheckCircle2 size={16} /> Mark all read
 </button>
 <button 
 onClick={clearAllNotifications}
 className="text-sm font-medium text-red-500 px-3 py-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors flex items-center gap-1.5"
 >
 <Trash2 size={16} /> Clear all
 </button>
 </div>
 )}
 </div>

 {notifications.length === 0 ? (
 <div className="text-center py-20 bg-card border border-border rounded-2xl">
 <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
 <Bell size={32} />
 </div>
 <h2 className="text-xl font-bold mb-2">No notifications</h2>
 <p className="text-muted-foreground">You&apos;re all caught up!</p>
 </div>
 ) : (
 <div className="space-y-4">
 {notifications.map(notification => (
 <div 
 key={notification.id} 
 className={`p-4 border rounded-xl flex gap-4 transition-colors ${
 notification.read 
 ? "bg-card border-border opacity-70" 
 : "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30"
 }`}
 >
 <div className={`mt-1 flex-shrink-0 ${notification.read ? "text-muted-foreground" : "text-primary"}`}>
 <Bell size={20} />
 </div>
 <div className="flex-1">
 <p className={`text-sm ${notification.read ? "text-foreground " : "font-medium"}`}>
 {notification.message}
 </p>
 <p className="text-xs text-muted-foreground mt-2">
 {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
 </p>
 </div>
 <div className="flex items-start gap-2">
 {!notification.read && (
 <button 
 onClick={() => markNotificationRead(notification.id)}
 className="p-1.5 text-muted-foreground hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
 title="Mark as read"
 >
 <Check size={16} />
 </button>
 )}
 <button 
 onClick={() => deleteNotification(notification.id)}
 className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
 title="Delete"
 >
 <Trash2 size={16} />
 </button>
 </div>
 </div>
 ))}
 </div>
 )}
 </main>
 </div>
 );
}
