"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products as initialProducts, categories, brands } from "@/data/products";
import { Product } from "@/types/product";
import { Header } from "@/components/layout/Header";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useProductSearch } from "@/hooks/useProductSearch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Building2, Filter, Sparkles, X, ChevronRight, Zap, Lightbulb, Wind, ShieldCheck, Cable } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, any> = {
  "Switches": Zap,
  "Lighting": Lightbulb,
  "Fans": Wind,
  "MCBs": ShieldCheck,
  "Wires": Cable,
  "Sockets": Zap,
};

function HomeContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { query, setQuery, results } = useProductSearch(products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("app_products");
    if (saved) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery, setQuery]);

  const filteredProducts = results.filter((p) => {
    const categoryMatch = !selectedCategory || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const brandMatch = !selectedBrand || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    return categoryMatch && brandMatch;
  });

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand(null);
  };

  return (
    <main className="min-h-screen bg-[#fcfdfe] flex flex-col pt-24">
      <Header onSearch={setQuery} />

      <div className="container mx-auto px-4 md:px-12 py-12 flex-1">
        <div className="flex flex-col gap-16">
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8 py-16"
          >
            <div className="inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200/50 border border-slate-50 text-blue-600">
              <Sparkles className="h-4 w-4" />
              <span>Premium Electrical Catalog</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
              The Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Connected Living</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
              Experience the finest electrical components from global pioneers. 
              Uncompromising safety meets architectural elegance.
            </p>
          </motion.section>

          {/* Improved Filters Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-[100px] -mr-64 -mt-64" />
            
            <div className="p-10 md:p-14 relative z-10 space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-50 pb-10">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 bg-slate-900 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-slate-400/20">
                    <Filter className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Smart Filtering</h3>
                    <p className="text-sm font-medium text-slate-400">Refine the collection by type or brand</p>
                  </div>
                </div>
                
                {(selectedCategory || selectedBrand) && (
                  <Button 
                    variant="ghost" 
                    onClick={resetFilters}
                    className="rounded-2xl h-12 px-6 bg-red-50 text-red-600 hover:bg-red-100 font-bold gap-2 transition-all active:scale-95"
                  >
                    <X className="h-4 w-4" /> Clear All Filters
                  </Button>
                )}
              </div>

              <div className="grid lg:grid-cols-12 gap-12">
                {/* Category Selection */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <LayoutGrid className="h-4 w-4" />
                    <span>Categories</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={cn(
                        "group flex items-center gap-3 px-6 py-4 rounded-[1.5rem] transition-all duration-300 font-bold",
                        selectedCategory === null 
                          ? "bg-slate-900 text-white shadow-xl shadow-slate-400/20 scale-105" 
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      <LayoutGrid className="h-5 w-5" />
                      <span>All Products</span>
                    </button>
                    {categories.filter(Boolean).map((category) => {
                      const Icon = categoryIcons[category] || Zap;
                      const isActive = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={cn(
                            "group flex items-center gap-3 px-6 py-4 rounded-[1.5rem] transition-all duration-300 font-bold border border-transparent",
                            isActive 
                              ? "bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105" 
                              : "bg-white border-slate-100 text-slate-600 shadow-sm hover:border-blue-200 hover:text-blue-600"
                          )}
                        >
                          <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-blue-500")} />
                          <span>{category}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Vertical Divider for desktop */}
                <div className="hidden lg:block lg:col-span-1 h-full w-px bg-slate-100 mx-auto" />

                {/* Brand Selection */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <Building2 className="h-4 w-4" />
                    <span>Brands</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setSelectedBrand(null)}
                      className={cn(
                        "group flex items-center gap-3 px-6 py-4 rounded-[1.5rem] transition-all duration-300 font-bold",
                        selectedBrand === null 
                          ? "bg-slate-900 text-white shadow-xl shadow-slate-400/20 scale-105" 
                          : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                      )}
                    >
                      <Building2 className="h-5 w-5" />
                      <span>All Brands</span>
                    </button>
                    {brands.filter(Boolean).map((brand) => {
                      const isActive = selectedBrand === brand;
                      return (
                        <button
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={cn(
                            "group flex items-center gap-3 px-6 py-4 rounded-[1.5rem] transition-all duration-300 font-bold border border-transparent",
                            isActive 
                              ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 scale-105" 
                              : "bg-white border-slate-100 text-slate-600 shadow-sm hover:border-indigo-200 hover:text-indigo-600"
                          )}
                        >
                          <span>{brand}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product Grid Header */}
          <section className="mt-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                  <ChevronRight className="h-4 w-4" />
                  <span>Verified Catalog</span>
                </div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                  {selectedCategory ? `${selectedCategory}` : "Global Showcase"} 
                  {selectedBrand && <span className="text-blue-600 font-medium ml-2">by {selectedBrand}</span>}
                </h3>
                <p className="text-slate-400 font-medium">Found {filteredProducts.length} items that match your lifestyle</p>
              </div>
            </div>
            
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ProductGrid products={filteredProducts} />
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20 mt-20 rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.03)]">
        <div className="container mx-auto px-4 text-center space-y-10">
          <div className="flex items-center justify-center gap-4">
            <div className="h-14 w-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-200">
              <span className="text-white font-black text-3xl">G</span>
            </div>
            <div className="text-left">
              <span className="font-black text-2xl text-slate-900 tracking-tight block">Grahaak</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Excellence Defined</span>
            </div>
          </div>
          <div className="w-24 h-1 bg-slate-50 mx-auto rounded-full" />
          <div className="space-y-3">
            <p className="text-slate-500 font-medium text-lg">
              © {new Date().getFullYear()} Grahaak Retail.
            </p>
            <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
              Connecting you with the world's finest electrical innovations. 
              Experience the standard of professional craftsmanship.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fcfdfe] flex items-center justify-center pt-24"><div className="h-14 w-14 rounded-[1.5rem] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center animate-pulse"><span className="text-white font-black text-3xl">G</span></div></div>}>
      <HomeContent />
    </Suspense>
  );
}
