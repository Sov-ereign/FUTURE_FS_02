import React, { useState } from 'react';
import { ShoppingCart, Star, Plus, Check, Zap, Flame } from 'lucide-react';
import { Product } from '../types';
import { useCartStore } from '../stores/useCartStore';
import { NeonCard } from './NeonCard';
import { GlowingButton } from './GlowingButton';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <NeonCard className="group hover:scale-105 transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.stock < 10 && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-lg shadow-red-500/50 animate-pulse flex items-center space-x-1">
            <Flame className="h-3 w-3" />
            <span>Low Stock</span>
          </span>
        )}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
            isAdded
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50'
              : 'bg-gray-800/80 backdrop-blur-sm text-cyan-400 hover:bg-cyan-500 hover:text-white shadow-lg hover:shadow-cyan-500/50'
          } ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 transition-colors duration-300 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current drop-shadow-sm'
                    : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-400">
            ({product.rating})
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            ₹{product.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
          <span className="text-sm text-gray-400 flex items-center space-x-1">
            <Zap className="h-3 w-3 text-green-400" />
            <span>
            {product.stock} in stock
            </span>
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-800/50 text-cyan-400 px-2 py-1 rounded-full border border-cyan-500/20 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <GlowingButton
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          variant={product.stock === 0 ? 'danger' : isAdded ? 'secondary' : 'primary'}
          className="w-full"
        >
          <div className="flex items-center justify-center space-x-2">
            {isAdded ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added to Cart</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
              </>
            )}
          </div>
        </GlowingButton>
      </div>
    </NeonCard>
  );
};