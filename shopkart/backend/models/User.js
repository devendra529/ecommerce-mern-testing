/*This is a complete User Model in Node.js + MongoDB + Mongoose with:

1. Schema creation
2.Validation
3.Password hashing
4.Password comparison
5.Middleware (pre)
6.Custom methods
*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');      // Instead store encrypted version of the password in the database

//Creating a schema named userSchema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
