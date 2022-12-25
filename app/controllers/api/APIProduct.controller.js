const Product = require("../../models/Product.model");

function get(req, res, next) {
  try {
    Product.find().exec((err, products) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        products.forEach(product => {
          product.image = req.protocol + '://' + req.get('host') + '/images/uploads/product/' + product.image
        })

        res.json(products)
      }
    });
  } catch (err) {
    console.error(`Error while getting products`, err.message);
    next(err);
  }
}

module.exports = {
  get
}