"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, Star, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                Discover your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">perfect college</span> fit.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground dark:text-muted-foreground max-w-3xl mx-auto mb-10">
                Data-driven insights, personalized recommendations, and comprehensive comparison tools to help you make the best choice for your future.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/login?signup=true"
                  className="px-8 py-4 rounded-full bg-primary text-white font-medium text-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Start Your Journey <ArrowRight size={20} />
                </Link>
                <Link
                  href="#how-it-works"
                  className="px-8 py-4 rounded-full bg-card border border-border font-medium text-lg hover:bg-muted/50 dark:hover:bg-gray-900 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-card border-y border-border ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Premium Tools for Premium Choices</h2>
              <p className="text-muted-foreground dark:text-muted-foreground max-w-2xl mx-auto">Everything you need to analyze, compare, and track your college applications in one unified platform.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Search className="text-primary" size={32} />,
                  title: "Smart Discovery",
                  description: "Advanced algorithms match you with colleges based on your scores, budget, and preferences."
                },
                {
                  icon: <Star className="text-accent" size={32} />,
                  title: "Fit Score Analysis",
                  description: "See your exact chances of admission and how well a college aligns with your career goals."
                },
                {
                  icon: <TrendingUp className="text-primary" size={32} />,
                  title: "Side-by-Side Comparison",
                  description: "Compare up to 3 colleges simultaneously across fees, placements, rankings, and more."
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="p-8 rounded-2xl bg-background border border-border hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground dark:text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "Colleges", value: "500+" },
                { label: "Students", value: "50k+" },
                { label: "Acceptance Rate", value: "98%" },
                { label: "Data Points", value: "10M+" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-card border-t border-border ">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-6">Ready to find your dream college?</h2>
            <p className="text-xl text-muted-foreground mb-10">Join thousands of students who have already found their perfect match.</p>
            <Link
              href="/login?signup=true"
              className="px-8 py-4 rounded-full bg-foreground text-background font-medium text-lg hover:opacity-90 transition-opacity"
            >
              Create Free Account
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border text-center text-muted-foreground">
        <p>© 2026 CollegeDiscover. All rights reserved.</p>
      </footer>
    </div>
  );
}
