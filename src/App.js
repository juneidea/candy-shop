import React, { useEffect, useState } from 'react'
import {Routes, Route, useNavigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import Login from './components/Login'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import {post, replaceCart} from './components/updateCart'

const App = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [userName, setUserName] = useState()
  const [cart, setCart] = useState({items: []})
  useEffect(() => {
    fetch('/api/stocks').then((res) => res.json()).then((data) => {
      setProducts(data)
    })
  },[])

  const userSubmit = event => {
    event.preventDefault()
    fetch('/auth/login', {
      ...post,
      body: JSON.stringify({        
        password: event.target[1].value,
        email: event.target[0].value,
        username: event.target[0].value,
        guest: event.target[2].checked
      })
    }).then((res) => res.json()).then((data) => {
      setUserName(data.username)
      replaceCart(cart, setCart)
      navigate("/")
    })
  }

  const userLogout = () => {
    fetch('/auth/logout', {
      ...post,
    }).then(() => {
      setUserName(undefined)
      setCart({items: []})
      navigate("/")
    })
  }

  return (
    <>
      <Navbar userName={userName} userLogout={userLogout} cart={cart} />
      <Routes>
        <Route path='/' element={<AllProducts products={products} cart={cart} setCart={setCart}/>} />
        <Route exact path='/product/:id' element={<SingleProduct cart={cart} setCart={setCart} />} />
        <Route path='/login' element={<Login handleSubmit={userSubmit} error={{}} />} />
        <Route path='/cart' element={<Cart products={products} cart={cart} setCart={setCart} userName={userName} />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;