// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Import components
import { Products } from '../components/products'
import { Cart } from '../components/cart' 
import { Order } from '../components/invoice' 

// Create Product component
export const Dashboard = () => {
  
  console.log('Rendering dashboard.tsx')

  return (
    <div>
        <Products/>
        <br></br>
        <Cart/>
        <br></br>
        <Order/>
    </div>
  )
}
