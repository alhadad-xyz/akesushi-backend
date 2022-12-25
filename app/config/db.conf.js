const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL || 'mongodb://localhost/ManualAuth';

mongoose.set('strictQuery', false)
mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

module.exports = db