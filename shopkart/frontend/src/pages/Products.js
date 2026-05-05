import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Products.css';

const CATEGORIES = ['All', 'Electronics', 'Footwear', 'Clothing', 'Bags', 'Sports', 'Home'];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await productAPI.getAll();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    try {
      setLoading(true);
      await productAPI.seed();
      await fetchProducts();
    } catch (err) {
      setError('Seeding failed');
    }
  };

  const filtered = products.filter(p => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="products-page">
      <div className="container">
        <div className="products-header">
          <div>
            <h1 className="page-title">All Products</h1>
            <p className="page-subtitle">{filtered.length} items found</p>
          </div>
          {products.length === 0 && !loading && (
            <button className="btn btn-accent" onClick={handleSeed}>
              Load Sample Products
            </button>
          )}
        </div>

        <div className="products-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="category-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`cat-btn ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading && <div className="loading">Loading products...</div>}
        {error && <div className="error-msg">{error}</div>}

        {!loading && filtered.length === 0 && (
          <div className="empty-state">
            <p>No products found. Try a different search or category.</p>
          </div>
        )}

        <div className="products-grid">
          {filtered.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
