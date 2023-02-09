import React, {useState} from 'react'
import AddressForm from './AddressForm'
import {Address, Cart} from './SingleProduct'

const Checkout: React.FunctionComponent<{cart: Cart}> = ({cart}) => {
  const defaultAddress = {id: -1, firstName: '', lastName: '', street: '', city: '', state: '', zip: '' }
  const [shipping, setShipping] = useState<Address>(defaultAddress)

  const postPayment = async (evt: any) => {
    evt.preventDefault()
    fetch('/api/payment', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        items: cart.items.map(item => {return {
          id: item.stockId, quantity: item.quantity
        }})
      })
    }).then((res) => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    }).then(({url}) => {
      window.location = url
    })
  }

  return (
    <div className='outline'>
      <div className='checkout-main'>
        <div className='spacer'>
          {!shipping.street ? 
            <AddressForm setShipping={setShipping} />
            : 
            <div className='checkout-form'>
              <div className='shipping-card'>
                <p><b>Name: </b>{`${shipping.firstName} ${shipping.lastName}`}</p>
                <p><b>Address: </b>{`${shipping.street}`}</p>
                <p><b>City: </b>{`${shipping.city} ${shipping.state}, ${shipping.zip}`}</p>
                <div className="shipping-edit" onClick={() => setShipping(defaultAddress)}>Change</div>
              </div>
              <div className='test-payment'>
                <button className="checkout-button" onClick={e => postPayment(e)}>Payment</button>
                <p><small>* Use this test card on your payment</small></p>
                <p><small># 4242 4242 4242 4242</small></p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Checkout