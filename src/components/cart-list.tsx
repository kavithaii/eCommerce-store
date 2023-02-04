// Import deps
import React from 'react'

// Import components
import { CartListRow } from './cart-list-row'

// Import styles
import './../styles/product-list.css'

// Create interfaces
interface CartUI {
  id: number;
  customerid:string;
  productid:string;
  quantity: number;
  productname: string;
}

interface CartListUI {
  cart: CartUI[];
  loading: boolean;
  handleRemoveCartItem: (productid: string) => void;
}

// Render CartList component
export const CartList = (props: CartListUI) => {
  // Show loading message
  if (props.loading) return <p>Leaderboard table is loading cart...{props.cart.length}</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Product Id</th>

            <th className="table-head-item">Product Name</th>

            <th className="table-head-item" />

            <th className="table-head-item">Quantity</th>

            <th className="table-head-item" />
          </tr>
        </thead>

        <tbody className="table-body">
          {props.cart.length > 0 ? (
            props.cart.map((cart: CartUI, idx) => (
              <CartListRow
                key={cart.id}
                cart={cart}
                position={idx + 1}
                handleRemoveCartItem={props.handleRemoveCartItem}
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
