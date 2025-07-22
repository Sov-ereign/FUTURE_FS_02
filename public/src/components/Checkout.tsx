import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreditCard, Truck, ArrowLeft, CheckCircle } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import { ShippingAddress } from '../types';
import { NeonCard } from './NeonCard';
import { GlowingButton } from './GlowingButton';

interface CheckoutProps {
  onBack: () => void;
  onComplete: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ onBack, onComplete }) => {
  const { items, getTotal, clearCart } = useCartStore();
  const { user, addOrder } = useUserStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const total = getTotal();
  const tax = total * 0.08;
  const shipping = total > 5000 ? 0 : 499;
  const finalTotal = total + tax + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>();

  const onSubmit = async (data: ShippingAddress) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (user) {
      addOrder({
        userId: user.id,
        items,
        total: finalTotal,
        status: 'processing',
        shippingAddress: data
      });
    }

    clearCart();
    setIsProcessing(false);
    setIsCompleted(true);

    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-4">Thank you for your purchase. Your order is being processed.</p>
          <div className="text-lg font-semibold text-gray-900">
            Order Total: ₹{finalTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-cyan-400 hover:text-purple-400 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Cart</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <NeonCard glowColor="cyan" intensity="high" className="p-6">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">Shipping Information</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-1">First Name</label>
                <input
                  {...register('firstName', { required: 'First name is required' })}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-1">Last Name</label>
                <input
                  {...register('lastName', { required: 'Last name is required' })}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-1">Email</label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-1">Address</label>
              <input
                {...register('address', { required: 'Address is required' })}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
              />
              {errors.address && (
                <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-1">City</label>
                <input
                  {...register('city', { required: 'City is required' })}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                />
                {errors.city && (
                  <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-cyan-400 mb-1">ZIP Code</label>
                <input
                  {...register('zipCode', { required: 'ZIP code is required' })}
                  className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                />
                {errors.zipCode && (
                  <p className="text-red-400 text-sm mt-1">{errors.zipCode.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-1">Country</label>
              <select
                {...register('country', { required: 'Country is required' })}
                className="w-full p-3 bg-gray-800/50 border border-cyan-500/20 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-white backdrop-blur-sm transition-all duration-300"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="IN">India</option>
              </select>
              {errors.country && (
                <p className="text-red-400 text-sm mt-1">{errors.country.message}</p>
              )}
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </h3>
              <div className="bg-gray-900/70 border border-cyan-500/20 rounded-lg p-4">
                <p className="text-cyan-200 text-sm">
                  This is a demo checkout. No real payment will be processed.
                  Click "Complete Order" to simulate a successful purchase.
                </p>
              </div>
            </div>

            <GlowingButton
              type="submit"
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Processing...' : `Complete Order - ₹${finalTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
            </GlowingButton>
          </form>
        </NeonCard>

        {/* Order Summary */}
        <NeonCard glowColor="purple" intensity="high" className="p-6 h-fit">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 object-cover rounded shadow-lg"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{item.product.name}</p>
                    <p className="text-xs text-cyan-300">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-cyan-200">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-purple-500/20 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-cyan-300">Subtotal</span>
              <span className="font-medium text-white">₹{total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cyan-300">Tax</span>
              <span className="font-medium text-white">₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-cyan-300">Shipping</span>
              <span className="font-medium text-white">
                {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`}
              </span>
            </div>
            <div className="border-t border-purple-500/20 pt-2">
              <div className="flex justify-between text-lg font-semibold">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Total</span>
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">₹{finalTotal.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-gray-900/70 border border-green-400/30 rounded-lg">
            <div className="flex items-center text-green-300">
              <Truck className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">
                {shipping === 0 ? 'Free shipping on orders over ₹5000' : 'Standard shipping'}
              </span>
            </div>
          </div>
        </NeonCard>
      </div>
    </div>
  );
};