"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  fallbackRoute?: string;
  className?: string;
}

export function BackButton({ label = "Back", fallbackRoute = "/", className = "" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackRoute);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors ${className}`}
    >
      <ArrowLeft 
        size={16} 
        className="transition-transform group-hover:-translate-x-1"
      />
      {label}
    </button>
  );
}
