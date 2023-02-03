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

router.post('/addcart', productsRoutes.addCart)

//router.put('/delete', productsRoutes.deleteCartItem)

//router.put('/checkout', productsRoutes.checkout)

// Export router
module.exports = router
