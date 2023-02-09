import React, { useEffect, useState } from 'react'
import StateSelector from './StateSelector'

import {Address} from './SingleProduct'

const AddressForm: React.FunctionComponent<{setShipping: (address: Address) => void}> = ({setShipping}) => {
  const defaultAddress = {id: -1, firstName: '', lastName: '', street: '', city: '', state: '', zip: '' }
  const [address, setAddress] = useState<Address>(defaultAddress)
  const [savedAddress, setSavedAddress] = useState<Address[] | []>([])
  useEffect(() => {
    fetch('/api/users/address').then((res) => res.json()).then((data: Address[]) => {
      if (data[0]) {
        setSavedAddress(data.sort((a, b) => b.id - a.id))
      }
    })
  },[])
  useEffect(() => {
    if (savedAddress[0]) {
      setAddress({id: savedAddress[0].id, firstName: savedAddress[0].firstName, lastName: savedAddress[0].lastName, street: savedAddress[0].street, city: savedAddress[0].city, state: savedAddress[0].state, zip: savedAddress[0].zip })
    }
  }, [savedAddress])

  const handleChange = (evt: any) => {
    if (evt.target.name) {
      setAddress({
        ...address,
        [evt.target.name]: evt.target.value
      })
    } else {
      setAddress({
        ...address,
        state: evt.target.value
      })
    }
  }

  const handleSelectChange = (evt: any) => {
    const [address] = savedAddress.filter(
      a => a.id === Number(evt.target.value)
    )
    const { id, firstName, lastName, street, city, state, zip } = address
    setAddress({ id, street, firstName, lastName, city, state, zip })
  }

  const handleSubmit = (evt: any) => {
    evt.preventDefault()
    const { firstName, lastName, street, city, state, zip } = address
    if (firstName && lastName && street && city && state && zip){
      fetch('/api/users/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          firstName, lastName, street, city, state, zip
        })
      }).then((res) => res.json()).then((data) => {
        if (data.length === 1) setSavedAddress([...savedAddress, data])
        setShipping(address)
      })
    }
  }

  const { firstName, lastName, street, city, state, zip } = address
    return (
      <form className='address-info'>
        <h3>Shipping Address</h3>
        <div>
          {savedAddress[0] ? (
            <select onChange={handleSelectChange}>
              {savedAddress.map(a => {
                return (
                  <option value={a.id} key={a.id}>
                    {a.street ? a.street : 'empty street'}{' - '}{a.firstName ? a.firstName : 'empty name'}
                  </option>
                )
              })}
            </select>
          ) : (
            <div />
          )}
        </div>

        <div className='address-row'>
          <div>
            <label htmlFor='First Name'>
              First Name
            </label>
            <input
              name='firstName'
              type='text'
              value={firstName ? firstName : ''}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='Last Name'>
              Last Name
            </label>
            <input
              name='lastName'
              type='text'
              value={lastName ? lastName : ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='address-row'>
          <div>
            <label htmlFor='street'>Street</label>
            <input
              name='street'
              type='text'
              value={street}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor='city'>City</label>
            <input
              name='city'
              type='text'
              value={city}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className='address-row'>
          <div>
            <label htmlFor='state'>State</label>
            <StateSelector callback={handleChange} optionState={state} />
          </div>
          <div>
            <label htmlFor='zip'>Zip</label>
            <input
              name='zip'
              type='number'
              value={zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <button onClick={handleSubmit} className='checkout-button' disabled={!(firstName && lastName && street && city && state && zip)}>
            SAVE ADDRESS
          </button>
        </div>
      </form>
    )
}

export default AddressForm
