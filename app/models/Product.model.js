const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name:  {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = model('Product', productSchema)