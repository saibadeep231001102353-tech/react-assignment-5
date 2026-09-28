/**
 * Products & Coupon Database
 * React Assignment 5: Online Shopping Cart
 * Author: Saibadeep Mullick (BCA 4th Year)
 */

export const GST_RATE = 0.18; // 18% standard GST

export const VALID_COUPONS = {
  'BCASTUDENT': {
    code: 'BCASTUDENT',
    discountPercent: 25,
    description: 'Exclusive 25% BCA Academic Scholar Discount'
  },
  'WELCOME10': {
    code: 'WELCOME10',
    discountPercent: 10,
    description: 'First order 10% Welcome Discount'
  },
  'FESTIVE20': {
    code: 'FESTIVE20',
    discountPercent: 20,
    description: 'Special Seasonal 20% Festive Savings'
  },
  'MEGA50': {
    code: 'MEGA50',
    discountPercent: 50,
    description: 'Mega Flash 50% Super Clearance'
  }
};

export const PRODUCT_CATEGORIES = [
  'All Products',
  'Audio & Sound',
  'Wearables & Health',
  'Smart Computing',
  'Gaming & Gear',
  'Smart Home & Tech'
];

export const initialProducts = [
  {
    id: 'prod-1',
    name: 'AcousticPro Studio Noise-Cancelling Headphones',
    category: 'Audio & Sound',
    price: 8499,
    originalPrice: 11999,
    rating: 4.8,
    reviewsCount: 342,
    stock: 14,
    description: 'Spatial audio with 40mm titanium drivers, 45-hour battery life, and adaptive active noise cancellation.',
    badge: 'Bestseller',
    iconType: 'headphones',
    colorTheme: '#8b5cf6'
  },
  {
    id: 'prod-2',
    name: 'PulseTrack Ultra OLED Smartwatch & ECG',
    category: 'Wearables & Health',
    price: 5999,
    originalPrice: 7999,
    rating: 4.7,
    reviewsCount: 218,
    stock: 19,
    description: 'Always-on sapphire crystal display, dual-frequency GPS, sleep stages tracking, and 10-day battery life.',
    badge: 'Trending',
    iconType: 'watch',
    colorTheme: '#06b6d4'
  },
  {
    id: 'prod-3',
    name: 'Vortex Mechanical RGB Wireless Keyboard',
    category: 'Gaming & Gear',
    price: 4299,
    originalPrice: 5499,
    rating: 4.9,
    reviewsCount: 512,
    stock: 25,
    description: 'Hot-swappable tactile switches, per-key RGB backlighting, aircraft aluminum frame, and triple connection modes.',
    badge: 'Top Rated',
    iconType: 'keyboard',
    colorTheme: '#ec4899'
  },
  {
    id: 'prod-4',
    name: 'NovaBook 14-inch M-Series Laptop Stand & Hub',
    category: 'Smart Computing',
    price: 2899,
    originalPrice: 3999,
    rating: 4.6,
    reviewsCount: 184,
    stock: 30,
    description: 'Ergonomic anodized aluminum riser integrated with 8-in-1 4K HDMI, USB 3.2, and 100W Power Delivery.',
    badge: 'Staff Pick',
    iconType: 'laptop',
    colorTheme: '#3b82f6'
  },
  {
    id: 'prod-5',
    name: 'AeroSound 360 Waterproof Bluetooth Speaker',
    category: 'Audio & Sound',
    price: 3499,
    originalPrice: 4999,
    rating: 4.7,
    reviewsCount: 295,
    stock: 12,
    description: 'IPX7 submerged waterproof rating, deep bass passive radiator, dual party pairing, and 24-hour playback.',
    badge: 'Save 30%',
    iconType: 'speaker',
    colorTheme: '#10b981'
  },
  {
    id: 'prod-6',
    name: 'ProGrip Ergonomic Dual-Motor Wireless Gamepad',
    category: 'Gaming & Gear',
    price: 2499,
    originalPrice: 3299,
    rating: 4.8,
    reviewsCount: 167,
    stock: 22,
    description: 'Hall-effect anti-drift joysticks, mechanical microswitch triggers, customizable macro paddles, and low latency.',
    badge: 'New Arrival',
    iconType: 'gamepad',
    colorTheme: '#f59e0b'
  },
  {
    id: 'prod-7',
    name: 'HyperVision 4K HDR USB-C External Monitor',
    category: 'Smart Computing',
    price: 18999,
    originalPrice: 24999,
    rating: 4.9,
    reviewsCount: 128,
    stock: 8,
    description: '100% sRGB color accuracy, ultra-thin 4mm magnetic kickstand case, eye-care flicker-free IPS panel.',
    badge: 'Premium',
    iconType: 'monitor',
    colorTheme: '#a855f7'
  },
  {
    id: 'prod-8',
    name: 'AuraGlow Smart Ambient Light Bar Duo',
    category: 'Smart Home & Tech',
    price: 3199,
    originalPrice: 4499,
    rating: 4.5,
    reviewsCount: 198,
    stock: 18,
    description: '16 million colors with audio visualizer synchronization, smart voice control, and desk mount brackets.',
    badge: 'Popular',
    iconType: 'lightbulb',
    colorTheme: '#fb7185'
  },
  {
    id: 'prod-9',
    name: 'Zenith True-Wireless ANC Earbuds Pro',
    category: 'Audio & Sound',
    price: 4999,
    originalPrice: 6999,
    rating: 4.8,
    reviewsCount: 421,
    stock: 15,
    description: 'Dual hybrid ANC, 6 AI beamforming clear call mics, Qi wireless charging capsule, and IPX5 sweatproof.',
    badge: 'Bestseller',
    iconType: 'earbuds',
    colorTheme: '#14b8a6'
  },
  {
    id: 'prod-10',
    name: 'BioSensor Smart Health & Sleep Mat',
    category: 'Wearables & Health',
    price: 6499,
    originalPrice: 8999,
    rating: 4.6,
    reviewsCount: 94,
    stock: 9,
    description: 'Non-wearable under-mattress sleep monitor tracking heart rate variability, respiration, and sleep apnea cycles.',
    badge: 'Innovation',
    iconType: 'activity',
    colorTheme: '#6366f1'
  }
];
