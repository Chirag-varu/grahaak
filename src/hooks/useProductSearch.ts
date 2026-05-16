import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Product } from "@/types/product";

export function useProductSearch(products: Product[]) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["name", "category", "description"],
      threshold: 0.3,
      distance: 100,
    });
  }, [products]);

  const results = useMemo(() => {
    if (!query) return products;
    return fuse.search(query).map((result) => result.item);
  }, [fuse, query, products]);

  return {
    query,
    setQuery,
    results,
  };
}
