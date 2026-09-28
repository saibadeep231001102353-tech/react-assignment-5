import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { 
  PRODUCT_CATEGORIES, 
  initialProducts 
} from '../data/products';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  PackageX, 
  CheckCircle2,
  ArrowUpDown
} from 'lucide-react';
import './ProductList.css';

/**
 * ProductList Component
 * Requirement: "Product List"
 * Displays product catalog with category filter tabs, search indexing, and sorting options.
 */
const ProductList = ({ onShowToast }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-asc' | 'price-desc' | 'rating'

  // Filter & Sort Pipeline
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((prod) => {
        // 1. Category filter
        const matchCategory =
          selectedCategory === 'All Products' || prod.category === selectedCategory;
        if (!matchCategory) return false;

        // 2. Search query filter
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
          prod.name.toLowerCase().includes(q) ||
          prod.description.toLowerCase().includes(q) ||
          prod.category.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // 'featured'
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section className="product-list-section" id="products-catalog">
      <div className="container">
        {/* Controls Toolbar: Search & Sort */}
        <div className="catalog-toolbar-card card-glass">
          <div className="search-filter-wrapper">
            <Search size={18} className="toolbar-search-icon" />
            <input
              type="text"
              className="toolbar-search-input"
              placeholder="Search products by title, category, features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="catalog-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="toolbar-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="sort-selector-wrapper">
            <ArrowUpDown size={15} className="sort-icon" />
            <span className="sort-label">Sort:</span>
            <select
              className="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              id="catalog-sort-select"
            >
              <option value="featured">Featured Selection</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="category-chips-scroll">
          {PRODUCT_CATEGORIES.map((cat) => {
            const count =
              cat === 'All Products'
                ? initialProducts.length
                : initialProducts.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                <span>{cat}</span>
                <span className="cat-count-badge">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Catalog Header Meta */}
        <div className="catalog-meta-bar">
          <div className="meta-left">
            <h2 className="catalog-heading">
              Featured <span className="gradient-text">Gear & Tech</span>
            </h2>
            <span className="results-count-chip">
              Showing {filteredProducts.length} of {initialProducts.length} Products
            </span>
          </div>

          <div className="category-status-pill">
            <Sparkles size={13} />
            <span>Category: {selectedCategory}</span>
          </div>
        </div>

        {/* Empty Catalog State */}
        {filteredProducts.length === 0 ? (
          <div className="empty-catalog-card card-glass">
            <div className="empty-icon-circle">
              <PackageX size={44} />
            </div>
            <h3 className="empty-title">No Matching Products Found</h3>
            <p className="empty-desc">
              We couldn't find any products matching "{searchQuery}" under "{selectedCategory}".
              Try searching for "headphones", "keyboard", or clear your filters.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Products');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onShowToast={onShowToast}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
