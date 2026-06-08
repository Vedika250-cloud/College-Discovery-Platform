"use client";

import { Navbar } from "@/components/Navbar";
import { BackButton } from "@/components/ui/BackButton";
import { useAppStore } from "@/lib/store";
import { Bell, Check, Trash2, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead, deleteNotification, clearAllNotifications } = useAppStore();

  const safeFormatDate = (dateString?: string) => {
    if (!dateString) return "Just now";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Just now";
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return "Just now";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        <div className="mb-6">
          <BackButton label="Back to Dashboard" fallbackRoute="/dashboard" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                {notifications.filter(n => !n.read).length} New
              </span>
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="flex gap-2">
              <button 
                onClick={markAllNotificationsRead}
                className="text-sm font-medium px-3 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 size={16} /> Mark all read
              </button>
              <button 
                onClick={clearAllNotifications}
                className="text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 size={16} /> Clear all
              </button>
            </div>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-20 bg-card border border-border rounded-2xl shadow-sm">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
              <Bell size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2 text-foreground">No notifications</h2>
            <p className="text-muted-foreground">You&apos;re all caught up! We&apos;ll let you know when there are updates.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-2xl flex gap-4 transition-all shadow-sm ${
                  notification.read 
                    ? "bg-card border-border opacity-70" 
                    : "bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/30"
                }`}
              >
                <div className={`mt-1 flex-shrink-0 p-2 rounded-full h-10 w-10 flex items-center justify-center ${notification.read ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                  <Bell size={20} />
                </div>
                <div className="flex-1 pt-1">
                  <p className={`text-sm ${notification.read ? "text-foreground " : "font-medium text-foreground"}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">
                    {safeFormatDate(notification.date)}
                  </p>
                </div>
                <div className="flex items-start gap-2 pt-1">
                  {!notification.read && (
                    <button 
                      onClick={() => markNotificationRead(notification.id)}
                      className="p-2 text-muted-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-xl transition-colors"
                      title="Mark as read"
                    >
                      <Check size={18} />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteNotification(notification.id)}
                    className="p-2 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={18} />
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
