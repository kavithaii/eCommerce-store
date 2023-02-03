// Import deps
import React from 'react'

// Import components
import { ProductListRow } from './product-list-row'

// Import styles
import './../styles/product-list.css'

// Create interfaces
interface ProductUI {
  id: number;
  name: string;
  price: string;
  description: string;
  imageurl: string;
}

interface ProductListUI {
  products: ProductUI[];
  loading: boolean;
  handleAddToCart: (id: number, name: string) => void;
}

// Render ProductsList component
export const ProductList = (props: ProductListUI) => {
  // Show loading message
  if (props.loading) return <p>Leaderboard table is loading...{props.products.length}</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item" />
	    <th></th>
            <th className="table-head-item"><b>Store Name</b> </th>
            
            <th></th>
            <th></th>
            <th></th>
            
	    <th className="table-head-item">CART </th>
            
            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.products.length > 0 ? (
            props.products.map((product: ProductUI, idx) => (
              <ProductListRow
                key={product.id}
                product={product}
                position={idx + 1}
                handleAddToCart={props.handleAddToCart}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There are no products to show. Create one!</td>
            </tr>
          )
        }


    


        </tbody>
    </table>
  )
}
