import React, { useEffect, useState } from 'react'
import {Routes, Route, useNavigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import AllProducts from './components/AllProducts'
import SingleProduct, {Cart as CartType}  from './components/SingleProduct'
import Login from './components/Login'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Thankyou from './components/ThankYou'
import {post, replaceCart} from './components/updateCart'
import Admin from './admin/Admin'
import {Product} from './components/Reviews'

const App: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[] | []>([])
  const [cart, setCart] = useState<CartType>({id: null, items: [], address: null})
  useEffect(() => {
    fetch('/api/stocks').then((res) => res.json()).then((data) => {
      setProducts(data)
    })
    if (sessionStorage.getItem('candyStar')) {
      fetch('/api/cart/user').then((res) => res.json()).then((savedCart) => {
        setCart(savedCart)
      })
    }
  },[])

  const userSubmit = (evt: any) => {
    evt.preventDefault()
    fetch('/auth/login', {
      ...post,
      body: JSON.stringify({        
        password: evt.target[1].value,
        email: evt.target[0].value,
        username: evt.target[0].value,
        guest: evt.target[2].checked
      })
    }).then((res) => res.json()).then((data) => {
      if (data.isAdmin) {
        sessionStorage.setItem('candyStar', 'admin')
      } else {
        sessionStorage.setItem('candyStar', data.username)
      }
      replaceCart(cart, setCart)
      navigate("/")
    })
  }

  const userLogout = () => {
    fetch('/auth/logout', {
      ...post,
    }).then(() => {
      sessionStorage.removeItem('candyStar')
      setCart({id: null, items: [], address: null})
      navigate("/")
    })
  }

  return (
    <>
      <Navbar userLogout={userLogout} cart={cart} />
      <Routes>
        <Route path='/' element={<AllProducts products={products} cart={cart} setCart={setCart}/>} />
        <Route path='/product/:id' element={<SingleProduct cart={cart} setCart={setCart} />} />
        <Route path='/login' element={<Login handleSubmit={userSubmit} />} />
        <Route path='/cart' element={<Cart products={products} cart={cart} setCart={setCart} />} />
        <Route path='/checkout' element={<Checkout cart={cart} />} />
        <Route path='/thankyou' element={<Thankyou products={products} cart={cart} setCart={setCart} />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;