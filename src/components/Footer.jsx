import React from 'react';
import { 
  ShoppingBag, 
  GraduationCap, 
  CheckCircle2, 
  Receipt,
  Tag, 
  Layers,
  Code
} from 'lucide-react';
import './Footer.css';

/**
 * Footer Component
 * Displays technical assignment metadata, concepts demonstrated, and student credits.
 * Credits: Saibadeep Mullick, 4th Year BCA Student.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="nexus-footer">
      <div className="container footer-container">
        {/* Top Info Grid */}
        <div className="footer-grid">
          {/* Brand & Purpose Column */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <ShoppingBag size={22} />
              </div>
              <span className="footer-brand-title">NexusCart</span>
            </div>
            <p className="footer-description">
              Full-featured modern e-commerce shopping cart architecture built for React Practical 
              Assignment 5. Powered by centralized state management via <code>useReducer</code> and 
              the <code>Context API</code>, featuring dynamic pricing engines, coupon validation, 
              and 18% GST statutory calculation.
            </p>
            <div className="academic-badge">
              <GraduationCap size={15} />
              <span>Bachelor of Computer Applications (BCA) - 4th Year</span>
            </div>
          </div>

          {/* Concepts Demonstrated Column */}
          <div className="footer-col">
            <h4 className="footer-heading">Assignment 5 Concepts</h4>
            <ul className="footer-list">
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span><code>useReducer()</code> Reducer pattern with immutable action dispatches</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span><code>Context API</code> (CartContext) for global app state distribution</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span>Cart Operations: Add, Remove, and Stepper Quantity Updates</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span>Coupon Validation Engine with percentage discount calculations</span>
              </li>
              <li>
                <CheckCircle2 size={14} className="bullet-icon" />
                <span>Statutory 18% GST and Grand Total Financial Pipeline</span>
              </li>
            </ul>
          </div>

          {/* Syllabus Compliance Checklist */}
          <div className="footer-col">
            <h4 className="footer-heading">Required Features Checklist</h4>
            <div className="feature-tags-grid">
              <span className="feature-tag verified">✓ Product List</span>
              <span className="feature-tag verified">✓ Add to Cart</span>
              <span className="feature-tag verified">✓ Remove Item</span>
              <span className="feature-tag verified">✓ Quantity Update</span>
              <span className="feature-tag verified">✓ Grand Total</span>
              <span className="feature-tag verified">✓ Coupon Code (% Discount)</span>
              <span className="feature-tag verified">✓ GST Calculation (18%)</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Credits Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {currentYear} NexusCart Systems. Built for React Practical Assignment 5.
          </p>

          <div className="developer-badge">
            <span className="badge-label">Developed by:</span>
            <span className="dev-name">Saibadeep Mullick</span>
            <span className="dev-dept">BCA 4th Year</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
