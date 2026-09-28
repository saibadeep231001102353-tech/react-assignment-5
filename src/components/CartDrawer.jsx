import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  Check, 
  AlertCircle, 
  Receipt, 
  ArrowRight,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { VALID_COUPONS } from '../data/products';
import './CartDrawer.css';

/**
 * CartDrawer Component
 * Requirements strictly fulfilled:
 * - Remove Item (via removeFromCart)
 * - Quantity Update (via updateQuantity + / -)
 * - Coupon Code facility (percentage reduction applied to cart)
 * - GST Calculation (18% Goods & Services Tax)
 * - Grand Total (Subtotal - Discount + GST)
 */
const CartDrawer = ({
  isOpen,
  onClose,
  onOpenCheckout
}) => {
  const {
    cart,
    totalItems,
    subtotal,
    discountAmount,
    taxableAmount,
    gstAmount,
    grandTotal,
    gstRatePercent,
    appliedCoupon,
    couponError,
    couponSuccess,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleQuickCouponClick = (code) => {
    applyCoupon(code);
  };

  return (
    <div className="cart-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="cart-drawer-panel card-glass" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={20} className="title-bag-icon" />
            <h2 className="drawer-title">Shopping Cart</h2>
            <span className="drawer-items-chip">{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</span>
          </div>

          <div className="drawer-header-actions">
            {cart.length > 0 && (
              <button
                type="button"
                className="clear-cart-text-btn"
                onClick={clearCart}
                title="Empty all items from cart"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              className="drawer-close-btn"
              onClick={onClose}
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            /* Empty Cart View */
            <div className="empty-cart-state">
              <div className="empty-cart-icon-box">
                <ShoppingBag size={48} />
              </div>
              <h3 className="empty-cart-title">Your Cart is Empty</h3>
              <p className="empty-cart-text">
                Explore our catalog of premium headphones, smartwatches, keyboards, and accessories.
              </p>
              <button
                type="button"
                className="btn btn-primary start-shopping-btn"
                onClick={onClose}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row card-glass-subtle">
                    {/* Item Info */}
                    <div className="cart-item-info">
                      <h4 className="cart-item-title">{item.name}</h4>
                      <div className="cart-item-meta">
                        <span className="cart-item-category">{item.category}</span>
                        <span className="unit-price-tag">₹{item.price.toLocaleString('en-IN')} each</span>
                      </div>
                    </div>

                    {/* Quantity Controls & Line Price */}
                    <div className="cart-item-controls-row">
                      {/* Quantity Modifier */}
                      <div className="quantity-stepper-box">
                        <button
                          type="button"
                          className="qty-btn qty-decrease"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          title="Decrease quantity"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>

                        <span className="qty-value-display" id={`qty-val-${item.id}`}>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          className="qty-btn qty-increase"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= (item.stock || 99)}
                          title="Increase quantity"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="line-item-total">
                        <span className="line-total-price">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item from cart"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section (Requirement) */}
              <div className="coupon-card-section card-glass-subtle">
                <div className="coupon-header-row">
                  <div className="coupon-title-group">
                    <Tag size={16} className="tag-icon" />
                    <span className="coupon-section-title">Apply Promotional Coupon</span>
                  </div>
                </div>

                {appliedCoupon ? (
                  /* Applied Coupon Banner */
                  <div className="applied-coupon-banner">
                    <div className="applied-badge">
                      <Sparkles size={14} />
                      <strong>{appliedCoupon.code}</strong>
                      <span className="applied-pct">({appliedCoupon.discountPercent}% OFF)</span>
                    </div>
                    <button
                      type="button"
                      className="remove-coupon-btn"
                      onClick={removeCoupon}
                      title="Remove coupon discount"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  /* Coupon Input Form */
                  <form onSubmit={handleApplyCoupon} className="coupon-input-form">
                    <input
                      type="text"
                      className="coupon-input"
                      placeholder="Enter code (e.g. BCASTUDENT, WELCOME10)..."
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      id="coupon-code-input"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary coupon-submit-btn"
                      disabled={!couponInput.trim()}
                      id="apply-coupon-btn"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Coupon Feedback Messages */}
                {couponSuccess && (
                  <div className="coupon-status-msg success">
                    <Check size={14} />
                    <span>{couponSuccess}</span>
                  </div>
                )}
                {couponError && (
                  <div className="coupon-status-msg error">
                    <AlertCircle size={14} />
                    <span>{couponError}</span>
                  </div>
                )}

                {/* Quick Preset Coupons */}
                {!appliedCoupon && (
                  <div className="quick-coupons-box">
                    <span className="quick-coupon-label">Available Codes:</span>
                    <div className="coupon-pills-row">
                      <button
                        type="button"
                        className="quick-coupon-pill"
                        onClick={() => handleQuickCouponClick('BCASTUDENT')}
                      >
                        <strong>BCASTUDENT</strong> (25% OFF)
                      </button>
                      <button
                        type="button"
                        className="quick-coupon-pill"
                        onClick={() => handleQuickCouponClick('WELCOME10')}
                      >
                        <strong>WELCOME10</strong> (10% OFF)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Financial Breakdown (GST & Grand Total) */}
              <div className="order-summary-section card-glass-subtle">
                <div className="summary-title-row">
                  <Receipt size={16} className="receipt-icon" />
                  <span className="summary-title">Billing & Tax Breakdown</span>
                </div>

                <div className="summary-table">
                  {/* Subtotal */}
                  <div className="summary-row">
                    <span className="summary-label">Items Subtotal</span>
                    <span className="summary-value" id="cart-subtotal-val">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Coupon Discount */}
                  {appliedCoupon && (
                    <div className="summary-row discount-row">
                      <span className="summary-label">
                        Coupon Discount ({appliedCoupon.discountPercent}%)
                      </span>
                      <span className="summary-value discount-val" id="cart-discount-val">
                        -₹{discountAmount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  {/* Taxable Base */}
                  <div className="summary-row">
                    <span className="summary-label">Taxable Amount</span>
                    <span className="summary-value">₹{taxableAmount.toLocaleString('en-IN')}</span>
                  </div>

                  {/* GST Calculation (Requirement) */}
                  <div className="summary-row gst-row">
                    <span className="summary-label">
                      Goods & Services Tax (GST {gstRatePercent}%)
                    </span>
                    <span className="summary-value gst-val" id="cart-gst-val">
                      +₹{gstAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="summary-row">
                    <span className="summary-label">Standard Shipping</span>
                    <span className="summary-value free-shipping">FREE</span>
                  </div>

                  {/* Divider */}
                  <div className="summary-divider"></div>

                  {/* Grand Total (Requirement) */}
                  <div className="summary-row grand-total-row">
                    <div className="grand-total-label-box">
                      <span className="grand-total-label">Grand Total</span>
                      <span className="grand-total-sublabel">Inclusive of all taxes & GST</span>
                    </div>
                    <span className="grand-total-value" id="cart-grand-total-val">
                      ₹{grandTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer Actions */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="footer-total-preview">
              <span className="total-lead">Grand Total:</span>
              <span className="total-amount">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              type="button"
              className="btn btn-primary checkout-btn"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              id="proceed-checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
