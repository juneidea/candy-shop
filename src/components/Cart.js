import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {removeItems, updateItemQuantity} from './updateCart'

const Cart = ({products, cart, setCart, userName}) => {
  let totalBag = 0
  const [items, setItems] = useState([])
  useEffect(() => {
    if (cart) setItems(cart.items)
  }, [cart])

  const handleChange = (item) => {
    if (item.quantity > 0) updateItemQuantity({cartId: cart.id, stockId: item.stockId, quantity: item.quantity, setCart: setCart})
  }

  return (
    <div className='spacer'>
      {!items || !products ? (
        <div className='outline'>
          <div className='empty_cart'>
            <h3>{userName} 's BAG</h3>
            <p>Your bag is empty, but it doesn't have to be!</p>
            <Link to='/'>
              <button type='button'> GO TO HOME PAGE FOR SOME SWEETS!</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='outline'>
          <div className='cart_container'>
            <h3>{userName} 's BAG</h3>
            <table id='cart_table'>
              <tbody>
                <tr>
                  <th></th>
                  <th>NAME</th>
                  <th>QUANTITY</th>
                  <th>UNIT PRICE</th>
                  <th>ITEM TOTAL</th>
                </tr>
                {items.map(item => {
                  const product = products.filter(
                    p => p.id === item.stockId
                  )[0]
                  totalBag += (item.quantity * product.price * 100) / 100
                  return (
                    <tr key={item.stockId}>
                      <td><img src={product.images[0].imageUrl} alt={product.name} /></td>
                      <td>{product.name}</td>
                      <td>
                        <input
                          type='number'
                          defaultValue={item.quantity}
                          onChange={evt => {
                            item.quantity = Number(evt.target.value)
                          }}
                          min='1'
                          max='100'
                        />
                        <div className="table-button"
                          onClick={() => {
                            handleChange(item)
                          }}
                        >
                          edit
                        </div>
                      </td>
                      <td>{product.price}</td>
                      <td>${(item.quantity * product.price * 100) / 100}</td>
                      <td>
                        <div className="table-button"
                          onClick={() => {
                            removeItems({cartId: cart.id, stockId: item.stockId, setCart: setCart})
                          }}
                        >
                          remove
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='checkOut'>Total Bag ${totalBag}</div>
            <button
              className="checkout-button"
              type='button'
            >
              CHECKOUT
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart;