import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import { 
  ShoppingCart, 
  CheckCircle2, 
  X, 
  Sparkles,
  Zap
} from 'lucide-react';
import './App.css';

/**
 * Main Content Consumer Component
 * Consumes CartContext to coordinate drawer, modal, and notifications.
 */
function MainShopContent({
  theme,
  onToggleTheme
}) {
  const { totalItems, grandTotal } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 3500);
  };

  return (
    <div className="nexus-app-container">
      {/* Ambient background glows */}
      <div className="ambient-glow glow-top-left"></div>
      <div className="ambient-glow glow-bottom-right"></div>

      {/* Header Navigation */}
      <Header
        theme={theme}
        onToggleTheme={onToggleTheme}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Hero Welcome Banner */}
      <section className="shop-hero-banner">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} className="sparkle-icon" />
              <span>Next-Gen Audio & Computing Hardware</span>
            </div>
            <h1 className="hero-headline">
              Elevate Your Workspace with <span className="gradient-text">NexusCart</span>
            </h1>
            <p className="hero-subline">
              Explore studio headphones, mechanical keyboards, OLED smartwatches, and smart home gear.
              Complete with real-time cart state, coupon code discounts, and automated 18% GST calculation.
            </p>
          </div>

          <div className="hero-stat-card card-glass">
            <div className="hero-stat-item">
              <span className="hero-stat-val">100%</span>
              <span className="hero-stat-lbl">Authentic Hardware</span>
            </div>
            <div className="stat-separator"></div>
            <div className="hero-stat-item">
              <span className="hero-stat-val">18%</span>
              <span className="hero-stat-lbl">Statutory GST Rate</span>
            </div>
            <div className="stat-separator"></div>
            <div className="hero-stat-item">
              <span className="hero-stat-val">25%</span>
              <span className="hero-stat-lbl">BCASTUDENT Code</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Catalog */}
      <main className="main-content">
        <ProductList onShowToast={showToast} />
      </main>

      {/* Footer with Student Attribution */}
      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Confirmation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Floating Cart Button */}
      {totalItems > 0 && !isCartOpen && (
        <button
          type="button"
          className="floating-cart-btn"
          onClick={() => setIsCartOpen(true)}
          title="Open Cart Drawer"
          aria-label="Open Cart Drawer"
        >
          <ShoppingCart size={22} />
          <span className="floating-badge">{totalItems}</span>
          <span className="floating-total">₹{grandTotal.toLocaleString('en-IN')}</span>
        </button>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <aside className="toast-notification" role="status" aria-live="polite">
          <CheckCircle2 size={18} className="toast-check-icon" />
          <span>{toastMessage}</span>
          <button
            type="button"
            className="toast-dismiss-btn"
            onClick={() => setToastMessage(null)}
            aria-label="Dismiss toast"
          >
            <X size={15} />
          </button>
        </aside>
      )}
    </div>
  );
}

/**
 * Root App Component
 * Wraps entire application with CartProvider (Context API & useReducer)
 */
function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('nexus_theme_pref') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nexus_theme_pref', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <CartProvider>
      <MainShopContent
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    </CartProvider>
  );
}

export default App;
