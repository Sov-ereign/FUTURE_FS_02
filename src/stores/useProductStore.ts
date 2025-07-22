import { create } from 'zustand';
import { Product } from '../types';
import { sampleProducts } from '../data/products';

interface ProductStore {
  products: Product[];
  filteredProducts: Product[];
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating';
  
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sortBy: 'name' | 'price-low' | 'price-high' | 'rating') => void;
  filterProducts: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: sampleProducts,
  filteredProducts: sampleProducts,
  searchQuery: '',
  selectedCategory: 'All Categories',
  priceRange: [0, 6000 * 83],
  sortBy: 'name',

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterProducts();
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().filterProducts();
  },

  setPriceRange: (range) => {
    set({ priceRange: range });
    get().filterProducts();
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
    get().filterProducts();
  },

  filterProducts: () => {
    const { products, searchQuery, selectedCategory, priceRange, sortBy } = get();
    
    let filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All Categories' || 
                            product.category === selectedCategory;
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    set({ filteredProducts: filtered });
  },
}));