import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const categoryColors = {
  Electronics: '#3b82f6',
  Footwear: '#8b5cf6',
  Clothing: '#ec4899',
  Bags: '#f59e0b',
  Sports: '#10b981',
  Home: '#6366f1'
};

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  const accentColor = categoryColors[product.category] || '#e8521a';

  return (
    <div className="product-card">
      <div className="product-image" style={{ background: `${accentColor}18` }}>
        <span className="product-emoji">
          {product.category === 'Electronics' ? '📱' :
           product.category === 'Footwear' ? '👟' :
           product.category === 'Clothing' ? '👕' :
           product.category === 'Bags' ? '🎒' :
           product.category === 'Sports' ? '🏃' :
           product.category === 'Home' ? '🏠' : '📦'}
        </span>
        <span className="product-category" style={{ background: accentColor }}>
          {product.category}
        </span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>

        <div className="product-rating">
          {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
          <span>{product.rating}</span>
        </div>

        <div className="product-footer">
          <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
