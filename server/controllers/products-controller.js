// Import database
const library = require('./../db')
const getConstants = require('../constants')

// Retrieve all products
exports.productsAll = async (req, res) => {
  // Get all products from database
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

// Retrieve all Cart Items
exports.cartAll = async (req, res) => {
  // Get all Cart Items from database'
  console.log('Get cart items from database')
  library
    .select('*') // select all records
    .from('cart') // from 'cart' table
    .then(userData => {
      // Send products extracted from database in response
      res.status(200).json(userData)
      console.log('Retrieving all cart items')
    })
    .catch(err => {
      // Send status code and error message in response
      res.status(404).json({ message: `There was an error retrieving cart items: ${err}` })
    })
}

// Add product to Cart
exports.addCart = async (req, res) => {
  console.log(">>>cart params:", req.body.id, " -- ", req.body.name)
  let quantity = 1
  // Verify that the product already exists in the cart
  library('cart')
    .select('*')
    .from('cart')
    .where('productid', req.body.id)
    .then(userData => {
      // Send products extracted from database in response
      /* console.log('>>> from cart', JSON.stringify(userData))
      console.log('>>> find length', userData.length) */
      if(userData.length === 0){
        console.log('inside insert', quantity)
        // Add product to Cart
        library('cart')
        .insert({
          'customerid': getConstants.customerid,
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
        //Increament the quantity
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

  let discountapplicable = false
  let couponcode = ""
  let discountAmount = 0
  let newRecordId = 1
  let todaysdate = new Date();

  // Calculate Total Cost of Cart Items
  let totalAmount = await calculateTotalAmount()
  console.log('>> Total Amount',totalAmount.total)
  
  // Insert Order Details in Order Table 
  await library('order')
    .returning('id')
    .insert({ // insert new oder
      'customerid': req.body.id,
      'date': todaysdate,
      'totalamount': totalAmount.total
    })
    .then(function(id) {
      console.log('>>> Returning id ',id[0].id)
      newRecordId = id[0].id
      res.status(201).json({ message: `Order for \'${req.body.id}\' created.` })
    })
    .catch(err => {
      console.log(err)
      res.status(422).json({ message: `There was an error creating ${req.body.id} Order: ${err}` })
    })

    // Check if Discount is applicable : Discount is applicable for every Nth Order
    discountapplicable = await isDiscountValid(req.body.id)
    console.log(">>>discountapplicable", discountapplicable)
    
    //If Discount is Applicable generate CouponCode and Discount Amount
    if (discountapplicable) {
      couponcode = generateCouponCode(req.body.id)
      discountAmount = totalAmount.total*(getConstants.DiscountPER)
      console.log('Coupon Code and Discount Amount ',couponcode, '--',discountAmount)

      library('order')
      .where('id', newRecordId) //****** TODO ************** - Get the latest id Knex ?? 
          .update({
            'discount': discountAmount,
            'couponcode': couponcode
          })
          .then(() => {
            //res.status(201).json({ message: `Order \'${req.body.id}\' updated.` })
          })
          .catch(err => {
            console.log('>>>', err)
            //res.status(422).json({ message: `There was an error in updating order ${req.body.name}, Error: ${err}` })
          })
    } 
}

// Retrieve order details 
exports.orderDetail = async (req, res) => {
  // Get order details from database'
  console.log('Get order details from database')
  library
    .select('*') // select all records
    .from('order').max('id') // from 'order' table getting the recent order details
    .then(userData => {
      // Send order extracted from database in response
      res.status(200).json(userData)
      console.log('Retrieving order details')
    })
    .catch(err => {
      // Send status code and error message in response
      res.status(404).json({ message: `There was an error retrieving order details: ${err}` })
    })
}

// Empty items from the cart
exports.emptyCart = async (req, res) => {
  // Remove all items from the cart
  library
    .select('*') // select all records
    .from('cart') // from 'cart' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.status(200).json({ message: 'Cart is Empty' })
    })
    .catch(err => {
      // Send status code and error message in response
      res.status(422).json({ message: `There was an error emptying the Cart : ${err}.` })
    })
}

generateCouponCode = (customerid) => {
  // Generate the discount code, update in db
  let todaysdate = new Date();
  let month = todaysdate.getMonth()+1 // getMonth() returns the month index (0 to 11) and thus incrementing by 1
  
  return customerid+todaysdate.getFullYear()+month+todaysdate.getDate()+todaysdate.getHours()+todaysdate.getMinutes()+todaysdate.getSeconds()
}

calculateTotalAmount = async () => {
  let ct, t
  // TODO should we match the Customerid?
  console.log('>>> inside findTotalCost')
  await library('cart')
    .join('products', 'cart.productid', '=', 'products.id')
    .count ('cart.quantity', {as: 'count'})
    .sum({amount: library.raw('(?? * ??)', ['cart.quantity', 'products.price'])})
    .then(userData => {
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


//  Check if discount can be applied on the order
isDiscountValid = async (customerid) => {
  let validDiscount = false
  console.log(">>>cart params: isDiscountValid : Customer Id", customerid)
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~',getConstants.NthDiscountOrder)
  
  await library
    .select('*') // Select all records
    .from('order') // from 'books' table
    .where('customerid',customerid)
    .then(userData => {
      console.log('>>> count of orders', userData.length)
      console.log(userData.length%(getConstants.NthDiscountOrder))
      if (userData.length%(getConstants.NthDiscountOrder) == 0) {
        console.log("Discount Applicable")
        validDiscount = true
      }
    })
    .catch(err => {
      // Send status code and error message in response
      console.log(err)
      res.status(404).json({ message: `There was an error retrieving books: ${err}` })
    })

  console.log('>>> validDiscount ',validDiscount)
  return validDiscount
}