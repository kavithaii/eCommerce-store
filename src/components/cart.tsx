// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { CartList } from './cart-list'

// Import styles
import './../styles/product.css'

// Create Product component
export const Cart = () => {

  // Prepare states
  console.log('Rendering cart.tsx')

  const [customerid, setCustomerId] = useState('')
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch all cartitems on initial render
  useEffect(() => {
    console.log("fetching cart items")
    fetchCartItems()
  }, [])

  // Fetch all products
  const fetchCartItems = async () => {
    // Send GET request to '/cartall' endpoint
    axios
      .get('http://localhost:4001/products/cartall')
      .then(response => {
        // Update the products state
        console.log("inside fetchCartItems - fetching the data from database")
        setCart(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the cart list: ${error}`))
  }

  // Remove cart item
  const handleRemoveCartItem = (productid: string) => {
    // Send POST request to 'products/addcart' endpoint
    // console.log(">>> send product id and name", id, "---", name)
    axios
      .post('http://localhost:4001/cart/removeitem', {
        id: productid
      })
      .then(res => {
        console.log(res.data)
        // 422 or 409 for duplicate record 
        // Fetch all products to refresh the products on the product list
        fetchCartItems()
      })
      .catch(error => {
              // Error
              setErrorMessage('product already exists')
              console.error(`There was an error removing the ${productid} from cart: ${error}`)
              console.log('>>>>',error)
      })

  }

  // Checkout from cart
  const handleCheckout = () => {
    axios
      .post('http://localhost:4001/products/checkout', {
        id: "C1"
      })
      .then(res => {
        console.log(res.data)
        // 422 or 409 for duplicate record 
        // Fetch all products to refresh the products on the product list
        fetchCartItems()
      })
      .catch(error => {
              // Error
              console.error(`There was an error in checkout for customer id ${customerid} from cart: ${error}`)
              console.log('>>>>',error)
      })
  }

  return (
    <div className="product-list-wrapper">

      {/* Render cart list component */}
      <CartList cart={cart} loading={loading} handleRemoveCartItem={handleRemoveCartItem} />

      {/* Show add to cart button if cart contains at least one item */}
      {cart.length > 0 && (
        <button className="btn btn-add" onClick={handleCheckout}>CHECKOUT</button>
      )}
    </div>
  )
}

