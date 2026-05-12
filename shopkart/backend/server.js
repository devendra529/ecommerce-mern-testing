//server.js is the entry point of the backend application.It sets up the Express server, connects to MongoDB, and difines the api rotes for authentication
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // load environment variables from .env

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(cors());   // cors is used to allow cross-origin requests from the frontend application.
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// a simple rotes checks if the server is running and responds with a message when the root URL is acessed.
app.get('/', (req, res) => {
  res.json({ message: 'ShopKart API is running' });
});

const PORT = process.env.PORT || 5000; // the server listens on the port specified in the environment variables
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
