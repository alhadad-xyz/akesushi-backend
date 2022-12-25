const express = require('express')
const router = express.Router()
const Product = require('../app/models/Product.model')
const productController = require('../app/controllers/Product.controller')
const APIProductController = require('../app/controllers/api/APIProduct.controller')
const productHelper = require('../app/helper/Product.helper')

router.get('/', (req, res) => {
  res.render('index', { title: "Home page" })
})

// Routes Product
router.get('/products', productController.get)
router.get('/product/create', productController.create)
router.post('/product/store', productHelper.upload, productController.store)
router.get('/product/edit/:id', productController.edit)
router.post('/product/update/:id', productHelper.upload, productController.update)
router.get('/product/delete/:id', productController.destroy)

// Routes API Product
router.get('/v1/products', APIProductController.get)

module.exports = router