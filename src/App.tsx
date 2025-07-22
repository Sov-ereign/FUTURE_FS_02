import React, { useState } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Header } from './components/Header';
import { ProductFilters } from './components/ProductFilters';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { LoginModal } from './components/LoginModal';
import { OrderHistory } from './components/OrderHistory';
import { useUserStore } from './stores/useUserStore';
import { NeonCard } from './components/NeonCard';

type View = 'products' | 'cart' | 'checkout' | 'orders';

function App() {
  const [currentView, setCurrentView] = useState<View>('products');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCart, setShowCart] = useState(false); // new state for cart modal
  const { user } = useUserStore();

  const handleShowCart = () => setShowCart(true); // open cart modal
  const handleCloseCart = () => setShowCart(false); // close cart modal
  const handleShowLogin = () => setShowLoginModal(true);
  const handleCloseLogin = () => setShowLoginModal(false);
  const handleCheckout = () => {
    setShowCart(false);
    setCurrentView('checkout');
  };
  const handleBackToCart = () => setShowCart(true);
  const handleOrderComplete = () => setCurrentView('products');
  const handleShowOrders = () => setCurrentView('orders');
  const handleBackFromOrders = () => setCurrentView('products');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'checkout':
        return (
          <Checkout
            onBack={handleBackToCart}
            onComplete={handleOrderComplete}
          />
        );
      case 'orders':
        return <OrderHistory onBack={handleBackFromOrders} />;
      case 'products':
      default:
        return (
          <div className="w-full p-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <main className="lg:col-span-3">
                <div className="mb-6">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    Gaming Arsenal
                  </h1>
                  <p className="text-gray-400 mt-2 text-lg">
                    Discover our amazing collection of products
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <ProductList />
                </div>
              </main>
              <aside className="lg:col-span-1 pl-0 ml-0">
                <ProductFilters />
              </aside>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleBackground />
      
      <Header
        onShowCart={handleShowCart}
        onShowLogin={handleShowLogin}
        onShowOrders={handleShowOrders}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <div className="relative z-10">
        {renderCurrentView()}
      </div>

      {/* Cart Modal Popup */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" onClick={handleCloseCart} />
          <div className="relative w-full max-w-3xl mx-4">
            <button
              onClick={handleCloseCart}
              className="absolute top-4 right-4 p-2 hover:bg-cyan-500/10 rounded-full transition-colors text-cyan-400 z-10"
            >
              <span className="sr-only">Close</span>
              &#10005;
            </button>
            <Cart onCheckout={handleCheckout} />
          </div>
        </div>
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseLogin}
      />
    </div>
  );
}

export default App;