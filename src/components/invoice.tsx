// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { OrderList } from './invoice-list'

// Import styles
import './../styles/product.css'

// Create Order component
export const Order = () => {
  
  // Prepare states
  console.log('Rendering invoice.tsx')
  
  const [order, setOrder] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch order detail on initial render
  useEffect(() => {
    console.log("fetching order details")
    fetchOrderDetails()
  }, [])

  // Fetch Order Details
  const fetchOrderDetails = async () => {
    // Send GET request to '/order' endpoint
    axios
      .get('http://localhost:4001/products/order')
      .then(response => {
        console.log("inside fetchOrderDetails - fetching the data from database")
        setOrder(response.data)
        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the order detail: ${error}`))
  }

  // Empty Cart Items
  const handleEmptyCart = () => {
    // Send PUT request to 'books/reset' endpoint
    axios.put('http://localhost:4001/products/emptycart')
    .then(() => {
      // Fetch all books to refresh
      // the books on the bookshelf list
      fetchOrderDetails()
    })
    .catch(error => console.error(`There was an error resetting the book list: ${error}`))
    }

  return (
    <div className="product-list-wrapper">
      {/* Render order list component */}
      <OrderList order={order} loading={loading}  />
      <br/>
      {/* Show empty cart button if list contains at least one order */}
      {order.length > 0 && (
        <button className="btn-add-to-cart" onClick={handleEmptyCart}>Empty Cart</button>
      )}

    </div>
  )
}

