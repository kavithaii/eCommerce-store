// Import dependancies
import React from 'react'
import { render } from 'react-dom'

// Import components
import { Products } from './components/products'

// Import styles
import './styles/styles.css'

// Find div container
const rootElement = document.getElementById('root')

// Render Bookshelf component in the DOM
render(<Products />, rootElement)