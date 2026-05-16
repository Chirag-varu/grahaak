"use client";

import { Input } from "@/components/ui/input";
import { Search, ShieldAlert, Command } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const { scrollY } = useScroll();
  const headerWidth = useTransform(scrollY, [0, 50], ["100%", "92%"]);
  const headerTop = useTransform(scrollY, [0, 50], ["1rem", "1.5rem"]);
  
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const input = document.querySelector('input[placeholder*="Find"]') as HTMLInputElement;
        input?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <motion.header 
      style={{ width: headerWidth, top: headerTop }}
      className="fixed left-1/2 -translate-x-1/2 z-50 px-4 transition-all duration-300"
    >
      <nav className={cn(
        "container mx-auto h-20 bg-white/70 backdrop-blur-3xl border border-white/40 flex items-center justify-between px-6 md:px-10 transition-all duration-500",
        "rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)]",
        isFocused && "border-blue-200 shadow-[0_20px_60px_rgba(59,130,246,0.12)] bg-white/90"
      )}>
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="h-12 w-12 rounded-[1.25rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200"
            >
              <span className="text-white font-black text-2xl">G</span>
            </motion.div>
            <div className="flex flex-col -gap-1">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 hidden sm:block">
                Grahaak
              </h1>
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hidden sm:block">Store</span>
            </div>
          </Link>
        </div>

        {/* Improved Search Bar */}
        <div className="flex items-center gap-6 flex-1 justify-center max-w-2xl px-4">
          <div className={cn(
            "relative w-full group transition-all duration-500",
            isFocused ? "scale-105" : "scale-100"
          )}>
            <div className={cn(
              "absolute inset-0 bg-blue-500/5 blur-2xl rounded-3xl transition-opacity duration-500",
              isFocused ? "opacity-100" : "opacity-0"
            )} />
            
            <div className="relative flex items-center">
              <Search className={cn(
                "absolute left-5 h-5 w-5 transition-colors duration-300",
                isFocused ? "text-blue-600" : "text-slate-400"
              )} />
              <Input
                placeholder="Find switches, lighting, MCBs..."
                className={cn(
                  "pl-14 pr-14 h-14 bg-slate-100/50 border-none rounded-2xl transition-all duration-300",
                  "text-base font-medium placeholder:text-slate-400",
                  "focus:bg-white focus:ring-4 focus:ring-blue-500/10 shadow-inner",
                  "hover:bg-slate-200/50"
                )}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => onSearch(e.target.value)}
              />
              <div className="absolute right-4 hidden md:flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-slate-100 shadow-sm">
                <Command className="h-3 w-3 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400">K</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href="/admin" 
            className="h-12 w-12 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all active:scale-95 group"
            title="Admin Access"
          >
            <ShieldAlert className="h-6 w-6 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
