import React from 'react';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Sun, 
  Moon, 
  Sparkles, 
  Tag, 
  GraduationCap 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

/**
 * Header Component
 * Displays brand logo, live cart badge counter with animation, theme toggle,
 * and quick trigger to open the CartDrawer.
 */
const Header = ({
  theme,
  onToggleTheme,
  onOpenCart
}) => {
  const { totalItems, grandTotal } = useCart();

  return (
    <header className="nexus-header">
      <div className="container header-container">
        {/* Brand Group */}
        <div className="brand-group">
          <div className="brand-icon-box">
            <ShoppingBag size={24} className="brand-bag-icon" />
          </div>
          <div className="brand-text">
            <div className="brand-name-row">
              <span className="brand-name">NexusCart</span>
              <span className="brand-badge">PRO STORE</span>
            </div>
            <span className="brand-tagline">Online Shopping Cart • useReducer & Context API</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Assignment Attribution Chip */}
          <div className="assignment-chip">
            <span className="pulse-dot"></span>
            <span>React Assignment 5: useReducer & Context API</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            className="action-btn theme-btn"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme mode"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart Trigger Button with Live Counter */}
          <button
            type="button"
            className="cart-trigger-btn"
            onClick={onOpenCart}
            id="open-cart-drawer-btn"
            aria-label={`View cart with ${totalItems} items`}
          >
            <div className="cart-icon-wrapper">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="cart-badge-count animate-bounce" id="header-cart-count">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="cart-btn-info">
              <span className="cart-btn-label">My Cart</span>
              <span className="cart-btn-total">
                {totalItems > 0 ? `₹${grandTotal.toLocaleString('en-IN')}` : 'Empty'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
