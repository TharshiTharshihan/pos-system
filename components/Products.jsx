"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  Star,
  Eye,
  Pencil,
  Package,
  Tag,
  Filter,
} from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "iPhone 16 Pro Max",
    category: "Electronics",
    price: 1199,
    stock: 45,
    rating: 4.8,
    gradient: "from-blue-600 via-indigo-600 to-violet-700",
  },
  {
    id: 2,
    name: "MacBook Air M4",
    category: "Laptops",
    price: 1299,
    stock: 32,
    rating: 4.9,
    gradient: "from-slate-600 via-zinc-600 to-neutral-700",
  },
  {
    id: 3,
    name: "Sony WH-1000XM6",
    category: "Audio",
    price: 349,
    stock: 78,
    rating: 4.7,
    gradient: "from-amber-600 via-orange-600 to-red-600",
  },
  {
    id: 4,
    name: "iPad Pro 13-inch",
    category: "Tablets",
    price: 1099,
    stock: 56,
    rating: 4.6,
    gradient: "from-teal-500 via-cyan-600 to-blue-600",
  },
  {
    id: 5,
    name: "Samsung Galaxy S25",
    category: "Electronics",
    price: 899,
    stock: 120,
    rating: 4.5,
    gradient: "from-purple-600 via-pink-600 to-rose-500",
  },
  {
    id: 6,
    name: "AirPods Pro 3",
    category: "Audio",
    price: 249,
    stock: 200,
    rating: 4.4,
    gradient: "from-emerald-500 via-green-600 to-teal-600",
  },
];

const categories = ["All", "Electronics", "Laptops", "Audio", "Tablets"];

const categoryColors = {
  Electronics: { bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/20" },
  Laptops: { bg: "bg-slate-500/15", text: "text-slate-300", border: "border-slate-500/20" },
  Audio: { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/20" },
  Tablets: { bg: "bg-teal-500/15", text: "text-teal-400", border: "border-teal-500/20" },
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-slate-600"
            }`}
        />
      ))}
      <span className="text-xs text-slate-400 ml-1">{rating}</span>
    </div>
  );
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = mockProducts.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Product Catalog
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {mockProducts.length} total products •{" "}
            {mockProducts.reduce((sum, p) => sum + p.stock, 0)} items in stock
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] transition-all duration-200">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all duration-200"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-slate-500 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${activeCategory === cat
                  ? "bg-gradient-to-r from-violet-500/20 to-purple-500/20 text-violet-400 border border-violet-500/30"
                  : "text-slate-400 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => {
          const catColor = categoryColors[product.category] || categoryColors.Electronics;
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl overflow-hidden group cursor-pointer"
            >
              {/* Product Image Placeholder */}
              <div
                className={`h-44 bg-gradient-to-br ${product.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="w-16 h-16 text-white/20" />
                </div>
                {/* Floating decorative elements */}
                <div className="absolute top-3 right-3 w-20 h-20 rounded-full bg-white/10 blur-xl" />
                <div className="absolute bottom-3 left-3 w-14 h-14 rounded-full bg-white/10 blur-lg" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center gap-3">
                  <button className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:bg-white/30">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-white/30">
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-base font-semibold text-white leading-tight group-hover:text-cyan-300 transition-colors duration-200">
                    {product.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-3 h-3 text-slate-500" />
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold ${catColor.bg} ${catColor.text} border ${catColor.border}`}
                  >
                    {product.category}
                  </span>
                </div>

                <StarRating rating={product.rating} />

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-xl font-bold text-white">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-xs font-medium ${product.stock > 50
                          ? "text-emerald-400"
                          : product.stock > 20
                            ? "text-amber-400"
                            : "text-rose-400"
                        }`}
                    >
                      {product.stock} in stock
                    </p>
                    <div className="w-16 h-1.5 rounded-full bg-white/5 mt-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${product.stock > 50
                            ? "bg-emerald-400"
                            : product.stock > 20
                              ? "bg-amber-400"
                              : "bg-rose-400"
                          }`}
                        style={{
                          width: `${Math.min(
                            (product.stock / 200) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
            <Package className="w-7 h-7 text-slate-500" />
          </div>
          <p className="text-slate-400 font-medium">No products found</p>
          <p className="text-slate-500 text-sm mt-1">
            Try adjusting your search or filter
          </p>
        </motion.div>
      )}
    </div>
  );
}
