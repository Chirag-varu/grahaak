"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { products as initialProducts } from "@/data/products";
import { Product } from "@/types/product";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, CheckCircle2, ChevronLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const saved = localStorage.getItem("app_products");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <div className="h-20 w-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">?</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">Item not found</h1>
          <p className="text-slate-400 font-medium">This product might have been removed or relocated.</p>
          <Button onClick={() => router.push("/")} className="mt-8 rounded-2xl h-12 px-8 font-bold shadow-lg">
            Back to Catalog
          </Button>
        </div>
      </div>
    );
  }

  const handleContact = () => {
    const phoneNumber = "+919004047858";
    const message = encodeURIComponent(
      `Hello! I'm interested in the product: ${product.name} (ID: ${product.id}). Could you please share the price and availability?`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#fcfdfe]">
      <Header onSearch={(q) => router.push(`/?q=${q}`)} />

      <div className="container mx-auto px-4 md:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-10 h-12 px-6 gap-3 text-slate-400 hover:text-slate-900 rounded-2xl hover:bg-slate-100/50 font-bold transition-all group"
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Return to Catalog
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.05)] border border-slate-50 relative"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-50" />

          <div className="grid lg:grid-cols-2 relative z-10">
            <div className="aspect-square bg-slate-50/50 relative p-12 md:p-20 flex items-center justify-center border-r border-slate-50">
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                src={product.image}
                alt={product.name}
                className="object-contain w-full h-full max-h-[600px] drop-shadow-2xl"
              />
              <div className="absolute top-10 left-10 flex flex-col gap-3">
                <Badge className="bg-blue-600 px-5 py-2 text-sm font-black rounded-full shadow-lg shadow-blue-200">
                  {product.category}
                </Badge>
                <Badge variant="outline" className="bg-white px-5 py-2 text-sm font-black rounded-full border-none shadow-sm text-slate-700">
                  {product.brand}
                </Badge>
              </div>
            </div>

            <div className="p-10 md:p-20 flex flex-col justify-between bg-white/50 backdrop-blur-sm">
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] bg-blue-50 w-fit px-4 py-1.5 rounded-full">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Featured Item</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight capitalize">
                    {product.name}
                  </h1>
                  <p className="text-sm font-mono font-black text-slate-300 tracking-widest">ID: {product.id}</p>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Description</h4>
                    <p className="text-slate-500 text-xl leading-relaxed font-medium">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Technical Specs</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {product.specs.map((spec, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center gap-4 p-5 rounded-3xl bg-slate-50/80 border border-slate-100 shadow-sm"
                        >
                          <div className="h-8 w-8 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-100">
                            <CheckCircle2 className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-base font-bold text-slate-700">{spec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-12 border-t border-slate-100">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleContact}
                    className="w-full md:w-auto px-12 bg-green-600 hover:bg-green-700 text-white font-black h-20 rounded-[2rem] gap-4 text-xl shadow-2xl shadow-green-200 transition-all flex items-center justify-center"
                  >
                    <MessageCircle className="h-8 w-8" />
                    Contact for Pricing
                  </Button>
                </motion.div>
                <div className="text-sm text-slate-400 mt-6 font-medium italic flex items-center gap-2">
                  <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                  Available for immediate inquiry via WhatsApp.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-16 mt-20 rounded-t-[3rem] shadow-2xl shadow-slate-200">
        <div className="container mx-auto px-4 text-center space-y-8">
          <div className="flex items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-[1.25rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <span className="text-white font-black text-2xl">G</span>
            </div>
            <span className="font-black text-2xl text-slate-900 tracking-tight">Grahaak</span>
          </div>
          <div className="w-16 h-1 bg-blue-100 mx-auto rounded-full" />
          <p className="text-slate-500 font-medium">
            © {new Date().getFullYear()} Grahaak Retail.  Quality Guaranteed.
          </p>
        </div>
      </footer>
    </main>
  );
}
