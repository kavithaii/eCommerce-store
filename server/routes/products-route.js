// Import express
const express = require('express')

// Import products-controller
const productsRoutes = require('./../controllers/products-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all products
// In server.js, products route is specified as '/products'
// this means that '/all' translates to '/products/all'
router.get('/all', productsRoutes.productsAll)

router.get('/cartall', productsRoutes.cartAll)

router.post('/addcart', productsRoutes.addCart)

router.post('/checkout', productsRoutes.checkout)

router.get('/order', productsRoutes.orderDetail) 

router.put('/emptycart', productsRoutes.emptyCart)

// Export router
module.exports = router
