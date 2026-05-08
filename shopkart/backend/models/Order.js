// we define the order schema and model here, which will be used to store order details in the database.

const mongoose = require('mongoose');

// order schema to store order details.
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
