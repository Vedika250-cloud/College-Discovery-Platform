"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Bot, User, ChevronDown } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { colleges, scholarships } from "@/lib/data";

type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
};

export function AICounselor() {
  const { isAICounselorOpen, setAICounselorOpen, profile } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      text: "Hi! I'm your AI College Counselor. Ask me about college recommendations, scholarships, or how to improve your admission chances!",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAICounselorOpen]);

  const generateResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Greeting
    if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
      return `Hello ${profile?.name?.split(' ')[0] || 'there'}! How can I assist your college journey today?`;
    }

    // Scholarship matching
    if (q.includes("scholarship") || q.includes("fund") || q.includes("financial aid")) {
      if (!profile) return "Please complete your profile so I can find matching scholarships for you!";
      
      const budgetLower = profile.preferences.budget.toLowerCase();
      const needsAid = budgetLower.includes("less than 5") || budgetLower.includes("5 - 10");
      
      if (needsAid) {
        const needBased = scholarships.find(s => s.type.includes("Need"));
        return `Based on your budget, I highly recommend checking out the **${needBased?.name}** which offers ${needBased?.amount}. Go to the Scholarships tab to see your full matches!`;
      } else {
        const meritBased = scholarships.find(s => s.type.includes("Merit"));
        return `Since you are looking for scholarships, you should check out the **${meritBased?.name}** which awards ${meritBased?.amount} based on academic merit.`;
      }
    }

    // College Recommendations
    if (q.includes("recommend") || q.includes("college") || q.includes("suggest")) {
      if (!profile) return "I can give you better recommendations if you complete your profile first!";
      
      const prefState = profile.preferences.preferredState;
      const matchedCollege = colleges.find(c => c.location.includes(prefState)) || colleges[0];
      
      return `Based on your preference for ${prefState || 'any state'}, I recommend **${matchedCollege.name}**. It's a great fit for your profile! You can find more details in the Discover tab.`;
    }

    // Branch Selection
    if (q.includes("branch") || q.includes("course") || q.includes("major")) {
      if (profile?.preferences.coursePreference) {
        return `You've indicated an interest in **${profile.preferences.coursePreference}**. That's a great field with strong placement rates right now! Make sure your JEE scores align with top cutoffs.`;
      }
      return "Are you interested in Engineering, Medicine, Arts, or Commerce? Let me know and I can suggest top branches!";
    }

    // Career Roadmap
    if (q.includes("roadmap") || q.includes("career") || q.includes("plan")) {
      return "Here is your quick roadmap:\n1. Shortlist 5 safe and 2 ambitious colleges.\n2. Keep tracking their application deadlines in the 'Track Apps' tab.\n3. Prepare for upcoming entrance exams.\n4. Apply for scholarships to secure funding.";
    }

    // Fallback
    return "I'm still learning! You can ask me about **colleges**, **scholarships**, **branches**, or ask for a **roadmap**.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI delay
    setTimeout(() => {
      const aiResponseText = generateResponse(userMessage.text);
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "ai", text: aiResponseText },
      ]);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isAICounselorOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setAICounselorOpen(true)}
            className="fixed bottom-6 right-6 p-4 bg-primary text-primary-foreground rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center group"
          >
            <Sparkles size={28} className="group-hover:animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window Modal */}
      <AnimatePresence>
        {isAICounselorOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-full max-w-[380px] h-[600px] max-h-[80vh] bg-card border border-border shadow-2xl rounded-3xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-primary-foreground flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold">AI Counselor</h3>
                  <p className="text-xs text-primary-foreground/80">Online & Ready</p>
                </div>
              </div>
              <button 
                onClick={() => setAICounselorOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <ChevronDown size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'ai' ? 'bg-primary text-primary-foreground' : 'bg-muted border border-border text-foreground'}`}>
                    {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.role === 'ai' ? 'bg-card border border-border rounded-tl-none shadow-sm' : 'bg-primary text-primary-foreground rounded-tr-none shadow-md'}`}>
                    {/* Render newlines properly if present */}
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i !== msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border">
              {/* Quick suggestions */}
              {messages.length < 3 && (
                <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar">
                  {["Recommend a college", "Find scholarships", "Career roadmap"].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setInput(suggestion)}
                      className="shrink-0 text-xs px-3 py-1.5 bg-muted hover:bg-border rounded-full border border-border transition-colors whitespace-nowrap"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 bg-muted border border-border rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-full disabled:opacity-50 disabled:scale-95 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
