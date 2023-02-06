// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { Products } from '../components/products'
import { Cart } from '../components/cart' 

// Create Product component
export const Dashboard = () => {
  
  console.log('Rendering dashboard.tsx')

  // Fetch all cartitems on initial render
  useEffect(() => {
    console.log("dashboard")

  }, [])
  

  return (
    <div>
        <Products/>
        <br></br>
        <Cart/>    
    </div>
  )
}
