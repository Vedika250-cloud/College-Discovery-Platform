"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Maximize2, Minimize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-primary-foreground shadow-xl z-50 flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed z-40 flex flex-col bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden
              ${isFullScreen 
                ? "inset-4 rounded-2xl" 
                : "bottom-24 right-6 w-[400px] h-[600px] rounded-2xl sm:w-[450px]"
              }
            `}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
              <div className="flex items-center gap-2 text-white font-medium">
                <Bot size={20} className="text-primary" />
                EduGuide AI
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <button onClick={toggleFullScreen} className="hover:text-white transition">
                  {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                </button>
                <button onClick={toggleChat} className="hover:text-white transition">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
                  <Bot size={48} className="text-slate-600" />
                  <p className="text-center">Hi! I'm EduGuide AI.<br/>Ask me about colleges, fees, or scholarships.</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["Which colleges accept JEE Main?", "Scholarships for below 2L income", "Best CS colleges"].map(suggestion => (
                      <button 
                        key={suggestion}
                        onClick={() => handleInputChange({ target: { value: suggestion } } as any)}
                        className="text-xs bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full hover:bg-slate-700 transition"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Bot size={16} className="text-primary" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      m.role === "user" 
                        ? "bg-primary text-white rounded-br-none" 
                        : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none prose prose-invert prose-sm"
                    }`}>
                      {m.role === "user" ? (
                        m.content
                      ) : (
                        <ReactMarkdown className="markdown-body">
                          {m.content}
                        </ReactMarkdown>
                      )}
                    </div>
                    
                    {m.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                        <User size={16} className="text-slate-300" />
                      </div>
                    )}
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-primary" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1.5">
                    <motion.div className="w-2 h-2 rounded-full bg-slate-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-2 h-2 rounded-full bg-slate-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 rounded-full bg-slate-400" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 bg-slate-800 border-t border-slate-700">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a question..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-full py-3 pl-4 pr-12 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
