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
  { name: 'Water Bottle 1L', description: 'Stainless steel insulated bottle keeps cold 24hrs', price: 599, category: 'Sports', stock: 30, rating: 4.7 },
  { name: 'Bluetooth Speaker', description: 'Portable speaker with deep bass and waterproof design', price: 1599, category: 'Electronics', stock: 22, rating: 4.4 },
  { name: 'Gaming Mouse', description: 'RGB gaming mouse with adjustable DPI settings', price: 899, category: 'Electronics', stock: 17, rating: 4.5 },
  { name: 'Leather Wallet', description: 'Premium leather wallet with RFID protection', price: 799, category: 'Bags', stock: 35, rating: 4.3 },
  { name: 'Formal Shirt', description: 'Slim fit formal shirt perfect for office wear', price: 1099, category: 'Clothing', stock: 28, rating: 4.2 },
  { name: 'Basketball', description: 'Durable outdoor basketball with excellent grip', price: 999, category: 'Sports', stock: 14, rating: 4.6 },
  { name: 'Electric Kettle', description: '1.5L fast boiling electric kettle with auto shut-off', price: 1499, category: 'Home', stock: 10, rating: 4.1 },
  { name: 'Laptop Stand', description: 'Adjustable aluminum stand for laptops up to 17 inches', price: 1199, category: 'Electronics', stock: 16, rating: 4.5 },
  { name: 'Casual Sneakers', description: 'Comfortable everyday sneakers with breathable fabric', price: 2299, category: 'Footwear', stock: 19, rating: 4.4 },
  { name: 'Travel Duffel Bag', description: 'Large capacity travel bag with multiple compartments', price: 1899, category: 'Bags', stock: 11, rating: 4.3 },
  { name: 'Winter Hoodie', description: 'Warm fleece hoodie suitable for winter season', price: 1399, category: 'Clothing', stock: 24, rating: 4.5 },
  { name: 'Cricket Bat', description: 'Lightweight English willow cricket bat for professionals', price: 3499, category: 'Sports', stock: 7, rating: 4.7 },
  { name: 'Coffee Maker', description: 'Automatic coffee machine with reusable filter', price: 4599, category: 'Home', stock: 6, rating: 4.4 },
  { name: 'Wireless Keyboard', description: 'Slim wireless keyboard with silent keys', price: 1299, category: 'Electronics', stock: 21, rating: 4.2 },
  { name: 'Smartphone Tripod', description: 'Flexible tripod stand for mobile photography and videos', price: 699, category: 'Electronics', stock: 27, rating: 4.1 },
  { name: 'Sports Track Pants', description: 'Quick dry stretchable track pants for workouts', price: 899, category: 'Clothing', stock: 32, rating: 4.3 },
  { name: 'Kitchen Storage Set', description: 'Airtight containers set for kitchen organization', price: 999, category: 'Home', stock: 13, rating: 4.0 },
  { name: 'Office Chair', description: 'Ergonomic office chair with lumbar support', price: 5999, category: 'Home', stock: 5, rating: 4.6 },
  { name: 'Digital Alarm Clock', description: 'LED display alarm clock with temperature sensor', price: 749, category: 'Home', stock: 20, rating: 4.2 },
  { name: 'Trekking Shoes', description: 'Durable trekking shoes with anti-slip sole', price: 2799, category: 'Footwear', stock: 9, rating: 4.5 },
  { name: 'Gym Gloves', description: 'Breathable anti-slip gloves for gym workouts', price: 499, category: 'Sports', stock: 40, rating: 4.1 }
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
