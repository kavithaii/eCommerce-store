// Import deps
import React from 'react'

// Create interfaces
interface CartListRowUI {
  position: number;
  cart: {
    id: number;
    productid: string;
    customerid: string;
    quantity: number;
    productname: string;
  }
  handleRemoveCartItem: (productid: string) => void;
}

// Render CartListRow component
export const CartListRow = (props: CartListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.cart.productid}
    </td>

    <td className="table-item">
     {props.cart.productname}
    </td>

    <td className="table-item">
      {props.cart.quantity}
    </td>

    <td className="table-item">
    </td>
  </tr>
)
