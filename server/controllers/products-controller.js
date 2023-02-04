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

// Retrieve all cart items
exports.cartAll = async (req, res) => {
  // Get all books from database'
  console.log('Get cart items from database')
  library
    .select('*') // select all records
    .from('cart') // from 'books' table
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
      console.log('Retrieving all cart items')
    })
    .catch(err => {
      // Send status code and error message in response
      res.status(404).json({ message: `There was an error retrieving cart items: ${err}` })
    })
}

// Add items to cart
exports.addCart = async (req, res) => {
  console.log(">>>cart params:", req.body.id, " -- ", req.body.name)
  const customerid = 'C1'
  let quantity = 1

  // verify if the product already exists in the cart
  library
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


// Checkout from cart
exports.checkout = async (req, res) => {
  console.log(">>>cart params: Customer Id", req.body.id)
  console.log('>>> returned from total cost:', await(findTotalCost()))
  /*

  - select all the items from the cart for the given customer id
  - calculate the total cost - calculateTotalCost()
  - if the order is nth order generate the discount code
  - apply the discount on the total amount
  - update the order table with the order details
  - display the following on screen
      -- Total # of Items
      -- Total Amount
      -- Discount Code
      -- Discount Amount
      -- Total Amount Payable
  - Place another order (less important)
      -- clear the cart
      -- take control to Products component

  */
}

exports.generateDiscountCode = () => {

  /*
  Generate the discount code, update in db and mark status as active
  1. how to generate discount code? format?
  2. global variable where to set?
  */

}

exports.calculateTotalCost = () => {
   /*
    Return # of Items
    Return Total Cost - Quantity * Price

  */
}

exports.getOrderCount = () => {
  /*
   Return order count
  */
}

findTotalCost = async () => {
  let ct, t
  // TODO should we match the Customerid?
  console.log('>>> inside findTotalCost')
  await library('cart')
    .join('products', 'cart.productid', '=', 'products.id')
    .count ('cart.quantity', {as: 'count'})
    //.select ('cart.quantity', 'products.price')
    //.select(library.raw('(?? * ??) as amount', ['cart.quantity', 'products.price']))
    //.sum(library.raw('(?? * ??)', ['cart.quantity', 'products.price']))
    .sum({amount: library.raw('(?? * ??)', ['cart.quantity', 'products.price'])})
    .then(userData => {
        console.log('>>> cart count:', userData[0].count)
        console.log('>>> total:', userData[0].amount)
        ct = userData[0].count
        t = userData[0].amount
      }
    )
    .catch(err => {
      console.log('>>>', err)
      // Send status code and error message in response
      res.status(422).json({ message: `There was an error in getting cart count and total orders, Error: ${err}` })
    })  
  return({count: ct, total: t})
}