const Transaction = require("../models/Transaction.model");
const fs = require("fs");

function get(req, res, next) {
  try {
    Transaction.find().exec((err, transactions) => {
      if (err) {
        res.json({ message: err.message });
      } else {
        res.render("transactions/index", {
          title: "List Transaction",
          page: "transactions",
          transactions: transactions,
        });
      }
    });
  } catch (err) {
    console.error(`Error while getting transactions`, err.message);
    next(err);
  }
}

function create(req, res, next) {
  try {
    res.render("transactions/create", {
      title: "Create Transaction",
      page: "transactions",
    });
  } catch (err) {
    console.error(`Error while creating product`, err.message);
    next(err);
  }
}

function store(req, res, next) {
  try {
    const product = new Transaction({
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
          message: "Transaction added successfully",
        };

        res.redirect("/transactions");
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
    Transaction.findById(id, (err, product) => {
      if (err) {
        res.redirect("/transactions");
      } else {
        if (product == null) {
          res.redirect("/transactions");
        } else {
          res.render("transactions/edit", {
            title: "Edit Transaction",
            page: "transactions",
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

    Transaction.findByIdAndUpdate(
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
            message: "Transaction updated successfully",
          };

          res.redirect("/transactions");
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

    Transaction.findByIdAndUpdate(
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
            message: "Transaction activated successfully",
          };

          res.redirect("/transactions");
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
    Transaction.findByIdAndRemove(id, (err, product) => {
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
          message: "Transaction deleted successfully",
        };
      }
    });

    res.redirect("/transactions");
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
