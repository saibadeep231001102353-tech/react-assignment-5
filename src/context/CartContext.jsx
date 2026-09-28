import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import { GST_RATE, VALID_COUPONS } from '../data/products';

// Action Types
export const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  APPLY_COUPON: 'APPLY_COUPON',
  REMOVE_COUPON: 'REMOVE_COUPON',
  CLEAR_CART: 'CLEAR_CART',
  RESTORE_CART: 'RESTORE_CART'
};

// Initial State
const initialState = {
  cart: [],
  appliedCoupon: null,
  couponError: null,
  couponSuccess: null
};

// Reducer Function implementing useReducer state management
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === product.id);

      let updatedCart;
      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: Math.min(item.stock || 99, item.quantity + quantity) }
            : item
        );
      } else {
        // Add new item with specified quantity
        updatedCart = [...state.cart, { ...product, quantity }];
      }

      return {
        ...state,
        cart: updatedCart
      };
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      const { id } = action.payload;
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== id)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      // If quantity is reduced to 0 or negative, remove the item
      if (quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== id)
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: Math.min(item.stock || 99, quantity) } : item
        )
      };
    }

    case CART_ACTIONS.APPLY_COUPON: {
      const { code } = action.payload;
      const cleanCode = code ? code.trim().toUpperCase() : '';

      if (!cleanCode) {
        return {
          ...state,
          couponError: 'Please enter a coupon code.',
          couponSuccess: null
        };
      }

      const foundCoupon = VALID_COUPONS[cleanCode];
      if (foundCoupon) {
        return {
          ...state,
          appliedCoupon: foundCoupon,
          couponError: null,
          couponSuccess: `Coupon "${cleanCode}" applied! ${foundCoupon.discountPercent}% discount activated.`
        };
      } else {
        return {
          ...state,
          appliedCoupon: null,
          couponError: `Invalid code "${cleanCode}". Try "BCASTUDENT" or "WELCOME10".`,
          couponSuccess: null
        };
      }
    }

    case CART_ACTIONS.REMOVE_COUPON: {
      return {
        ...state,
        appliedCoupon: null,
        couponError: null,
        couponSuccess: null
      };
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        cart: [],
        appliedCoupon: null,
        couponError: null,
        couponSuccess: null
      };
    }

    case CART_ACTIONS.RESTORE_CART: {
      return {
        ...state,
        cart: action.payload || []
      };
    }

    default:
      return state;
  }
}

// Create Context
const CartContext = createContext(null);

// Cart Provider Component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const saved = localStorage.getItem('nexus_cart_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return { ...initialState, cart: parsed };
        }
      }
    } catch (e) {
      console.warn('Failed to parse cart from storage:', e);
    }
    return initialState;
  });

  // Sync cart changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_cart_v1', JSON.stringify(state.cart));
    } catch (e) {
      console.error('LocalStorage sync error:', e);
    }
  }, [state.cart]);

  // Computed Financial Calculations
  const calculations = useMemo(() => {
    // 1. Total items count
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    // 2. Subtotal (sum of price * quantity)
    const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 3. Coupon Discount calculation
    let discountAmount = 0;
    if (state.appliedCoupon && subtotal > 0) {
      discountAmount = Math.round((subtotal * state.appliedCoupon.discountPercent) / 100);
    }

    // 4. Taxable Amount after discount
    const taxableAmount = Math.max(0, subtotal - discountAmount);

    // 5. GST (18% Goods & Services Tax)
    const gstAmount = Math.round(taxableAmount * GST_RATE);

    // 6. Grand Total (Taxable + GST)
    const grandTotal = taxableAmount + gstAmount;

    return {
      totalItems,
      subtotal,
      discountAmount,
      taxableAmount,
      gstAmount,
      grandTotal,
      gstRatePercent: GST_RATE * 100
    };
  }, [state.cart, state.appliedCoupon]);

  // Dispatch Action Helpers
  const addToCart = (product, quantity = 1) => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: { product, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } });
  };

  const applyCoupon = (code) => {
    dispatch({ type: CART_ACTIONS.APPLY_COUPON, payload: { code } });
  };

  const removeCoupon = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_COUPON });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const contextValue = {
    cart: state.cart,
    appliedCoupon: state.appliedCoupon,
    couponError: state.couponError,
    couponSuccess: state.couponSuccess,
    ...calculations,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    clearCart
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
}

// Custom hook to consume the Cart Context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
