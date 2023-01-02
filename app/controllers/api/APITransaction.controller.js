require("dotenv").config();
const Transaction = require("../../models/Transaction.model");
const Xendit = require('xendit-node');

const x = new Xendit({
  secretKey: process.env.Xendit,
});

function create(req, res, next) {
  try {
    const { VirtualAcc } = x;
    const vaSpecificOptions = {};
    const va = new VirtualAcc(vaSpecificOptions);
    const externalID = new Date().valueOf().toString();
    let expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate()+1);

    va.createFixedVA({
      externalID: externalID,
      bankCode: req.body.bank.toUpperCase(),
      name: req.body.customer.fullname,
      expectedAmt: req.body.total,
      isSingleUse: true,
      expirationDate: expirationDate,
      isClosed: true
    })
    .then(({id, status, account_number}) => {
      console.log(`Fixed VA created with ID: ${id}`);

      const Data = new Transaction({
        invoice: req.body.invoice,
        date: Date.now(),
        total: req.body.total,
        external_id: externalID,
        account_number: account_number,
        status: status,
        bank: req.body.bank,
        customer: {
          fullname: req.body.customer.fullname,
          email: req.body.customer.email,
          address: req.body.customer.address,
          city: req.body.customer.city,
          state: req.body.customer.state,
          zip: req.body.customer.zip,
        },
        products: req.body.products,
      });

      Data.save((err) => {
        if (err) {
          res.json({ message: err.message, type: "danger" });
        } else {
          res.json({ message: "Transaction created successfully" });
        }
      });
    })
    .catch(e => {
      console.error(`VA creation failed with message: ${e.message}`);
    });
  } catch (err) {
    console.error(`Error while getting products`, err.message);
    next(err);
  }
}


function paid(req, res, next) {
  try {
    Transaction.findOneAndUpdate({external_id: req.body.external_id}, { status: 'PAID'}).exec((err, transaction) => {
      if(err) {
        res.json({ message: err.message });
      } else {
        res.json({ message: "Transaction paid successfully" });
      }
    })
  } catch (err) {
    console.error(`Error while getting products`, err.message);
    next(err);
  }
}

module.exports = {
  create,
  paid,
};
