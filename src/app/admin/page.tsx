"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Lock, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminGate() {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === "132110") {
      // In a real app, we'd set a secure cookie or token.
      // For this monolith demo, we'll use sessionStorage.
      sessionStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden">
        <div className="h-2 bg-blue-600 w-full" />
        <CardHeader className="text-center pt-8 pb-4">
          <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-black text-slate-900">Admin Access</CardTitle>
          <CardDescription>Enter your 6-digit security code to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="password"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="••••••"
                className={`text-center text-3xl tracking-[1em] h-16 font-mono rounded-2xl border-slate-200 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                  error ? "border-red-500 bg-red-50 animate-shake" : ""
                }`}
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-sm font-semibold flex items-center justify-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  Invalid Security Code
                </p>
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 bg-slate-900 hover:bg-black text-white font-bold rounded-2xl text-lg gap-2"
            >
              <ShieldCheck className="h-5 w-5" />
              Verify & Enter
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-slate-50 py-4 flex flex-col gap-1">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Security Protocol 1.0</p>
          <p className="text-[10px] text-slate-400 italic">Restricted access for authorized personnel only</p>
        </CardFooter>
      </Card>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
