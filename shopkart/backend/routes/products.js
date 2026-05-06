const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/seed', async (req, res) => {
  const sampleProducts = [
    { name: 'Wireless Headphones', description: 'Over-ear noise cancelling headphones with 30hr battery', price: 2499, category: 'Electronics', stock: 15, rating: 4.5 },
    { name: 'Running Shoes', description: 'Lightweight mesh running shoes with cushioned sole', price: 1999, category: 'Footwear', stock: 20, rating: 4.3 },
    { name: 'Cotton T-Shirt', description: 'Premium 100% cotton unisex t-shirt in multiple colors', price: 499, category: 'Clothing', stock: 50, rating: 4.1 },
    { name: 'Backpack 30L', description: 'Waterproof travel backpack with laptop compartment', price: 1299, category: 'Bags', stock: 12, rating: 4.4 },
    { name: 'Smart Watch', description: 'Fitness tracker with heart rate monitor and sleep tracking', price: 3999, category: 'Electronics', stock: 8, rating: 4.6 },
    { name: 'Yoga Mat', description: 'Non-slip 6mm thick exercise mat with carrying strap', price: 699, category: 'Sports', stock: 25, rating: 4.2 },
    { name: 'Desk Lamp LED', description: 'Adjustable brightness LED lamp with USB charging port', price: 849, category: 'Home', stock: 18, rating: 4.0 },
    { name: 'Water Bottle 1L', description: 'Stainless steel insulated bottle keeps cold 24hrs', price: 599, category: 'Sports', stock: 30, rating: 4.7 }
  ];

  try {
    await Product.deleteMany({});
    const products = await Product.insertMany(sampleProducts);
    res.json({ message: `${products.length} products seeded`, products });
  } catch (error) {
    res.status(500).json({ message: 'Seed failed', error: error.message });
  }
});

module.exports = router;
