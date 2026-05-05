import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import './Orders.css';

const statusColors = {
  pending: '#f59e0b',
  processing: '#3b82f6',
  shipped: '#8b5cf6',
  delivered: '#10b981'
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await orderAPI.getMyOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="orders-page container">
      <h1 className="page-title">My Orders</h1>
      <p className="page-subtitle">{orders.length} order(s) placed</p>

      {error && <div className="error-msg">{error}</div>}

      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>📦</p>
          <h3>No orders yet</h3>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-card-header">
                <div>
                  <p className="order-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <span className="order-status" style={{ background: statusColors[order.status] + '22', color: statusColors[order.status] }}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <span>Total</span>
                <span className="order-total">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
