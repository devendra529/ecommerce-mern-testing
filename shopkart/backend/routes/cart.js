const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

let carts = {};

router.get('/', protect, (req, res) => {
  const userId = req.user._id.toString();
  const cart = carts[userId] || [];
  res.json(cart);
});

router.post('/add', protect, (req, res) => {
  const { productId, name, price, quantity } = req.body;
  const userId = req.user._id.toString();

  if (!productId || !name || !price) {
    return res.status(400).json({ message: 'productId, name, and price are required' });
  }

  if (!carts[userId]) carts[userId] = [];

  const existingIndex = carts[userId].findIndex(item => item.productId === productId);

  if (existingIndex !== -1) {
    carts[userId][existingIndex].quantity += quantity || 1;
  } else {
    carts[userId].push({ productId, name, price, quantity: quantity || 1 });
  }

  res.json(carts[userId]);
});

router.put('/update', protect, (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id.toString();

  if (!carts[userId]) return res.status(404).json({ message: 'Cart is empty' });

  const item = carts[userId].find(i => i.productId === productId);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });

  if (quantity <= 0) {
    carts[userId] = carts[userId].filter(i => i.productId !== productId);
  } else {
    item.quantity = quantity;
  }

  res.json(carts[userId]);
});

router.delete('/remove/:productId', protect, (req, res) => {
  const userId = req.user._id.toString();
  if (!carts[userId]) return res.json([]);
  carts[userId] = carts[userId].filter(i => i.productId !== req.params.productId);
  res.json(carts[userId]);
});

router.delete('/clear', protect, (req, res) => {
  const userId = req.user._id.toString();
  carts[userId] = [];
  res.json({ message: 'Cart cleared' });
});

module.exports = router;
