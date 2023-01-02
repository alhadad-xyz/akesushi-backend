const express = require('express')
const router = express.Router()
const productController = require('../app/controllers/Product.controller')
const transactionController = require('../app/controllers/Transaction.controller')
const APIProductController = require('../app/controllers/api/APIProduct.controller')
const APITransactionController = require('../app/controllers/api/APITransaction.controller')
const productHelper = require('../app/helper/Product.helper')

router.get('/', (req, res) => {
  res.render('index', { title: "Dashboard", page: 'dashboard' })
})

// Routes Product
router.get('/products', productController.get)
router.get('/product/create', productController.create)
router.post('/product/store', productHelper.upload, productController.store)
router.get('/product/edit/:id', productController.edit)
router.post('/product/update/:id', productHelper.upload, productController.update)
router.get('/product/publish/:id/:status', productController.publish)
router.get('/product/delete/:id', productController.destroy)

// Routes Transaction
router.get('/transactions', transactionController.get)
// router.get('/product/create', productController.create)
// router.post('/product/store', productHelper.upload, productController.store)
// router.get('/product/edit/:id', productController.edit)
// router.post('/product/update/:id', productHelper.upload, productController.update)
// router.get('/product/publish/:id/:status', productController.publish)
// router.get('/product/delete/:id', productController.destroy)

// Routes API Product
router.get('/v1/products', APIProductController.get)
router.post('/v1/transactions/create', APITransactionController.create)
router.post('/v1/transactions/paid', APITransactionController.paid)

module.exports = router