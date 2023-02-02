import React, {useState} from 'react'
import AddressForm from './AddressForm'

const Checkout = () => {
  const [shipping, setShipping] = useState({street: ''})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { token } = await this.props.stripe.createToken({ name: 'purchase' })
    let response = await fetch('/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: token.id
    })

    if (response.ok) {
      //
    }
  }

  return (
    <div className='outline'>
      <div className='checkout-main'>
        <div className='spacer'>
          {!shipping.street ? 
            <AddressForm setShipping={setShipping} />
            : 
            <form className='checkout-form'>
              <div className='checkout-send'>
              {`${shipping.street} - ${shipping.firstName}`}
                <button onClick={e => handleSubmit(e)}>Send</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}

export default Checkout