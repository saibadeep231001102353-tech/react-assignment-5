import React from 'react';
import { 
  CheckCircle2, 
  X, 
  Receipt, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight,
  Download,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CheckoutModal.css';

/**
 * CheckoutModal Component
 * Displays finalized order summary receipt confirming:
 * - Order ID & Date
 * - Subtotal & Items Purchased
 * - Applied Coupon Code & Discount
 * - 18% GST Breakdown
 * - Grand Total Paid
 */
const CheckoutModal = ({
  isOpen,
  onClose
}) => {
  const {
    cart,
    subtotal,
    discountAmount,
    taxableAmount,
    gstAmount,
    grandTotal,
    appliedCoupon,
    gstRatePercent,
    clearCart
  } = useCart();

  if (!isOpen) return null;

  const orderId = `NX-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleFinish = () => {
    clearCart();
    onClose();
  };

  return (
    <div className="checkout-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="checkout-modal-container card-glass" onClick={(e) => e.stopPropagation()}>
        {/* Header Badge */}
        <div className="checkout-success-banner">
          <div className="success-icon-box">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="success-title">Order Placed Successfully!</h2>
          <p className="success-subtitle">
            Thank you for shopping with NexusCart. Your order receipt is confirmed below.
          </p>
        </div>

        {/* Modal Body / Digital Receipt */}
        <div className="receipt-sheet card-glass-subtle">
          <div className="receipt-meta-header">
            <div className="meta-left">
              <span className="receipt-tag">Order Confirmation</span>
              <strong className="receipt-order-id">#{orderId}</strong>
            </div>
            <span className="receipt-date">{orderDate}</span>
          </div>

          <div className="receipt-divider"></div>

          {/* Items Recap */}
          <div className="receipt-items-list">
            <h4 className="receipt-section-label">Purchased Items ({cart.length})</h4>
            {cart.map((item) => (
              <div key={item.id} className="receipt-item-row">
                <span className="receipt-item-name">
                  {item.quantity}x {item.name}
                </span>
                <span className="receipt-item-price">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="receipt-divider"></div>

          {/* Detailed Tax & Grand Total Breakdown */}
          <div className="receipt-financial-table">
            <div className="receipt-fin-row">
              <span>Gross Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {appliedCoupon && (
              <div className="receipt-fin-row coupon-savings-row">
                <span>Coupon Savings ({appliedCoupon.code} - {appliedCoupon.discountPercent}%)</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="receipt-fin-row">
              <span>Taxable Base</span>
              <span>₹{taxableAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="receipt-fin-row gst-highlight-row">
              <span>Goods & Services Tax (GST {gstRatePercent}%)</span>
              <span>+₹{gstAmount.toLocaleString('en-IN')}</span>
            </div>

            <div className="receipt-fin-row">
              <span>Delivery Charges</span>
              <span className="free-tag">FREE</span>
            </div>

            <div className="receipt-divider bold-divider"></div>

            <div className="receipt-fin-row grand-total-line">
              <span className="total-title">Grand Total Paid</span>
              <span className="total-figure">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="checkout-modal-actions">
          <button
            type="button"
            className="btn btn-primary finish-btn"
            onClick={handleFinish}
            id="finish-order-btn"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
