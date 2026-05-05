import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="hero-tag">Built for India ✦</p>
            <h1 className="hero-title">
              Everything you<br />
              need, delivered.
            </h1>
            <p className="hero-desc">
              ShopKart brings you quality products across electronics,
              fashion, sports and more — all in one place.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-accent hero-btn">
                Browse Products
              </Link>
              {!user && (
                <Link to="/register" className="btn btn-outline">
                  Create Account
                </Link>
              )}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">🛒</div>
            <div className="floating-tag tag1">Electronics</div>
            <div className="floating-tag tag2">Fashion</div>
            <div className="floating-tag tag3">Sports</div>
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="feature-grid">
          <div className="feature-item">
            <span className="feature-icon">🚚</span>
            <h3>Free Delivery</h3>
            <p>On orders above ₹999</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔒</span>
            <h3>Secure Payments</h3>
            <p>100% safe & encrypted</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">↩️</span>
            <h3>Easy Returns</h3>
            <p>7-day return policy</p>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎧</span>
            <h3>24/7 Support</h3>
            <p>Always here to help</p>
          </div>
        </div>
      </section>

      <section className="cta-section container">
        <div className="cta-box">
          <h2>Start shopping today</h2>
          <p>Join thousands of happy customers across India</p>
          <Link to="/products" className="btn btn-primary">
            Shop Now →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
