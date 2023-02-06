// Import deps
import React from 'react'

// Create interfaces
interface OrderListRowUI {
  position: number;
  order: {
    id: number;
    customerid: string;
    totalamount: number;
    couponcode :string;
    discount : number;
  }
}

// Render OrderListRow component
export const OrderListRow = (props: OrderListRowUI) => (
  <tr className="table-row">
    <td className="table-item">
          {props.order.customerid}
    </td>

    <td className="table-item">
        ₹ {props.order.totalamount}
    </td>

    <td className="table-item">
         {props.order.couponcode}
    </td>
    
    {props.order.discount > 0 ? (
        <td className="table-item">
          ₹ {props.order.discount}
        </td>
    ) : (
        <td className="table-item">
           Discount NA
        </td>
    )
    }

    <td className="table-item">
        ₹ {props.order.totalamount - props.order.discount}
    </td>
  </tr>
  
)
