// Import dependancies
import React from 'react'

// Import components
import { OrderListRow } from './invoice-list-row'

// Import styles
import './../styles/product-list.css'

// Create interfaces
interface OrderUI {
  id: number;
  customerid:string;
  totalamount: number;
  couponcode :string;
  discount : number;
}

interface OrderListUI {
  order: OrderUI[];
  loading: boolean;
}

// Render OrderList component
export const OrderList = (props: OrderListUI) => {
  // Show loading message
  if (props.loading) return <p>Leaderboard table is loading order details...{props.order.length}</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th className="table-head-item">Customer Id</th>

            <th className="table-head-item">Total Amount</th>

            <th className="table-head-item">Coupon Code</th>

            <th className="table-head-item">Discount Amount</th>

            <th className="table-head-item">Total Payable Amount</th>

            <th className="table-head-item"></th>

          </tr>
        </thead>

        <tbody className="table-body">
          {props.order.length > 0 ? (
            props.order.map((order: OrderUI, idx) => (
              <OrderListRow
                key={order.id}
                order={order}
                position={idx + 1}
              />
              )
            )
          ) : (
            <tr className="table-row">
              <td className="table-item" style={{ textAlign: 'center' }} colSpan={6}>There is no invoice to show.</td>
            </tr>
          )
        }
        </tbody>
    </table>
  )
}
