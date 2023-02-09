import React, {useEffect, useState} from 'react'

import {Cart} from './SingleProduct'
import {Product} from './Reviews'

// Getting to this page will get a new cart and saved the old cart with isPurchased = true
// Though purchasing still need to be verified on the payment side from Stripe.com
const ThankYou: React.FunctionComponent<{products: Product[], cart: Cart, setCart: (cart: Cart) => void}> = ({products, cart, setCart}) => {
  let totalBag = 0
  const [purchasedCart, setPurchasedCart] = useState<Cart>(cart)
  useEffect(() => {
    if (cart.items.length > 0) {
      setPurchasedCart(cart)
      fetch('/api/cart/checkout').then((res => res.json())).then((data) => {
        setCart(data)
      })
    }
  },[cart, setCart])
  
  return (
    <>
      <img className='thankYou' src='https://raw.githubusercontent.com/juneidea/Candy/master/ThankYou.png' alt='thankYou' />
      <div className='outline'>
        <div className='cart_container'>
          <h1>
            Thank you for your order!
          </h1>
          {purchasedCart.address && <div className='shipping-card'>
              <p><b>Name: </b>{`${purchasedCart.address.firstName} ${purchasedCart.address.lastName}`}</p>
              <p><b>Address: </b>{`${purchasedCart.address.street}`}</p>
              <p><b>City: </b>{`${purchasedCart.address.city} ${purchasedCart.address.state}, ${purchasedCart.address.zip}`}</p>
          </div>}
          <br />
          {purchasedCart.items[0] &&
            <table id='cart_table'>
              <tbody>
                <tr>
                  <th>#</th>
                  <th>NAME</th>
                  <th>QUANTITY</th>
                  <th>UNIT PRICE</th>
                  <th>ITEM TOTAL</th>
                </tr>
                {products[0] && purchasedCart.items.map(item => {
                  const product = products.filter(
                    p => p.id === item.stockId
                  )[0]
                  if (product) totalBag += (item.quantity * product.price * 100) / 100
                  return (
                    <tr key={item.stockId}>
                      <td><img src={product.images.sort((a, b) => a.id - b.id)[0].imageUrl} alt={product.name} /></td>
                      <td>{product.name}</td>
                      <td>{item.quantity}</td>
                      <td>{product.price}</td>
                      <td>${(item.quantity * product.price * 100) / 100}</td>
                      <td></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          }
          <div className='checkOut'>Total Bag ${totalBag}</div>
        </div>
      </div>
    </>
  )
}

export default ThankYou

