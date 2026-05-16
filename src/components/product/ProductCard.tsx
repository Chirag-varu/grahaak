"use client";

import { Product } from "@/types/product";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Link href={`/product/${product.id}`}>
        <Card 
          className="overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 border-none bg-white rounded-[2rem] h-full shadow-lg shadow-slate-200/50 group"
        >
          <div className="aspect-square relative overflow-hidden bg-slate-50">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain p-6 w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Badge className="bg-blue-600 text-white border-none shadow-lg px-3 py-1 rounded-full">
                {product.category}
              </Badge>
              <Badge variant="outline" className="bg-white/90 text-slate-700 backdrop-blur-md border-none shadow-sm px-3 py-1 rounded-full">
                {product.brand}
              </Badge>
            </div>
          </div>
          <CardHeader className="p-6 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {product.brand}
              </span>
            </div>
            <h3 className="font-bold text-xl line-clamp-1 group-hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-slate-400 line-clamp-2 mt-2 leading-relaxed">
              {product.description}
            </p>
          </CardHeader>
          <CardFooter className="p-6 pt-2 flex flex-col gap-4 mt-auto">
            <div className="w-full h-px bg-slate-50" />
            <div className="flex items-center justify-between w-full">
              <p className="text-[10px] font-mono text-slate-300">#{product.id}</p>
              <span className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                Details
                <span className="text-lg">→</span>
              </span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
