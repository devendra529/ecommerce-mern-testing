//Mongoose schema for a Product model, which will be used to store product details in the database.

const mongoose = require('mongoose');
//Creates a schema named productSchema.
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 10
  },
  rating: {
    type: Number,
    default: 4.0
  }
}, { timestamps: true });    // Mongoose automatically adds two fields to every document createdAt and updatedAt

module.exports = mongoose.model('Product', productSchema);
