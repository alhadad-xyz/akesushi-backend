const Product = require("../../models/Product.model");

function get(req, res, next) {
  try {
    Product.find({status:true}).exec((err, products) => {
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

function show(req, res, next) {
  try {
    let id = req.params.id;
    Product.findById(id).exec((err, product) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.json(product)
      }
    });
  } catch (err) {
    console.error(`Error while getting products`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  show
}