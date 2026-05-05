import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState('');
  const [address, setAddress] = useState({ street: '', city: '', state: '', pincode: '' });

  const handlePlaceOrder = async () => {
    if (!address.street || !address.city || !address.pincode) {
      alert('Please fill in your shipping address');
      return;
    }

    setPlacing(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: totalPrice,
        shippingAddress: address
      };

      await orderAPI.create(orderData);
      clearCart();
      setSuccess('Order placed successfully!');
      setTimeout(() => navigate('/orders'), 1500);
    } catch (err) {
      alert('Order failed: ' + (err.response?.data?.message || 'Server error'));
    } finally {
      setPlacing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page container">
        <h1 className="page-title">Your Cart</h1>
        {success && <div className="success-msg">{success}</div>}
        <div className="cart-empty">
          <p>🛒</p>
          <h3>Cart is empty</h3>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="page-title">Your Cart</h1>
      <p className="page-subtitle">{cart.length} item(s)</p>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
              </div>
              <div className="cart-item-controls">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <div className="cart-item-total">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item._id)}>✕</button>
            </div>
          ))}
        </div>

        <div className="cart-sidebar">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="free-text">{totalPrice >= 999 ? 'FREE' : '₹49'}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{(totalPrice + (totalPrice >= 999 ? 0 : 49)).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="shipping-form">
            <h3>Shipping Address</h3>
            <input placeholder="Street address" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} />
            <input placeholder="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
            <input placeholder="State" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} />
            <input placeholder="Pincode" value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})} />
          </div>

          <button
            className="btn btn-accent place-order-btn"
            onClick={handlePlaceOrder}
            disabled={placing}
          >
            {placing ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
