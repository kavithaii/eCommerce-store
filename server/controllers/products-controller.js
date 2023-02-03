// Import database
const library = require('./../db')

// Retrieve all products
exports.productsAll = async (req, res) => {
  // Get all products from database'
  console.log('Get all products from database')
  library
    .select('*') // select all records
    .from('products') // from 'product' table
    .then(userData => {
      // Send products extracted from database in response
      res.json(userData)
      console.log('Retrieving all products')
    })
    .catch(err => {
      // Send status code and error message in response
      res.status(404).json({ message: `There was an error retrieving products: ${err}` })
    })
}

// Create new cart
exports.addCart = async (req, res) => {
  console.log(">>>cart params:", req.body.id, " -- ", req.body.name)
  const customerid = 'C1'
  let quantity = 1
  // let productExistsInCart
  // verify if the product already exists in the cart
  library('cart')
    .select('*')
    .from('cart')
    .where('productid', req.body.id)
    .then(userData => {
      // Send products extracted from database in response
      // res.json(userData)
      console.log('>>> from cart', JSON.stringify(userData))
      console.log('>>> find length', userData.length)
      if(userData.length === 0){
        console.log('inside insert', quantity)
        // Add products to cart
        library('cart')
        .insert({
          'customerid': customerid,
          'productid': req.body.id,
          'quantity': quantity,
          'productname': req.body.name
        })
        .then(() => {
          // Send a success message in response
          res.status(201).json({ message: `Product \'${req.body.id}\' added to cart.` })
        })
        .catch(err => {
          console.log('>>>', err)
          // Send status code and error message in response
          res.status(422).json({ message: `There was an error in adding to cart ${req.body.name}, Error: ${err}` })
        })
      }//if 0

      if(userData.length == 1){
        console.log('>>> find quantity', userData[0].quantity, '   product name:', userData[0].productname)
        console.log('>>> inside if >>>')
        /* console.log('>>> before productExistsInCart',productExistsInCart)
        productExistsInCart = true
        console.log('>>> after productExistsInCart',productExistsInCart) */
        quantity = userData[0].quantity + 1

        // Update product quantity in cart
        library('cart')
        .where('productid', req.body.id)
        .update({
          'quantity': quantity
        })
        .then(() => {
          // Send a success message in response
          res.status(201).json({ message: `Product \'${req.body.id}\' added to cart.` })
        })
        .catch(err => {
          console.log('>>>', err)
          // Send status code and error message in response
          res.status(422).json({ message: `There was an error in adding to cart ${req.body.name}, Error: ${err}` })
        })
      } // if 1

    })
    .catch(err => {
      console.log('>>> find cart items, ', err)
      // Send status code and error message in response
      res.status(404).json({ message: `There was an error retrieving cart items: ${err}` })
    })
}


