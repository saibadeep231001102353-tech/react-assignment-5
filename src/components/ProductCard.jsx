import React, { useState } from 'react';
import { 
  Headphones, 
  Watch, 
  Keyboard, 
  Laptop, 
  Volume2, 
  Gamepad2, 
  Monitor, 
  Lightbulb, 
  Activity, 
  Star, 
  ShoppingCart, 
  Check, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

/**
 * ProductCard Component
 * Displays individual product with technical specs, stock, rating, and Add to Cart action.
 * Strictly adheres to rule: No personal photos; uses stylized aesthetic product iconography.
 */
const ProductCard = ({ product, onShowToast }) => {
  const { addToCart, cart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Check if item is already in cart
  const cartItem = cart.find((item) => item.id === product.id);
  const currentQuantityInCart = cartItem ? cartItem.quantity : 0;

  // Icon mapping for products
  const renderProductIcon = (type) => {
    const iconProps = { size: 48, className: 'product-symbol-icon' };
    switch (type) {
      case 'headphones': return <Headphones {...iconProps} />;
      case 'watch': return <Watch {...iconProps} />;
      case 'keyboard': return <Keyboard {...iconProps} />;
      case 'laptop': return <Laptop {...iconProps} />;
      case 'speaker': return <Volume2 {...iconProps} />;
      case 'gamepad': return <Gamepad2 {...iconProps} />;
      case 'monitor': return <Monitor {...iconProps} />;
      case 'lightbulb': return <Lightbulb {...iconProps} />;
      case 'earbuds': return <Headphones {...iconProps} />;
      case 'activity': return <Activity {...iconProps} />;
      default: return <Sparkles {...iconProps} />;
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, 1);
    if (onShowToast) {
      onShowToast(`Added "${product.name}" to your cart!`);
    }
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="product-card card-glass" id={`product-card-${product.id}`}>
      {/* Top Card Header with Badge */}
      <div className="product-card-top">
        <span className="product-category-chip">{product.category}</span>
        {product.badge && (
          <span className="product-promo-badge">
            <Zap size={11} />
            <span>{product.badge}</span>
          </span>
        )}
      </div>

      {/* Stylized Product Icon Visual (No human photo) */}
      <div className="product-visual-stage" style={{ '--accent-glow': product.colorTheme }}>
        <div className="visual-icon-glow">
          {renderProductIcon(product.iconType)}
        </div>
        <span className="discount-tag-pill">-{discountPercent}%</span>
      </div>

      {/* Product Content Details */}
      <div className="product-details-body">
        {/* Rating and Reviews */}
        <div className="product-rating-row">
          <div className="rating-stars">
            <Star size={14} className="star-filled" />
            <span className="rating-value">{product.rating}</span>
          </div>
          <span className="reviews-count">({product.reviewsCount} reviews)</span>
          <span className="stock-tag">{product.stock} in stock</span>
        </div>

        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>

        <p className="product-description">{product.description}</p>

        {/* Price & Action Row */}
        <div className="product-action-row">
          <div className="price-group">
            <div className="price-main-row">
              <span className="currency-symbol">₹</span>
              <span className="price-number">{product.price.toLocaleString('en-IN')}</span>
            </div>
            <span className="price-original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          </div>

          <button
            type="button"
            className={`btn btn-primary add-cart-btn ${isAdding ? 'btn-added' : ''}`}
            onClick={handleAddToCart}
            id={`add-btn-${product.id}`}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdding ? (
              <>
                <Check size={16} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>{currentQuantityInCart > 0 ? `Add (${currentQuantityInCart})` : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
