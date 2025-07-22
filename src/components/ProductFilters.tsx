import React from 'react';
import { Search, Filter, Sliders } from 'lucide-react';
import { useProductStore } from '../stores/useProductStore';
import { categories } from '../data/products';
import { NeonCard } from './NeonCard';

export const ProductFilters: React.FC = () => {
  const {
    searchQuery,
    selectedCategory,
    priceRange,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setSortBy
  } = useProductStore();

  return (
    <NeonCard className="p-6 space-y-6" glowColor="purple">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Sliders className="h-5 w-5 text-purple-400" />
          <div className="absolute inset-0 h-5 w-5 text-purple-400 animate-pulse opacity-50">
            <Sliders className="h-5 w-5" />
          </div>
        </div>
        <h3 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Filters
        </h3>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-lg pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-cyan-400 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white backdrop-blur-sm transition-all duration-300"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-cyan-400 mb-2">
          <span className="flex items-center justify-between">
            <span>Price Range</span>
            <span className="text-purple-400 font-bold">
              ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}
            </span>
          </span>
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-cyan-400 mb-2">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white backdrop-blur-sm transition-all duration-300"
        >
          <option value="name">Name</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </NeonCard>
  );
};