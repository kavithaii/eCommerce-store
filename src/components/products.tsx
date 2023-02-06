// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import validator from 'validator'
// @ts-ignore
import ReactStars from 'react-rating-stars-component'

// Import components
import { ProductList } from './product-list'

// Import styles
import './../styles/product.css'



// Create Product component
export const Products = () => {
  // Prepare states
  
  console.log('Rendering products.tsx')
  
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageurl, setImageurl] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // Fetch all products on initial render
  useEffect(() => {
    fetchProducts()
  }, [])

  // Fetch all products
  const fetchProducts = async () => {
    // Send GET request to 'products/all' endpoint
    axios
      .get('http://localhost:4001/products/all')
      .then(response => {
        // Update the products state
        console.log("inside fetchProducts - fetching the data from database")
        setProducts(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the products list: ${error}`))
  }

  // Reset all input fields
  const handleInputsReset = () => {
    setId('')
    setName('')
    setPrice('')
    setDescription('')
    setImageurl('')
  }

  // Add to cart
  const handleAddToCart = (id: number, name: string) => {
    // Send POST request to 'products/addcart' endpoint
    // console.log(">>> send product id and name", id, "---", name)
    axios
      .post('http://localhost:4001/products/addcart', {
        id: id,
        name: name
      })
      .then(res => {
        console.log(res.data)
        // 422 or 409 for duplicate record 
        // Fetch all products to refresh the products on the product list
        fetchProducts()
      })
      .catch(error => {
              // Error
              setErrorMessage('product already exists')
              console.error(`There was an error adding the ${name} to cart: ${error}`)
              console.log('>>>>',error)
      })
  }

  return (
    <div className="product-list-wrapper">

      {/* Render product list component */}
      <ProductList products={products} loading={loading} handleAddToCart={handleAddToCart} />

    </div>
  )
}

