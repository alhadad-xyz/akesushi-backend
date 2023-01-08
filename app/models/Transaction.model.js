const mongoose = require("mongoose");
const { Schema, model } = mongoose;
let Products = new Schema({ id: String, title: String, description: String, price: Number, qty: Number }, { _id : false });

const transactionSchema = new Schema({
  invoice: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  external_id: {
    type: String,
  },
  account_number: {
    type: String,
  },
  status: {
    type: String,
  },
  bank: {
    type: String,
  },
  customer: {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  products: [Products],
});

module.exports = model("Transaction", transactionSchema);
