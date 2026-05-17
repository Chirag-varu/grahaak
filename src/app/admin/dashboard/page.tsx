"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { brands, categories, products as initialProducts } from "@/data/products";
import { Product } from "@/types/product";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlusCircle,
  Package,
  ArrowLeft,
  CheckCircle2,
  UploadCloud,
  MoreVertical,
  Pencil,
  Trash2,
  ListFilter,
  Eye,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.push("/admin");
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthorized(true);
      const saved = localStorage.getItem("app_products");
      if (saved) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProducts(JSON.parse(saved));
      } else {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProducts(initialProducts);
      }
    }
  }, [router]);

  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("app_products", JSON.stringify(newProducts));
  };

  const handleAddOrUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const productData: Product = {
      id: (formData.get("id") as string) || (editingProduct?.id as string),
      name: formData.get("name") as string,
      brand: formData.get("brand") as string,
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      image: formData.get("image") as string,
      specs: (formData.get("specs") as string).split(",").map(s => s.trim()),
    };

    if (editingProduct) {
      const updated = products.map(p => p.id === editingProduct.id ? productData : p);
      saveProducts(updated);
      setSuccess("Product updated successfully!");
      setEditingProduct(null);
    } else {
      if (products.some(p => p.id === productData.id)) {
        alert("Product ID already exists!");
        return;
      }
      saveProducts([productData, ...products]);
      setSuccess("Product added successfully!");
    }

    e.currentTarget.reset();
    setTimeout(() => setSuccess(null), 3000);
  };

  const deleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const filtered = products.filter(p => p.id !== id);
      saveProducts(filtered);
      setSuccess("Product deleted successfully!");
      setTimeout(() => setSuccess(null), 3000);
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex flex-col font-sans">
      {/* Admin Nav */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-100 px-4 md:px-12 h-16 md:h-24 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3 md:gap-6">
          <Link href="/" className="h-10 w-10 md:h-12 md:w-12 flex items-center justify-center bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all active:scale-95">
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 text-slate-500" />
          </Link>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg shadow-slate-200">
              <span className="text-white font-black text-sm md:text-lg">G</span>
            </div>
            <h1 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight">Admin</h1>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex flex-col items-end mr-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Session</p>
            <p className="text-sm font-black text-slate-900">Administrator</p>
          </div>
          <Button variant="outline" onClick={() => {
            sessionStorage.removeItem("admin_auth");
            router.push("/admin");
          }} className="rounded-2xl border-slate-200 h-10 px-4 md:h-12 md:px-6 hover:bg-slate-50 transition-all font-bold text-sm">
            Logout
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 md:px-12 py-8 md:py-12 flex-1 max-w-7xl">
        <Tabs defaultValue="list" className="space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <TabsList className="bg-white p-2 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 h-16">
              <TabsTrigger value="list" className="rounded-[1.5rem] px-8 data-[state=active]:bg-slate-900 data-[state=active]:text-white h-full transition-all">
                <Package className="h-4 w-4 mr-2" />
                Inventory
              </TabsTrigger>
              <TabsTrigger value="form" className="rounded-[1.5rem] px-8 data-[state=active]:bg-slate-900 data-[state=active]:text-white h-full transition-all">
                <PlusCircle className="h-4 w-4 mr-2" />
                {editingProduct ? "Edit Item" : "New Item"}
              </TabsTrigger>
            </TabsList>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex gap-4 w-full md:w-auto"
            >
              <Card className="border-none shadow-xl shadow-slate-200/40 rounded-3xl py-3 px-8 flex items-center gap-4 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -mr-12 -mt-12" />
                <Package className="h-6 w-6 text-blue-600 relative z-10" />
                <div className="relative z-10">
                  <p className="text-2xl font-black text-slate-900 leading-none">{products.length}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Total SKU</p>
                </div>
              </Card>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent value="list" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[3rem] overflow-hidden bg-white">
                  <CardHeader className="bg-white border-b border-slate-50 p-6 md:p-10">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <CardTitle className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Product Inventory</CardTitle>
                        <CardDescription className="text-sm md:text-lg font-medium text-slate-400">Manage your catalog, edit details, or remove items.</CardDescription>
                      </div>
                      <div className="hidden md:flex h-12 w-12 bg-slate-50 rounded-2xl items-center justify-center text-slate-400">
                        <ListFilter className="h-6 w-6" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-slate-50/30 h-20">
                        <TableRow className="border-none">
                          <TableHead className="w-[100px] px-10 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Preview</TableHead>
                          <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Product Info</TableHead>
                          <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Brand</TableHead>
                          <TableHead className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Category</TableHead>
                          <TableHead className="text-right px-10 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products.map((product, index) => (
                          <TableRow key={product.id || `product-${index}`} className="hover:bg-slate-50/50 transition-colors h-24 border-slate-50">
                            <TableCell className="px-10">
                              <div className="h-16 w-16 rounded-[1.25rem] bg-slate-50 overflow-hidden border border-slate-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={product.image} alt="" className="object-contain h-full w-full" />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                <span className="font-bold text-lg text-slate-900">{product.name}</span>
                                <span className="text-xs font-mono font-bold text-blue-500 bg-blue-50 w-fit px-2 py-0.5 rounded-lg">{product.id}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-white text-slate-700 border border-slate-100 shadow-sm rounded-full px-4 py-1 font-bold">
                                {product.brand}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
                            </TableCell>
                            <TableCell className="text-right px-10">
                              <DropdownMenu>
                                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-12 w-12 rounded-[1.25rem] bg-slate-50 hover:bg-slate-100 transition-all")}>
                                  <MoreVertical className="h-5 w-5 text-slate-500" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 rounded-[1.5rem] p-2 shadow-2xl border-slate-100/50">
                                  <DropdownMenuItem
                                    onClick={() => router.push(`/product/${product.id}`)}
                                    className="gap-3 cursor-pointer h-12 rounded-xl focus:bg-slate-50"
                                  >
                                    <div className="h-8 w-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                                      <Eye className="h-4 w-4" />
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm">View Details</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setEditingProduct(product);
                                      // Note: In real app use state for tabs, here we just show how to populate
                                    }}
                                    className="gap-3 cursor-pointer h-12 rounded-xl focus:bg-slate-50"
                                  >
                                    <div className="h-8 w-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600">
                                      <Pencil className="h-4 w-4" />
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm">Edit Product</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => deleteProduct(product.id)}
                                    className="gap-3 text-red-600 focus:text-red-600 cursor-pointer h-12 rounded-xl focus:bg-red-50"
                                  >
                                    <div className="h-8 w-8 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                                      <Trash2 className="h-4 w-4" />
                                    </div>
                                    <span className="font-bold text-sm">Delete Forever</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="form" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[3rem] overflow-hidden bg-white">
                  <CardHeader className={`${editingProduct ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-slate-900'} text-white p-8 md:p-14 transition-colors relative`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                      <div className="space-y-2">
                        <CardTitle className="text-2xl md:text-4xl font-black flex items-center gap-4 tracking-tight">
                          {editingProduct ? <Pencil className="h-10 w-10 p-2 bg-white/20 rounded-2xl" /> : <PlusCircle className="h-10 w-10 p-2 bg-white/20 rounded-2xl" />}
                          {editingProduct ? `Modify: ${editingProduct.name}` : "Create New Item"}
                        </CardTitle>
                        <CardDescription className="text-white/60 text-lg font-medium">Enter product details to update your catalog.</CardDescription>
                      </div>
                      {editingProduct && (
                        <Button
                          variant="ghost"
                          className="text-white bg-white/10 hover:bg-white/20 rounded-2xl h-12 px-6 font-bold"
                          onClick={() => setEditingProduct(null)}
                        >
                          Cancel Editing
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-10 md:p-14">
                    <form onSubmit={handleAddOrUpdate} className="space-y-10">
                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Full Name</label>
                          <Input name="name" defaultValue={editingProduct?.name} placeholder="e.g.  Modular Switch" className="rounded-2xl h-14 border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-lg font-medium px-6" required />
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Reference SKU (ID)</label>
                          <Input name="id" defaultValue={editingProduct?.id} disabled={!!editingProduct} placeholder="e.g. GRA-SW-01" className="rounded-2xl h-14 border-slate-100 bg-slate-50/50 focus:bg-white transition-all font-mono text-lg px-6" required />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Manufacturer (Brand)</label>
                          <Select name="brand" defaultValue={editingProduct?.brand.toLowerCase()}>
                            <SelectTrigger className="rounded-2xl h-14 border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-lg px-6 font-medium">
                              <SelectValue placeholder="Select Brand" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl shadow-2xl border-slate-100 p-2">
                              {brands.map(brand => (
                                <SelectItem key={brand} value={brand.toLowerCase()} className="rounded-xl h-10">{brand}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-3">
                          <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Product Category</label>
                          <Select name="category" defaultValue={editingProduct?.category.toLowerCase()}>
                            <SelectTrigger className="rounded-2xl h-14 border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-lg px-6 font-medium">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl shadow-2xl border-slate-100 p-2">
                              {categories.map(cat => (
                                <SelectItem key={cat} value={cat.toLowerCase()} className="rounded-xl h-10">{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Product Description</label>
                        <Textarea name="description" defaultValue={editingProduct?.description} placeholder="Provide a compelling description of the item..." className="rounded-3xl min-h-[160px] border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-lg px-6 py-4 font-medium" required />
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Key Specifications <span className="text-[10px] text-slate-400">(Comma Separated)</span></label>
                        <Input name="specs" defaultValue={editingProduct?.specs.join(", ")} placeholder="6A, 240V, Glossy Finish, 10-Year Warranty..." className="rounded-2xl h-14 border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-lg px-6 font-medium" required />
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-black text-slate-900 uppercase tracking-widest ml-1">Visual Asset URL</label>
                        <div className="relative">
                          <Input name="image" defaultValue={editingProduct?.image} placeholder="https://..." className="rounded-2xl h-14 pl-14 border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-lg px-6 font-medium" required />
                          <UploadCloud className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
                        </div>
                      </div>

                      <div className="pt-6">
                        <Button
                          type="submit"
                          className={`w-full md:w-auto px-12 h-16 ${editingProduct ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-900 hover:bg-black'} text-white font-black rounded-3xl text-xl transition-all active:scale-95 shadow-2xl shadow-blue-200/50 flex items-center gap-3`}
                        >
                          {editingProduct ? <CheckCircle2 className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
                          {editingProduct ? "Update Catalog Item" : "Publish to Catalog"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[100]"
          >
            <div className="bg-slate-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center gap-4 border border-white/10 backdrop-blur-xl">
              <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-black text-lg tracking-tight">Operation Successful</p>
                <p className="text-slate-400 text-sm font-medium">{success}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
