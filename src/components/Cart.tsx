import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Zap } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { NeonCard } from './NeonCard';
import { GlowingButton } from './GlowingButton';

interface CartProps {
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ onCheckout }) => {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 relative z-10">
        <NeonCard className="p-8 text-center" glowColor="purple">
          <div className="relative">
            <ShoppingBag className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShoppingBag className="h-16 w-16 text-purple-400 animate-pulse opacity-50" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-4">Add some products to get started!</p>
        </NeonCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 relative z-10">
      <NeonCard glowColor="cyan" intensity="high">
        <div className="p-6 border-b border-cyan-500/20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent flex items-center space-x-2">
              <Zap className="h-6 w-6 text-cyan-400" />
              <span>Shopping Cart</span>
            </h2>
            <GlowingButton
              onClick={clearCart}
              variant="danger"
              size="sm"
            >
              Clear Cart
            </GlowingButton>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center space-x-4 p-4 bg-gray-800/30 border border-cyan-500/20 rounded-lg backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg shadow-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-white">{item.product.name}</h3>
                  <p className="text-sm text-gray-400">{item.product.category}</p>
                  <p className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    ₹{item.product.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-2 rounded-full bg-gray-700/50 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-white bg-gray-800/50 rounded px-2 py-1">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-2 rounded-full bg-gray-700/50 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-cyan-500/20">
            <div className="flex items-center justify-between text-xl font-semibold text-white mb-4">
              <span>Total:</span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-2xl">
                ₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </span>
            </div>
            <GlowingButton
              onClick={onCheckout}
              className="w-full"
              size="lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Proceed to Checkout</span>
              </div>
            </GlowingButton>
          </div>
        </div>
      </NeonCard>
    </div>
  );
};