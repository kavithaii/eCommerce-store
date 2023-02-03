// Import deps
import React from 'react'

// Create interfaces
interface ProductListRowUI {
  position: number;
  product: {
    id: number;
    name: string;
    price: string;
    description: string;
    imageurl: string;
  }
  handleAddToCart: (id: number, name: string) => void;
}

// Render ProductListRow component
export const ProductListRow = (props: ProductListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
      {props.product.id}
    </td>

    <td className="table-item">
      {props.product.name}
    </td>

    <td className="table-item">
     ₹{props.product.price}
    </td>

    <td className="table-item">
      {props.product.description}
    </td>

    <td className="table-item">
      {/* {props.product.imageurl} */}
      <img src={props.product.imageurl} alt={props.product.description} width="50" height="60"/>
    

    </td>

    <td className="table-item">
      <button
        className="btn btn-add-to-cart"
        onClick={() => props.handleAddToCart(props.product.id, props.product.name)}>
        Add to Cart
      </button>
    </td>








  </tr>
)
