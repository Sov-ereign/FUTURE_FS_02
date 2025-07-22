import React, { useState } from 'react';
import { ShoppingCart, User, Search, Menu, Zap, GamepadIcon } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';
import { GlowingButton } from './GlowingButton';

interface HeaderProps {
  onShowCart: () => void;
  onShowLogin: () => void;
  onShowOrders: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onShowCart,
  onShowLogin,
  onShowOrders,
  currentView,
  onViewChange
}) => {
  const { getItemCount } = useCartStore();
  const { user, logout } = useUserStore();
  const itemCount = getItemCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900/95 backdrop-blur-md border-b border-cyan-500/20 sticky top-0 z-50 shadow-lg shadow-cyan-500/10">
      <div className="max-w-7xl mx-auto px-0 sm:px-0 lg:px-0">
        <div className="flex items-center justify-between h-16 relative">
          {/* Website name at far left */}
          <div className="flex items-center pl-0 ml-0">
            <div className="flex items-center">
              <div className="relative">
                <GamepadIcon className="h-8 w-8 text-cyan-400" />
                <div className="absolute inset-0 h-8 w-8 text-cyan-400 animate-pulse opacity-50">
                  <GamepadIcon className="h-8 w-8" />
                </div>
              </div>
              <span className="ml-2 text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                ArcadiaX
              </span>
            </div>
          </div>

          {/* Desktop Home button centered */}
          <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => onViewChange('products')}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300"
            >
              Home
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-cyan-400 hover:bg-cyan-500/10 focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>

          {/* Only cart icon and user/login at right */}
          <div className="flex items-center space-x-4 ml-auto">
            <button
              onClick={onShowCart}
              className="relative p-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:bg-cyan-500/10 rounded-lg group"
            >
              <ShoppingCart className="h-6 w-6 group-hover:animate-bounce" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg shadow-cyan-500/50">
                  {itemCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">
                  <span className="text-cyan-400">Hello,</span> {user.firstName}
                </span>
                <GlowingButton
                  onClick={logout}
                  size="sm"
                  variant="secondary"
                >
                  Logout
                </GlowingButton>
              </div>
            ) : (
              <GlowingButton
                onClick={onShowLogin}
                size="sm"
              >
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </div>
              </GlowingButton>
            )}
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900/95 border-b border-cyan-500/20 shadow-lg z-50 animate-fade-in-down">
              <div className="flex flex-col items-center py-4 space-y-2">
                <button
                  onClick={() => { onViewChange('products'); setMobileMenuOpen(false); }}
                  className="w-11/12 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold shadow-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-300"
                >
                  Home
                </button>
                <button
                  onClick={() => { onShowCart(); setMobileMenuOpen(false); }}
                  className="w-11/12 px-4 py-3 rounded-lg text-cyan-400 hover:bg-cyan-500/10 font-semibold transition-all duration-300"
                >
                  Cart
                </button>
                {user && (
                  <button
                    onClick={() => { onShowOrders(); setMobileMenuOpen(false); }}
                    className="w-11/12 px-4 py-3 rounded-lg text-cyan-400 hover:bg-cyan-500/10 font-semibold transition-all duration-300"
                  >
                    Orders
                  </button>
                )}
                {user ? (
                  <button
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                    className="w-11/12 px-4 py-3 rounded-lg text-pink-400 hover:bg-pink-500/10 font-semibold transition-all duration-300"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => { onShowLogin(); setMobileMenuOpen(false); }}
                    className="w-11/12 px-4 py-3 rounded-lg text-cyan-400 hover:bg-cyan-500/10 font-semibold transition-all duration-300"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};