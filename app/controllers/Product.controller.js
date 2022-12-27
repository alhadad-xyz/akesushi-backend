const Product = require("../models/Product.model");
const fs = require("fs");

function get(req, res, next) {
  try {
    Product.find().exec((err, products) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.render("products/index", {
          title: "List Product",
          page: "products",
          products: products,
        });
      }
    });
  } catch (err) {
    console.error(`Error while getting products`, err.message);
    next(err);
  }
}

function create(req, res, next) {
  try {
    res.render("products/create", {
      title: "Create Product",
      page: "products",
    });
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
}

function store(req, res, next) {
  try {
    const product = new Product({
      name: req.body.name,
      subtitle: req.body.subtitle,
      price: req.body.price,
      status: false,
      image: req.file.filename,
    });

    product.save((err) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        req.session.message = {
          type: "success",
          message: "Product added successfully",
        };

        res.redirect("/products");
      }
    });
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
}

function edit(req, res, next) {
  try {
    let id = req.params.id;
    Product.findById(id, (err, product) => {
      if (err) {
        res.redirect("/products");
      } else {
        if (product == null) {
          res.redirect("/products");
        } else {
          res.render("products/edit", {
            title: "Edit Product",
            page: "products",
            product: product,
          });
        }
      }
    });
  } catch (err) {
    console.error(`Error while updating product`, err.message);
    next(err);
  }
}

function update(req, res, next) {
  try {
    let id = req.params.id;
    let new_image = "";

    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./public/images/uploads/product/" + req.body.old_image);
      } catch (err) {
        console.log(err);
      }
    } else {
      new_image = req.body.old_image;
    }

    Product.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        subtitle: req.body.subtitle,
        price: req.body.price,
        status: false,
        image: new_image,
      },
      (err, result) => {
        if (err) {
          res.json({ message: err.message, type: "danger" });
        } else {
          req.session.message = {
            type: "success",
            message: "Product updated successfully",
          };

          res.redirect("/products");
        }
      }
    );
  } catch (err) {
    console.error(`Error while updating product`, err.message);
    next(err);
  }
}

function publish(req, res, next) {
  try {
    let id = req.params.id;
    let status = req.params.status;

    Product.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      (err, result) => {
        if (err) {
          res.json({ message: err.message, type: "danger" });
        } else {
          req.session.message = {
            type: "success",
            message: "Product activated successfully",
          };

          res.redirect("/products");
        }
      }
    );
  } catch (err) {
    console.error(`Error while updating product`, err.message);
    next(err);
  }
}

function destroy(req, res, next) {
  try {
    let id = req.params.id;
    Product.findByIdAndRemove(id, (err, product) => {
      if (product.image != "") {
        try {
          fs.unlinkSync("./public/images/uploads/product/" + product.image);
        } catch (e) {
          console.log(e);
        }
      }

      if (err) {
        res.json({ message: err.message });
      } else {
        req.session.message = {
          type: "success",
          message: "Product deleted successfully",
        };
      }
    });

    res.redirect("/products");
  } catch (err) {
    console.error(`Error while deleting product`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  store,
  edit,
  update,
  publish,
  destroy,
};
