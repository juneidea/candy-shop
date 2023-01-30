import React, { useEffect, useState } from 'react'
import {Routes, Route, useNavigate } from 'react-router-dom'

import Navbar from './components/Navbar'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import Login from './components/Login'

const App = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [userName, setUserName] = useState()
  useEffect(() => {
    fetch('/api/stocks').then((res) => res.json()).then((data) => {
      setProducts(data)
    })
  },[])

  const userSubmit = event => {
    event.preventDefault()
    fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({        
        password: event.target[1].value,
        email: event.target[0].value,
        username: event.target[0].value,
        guest: event.target[2].checked
      })
    }).then((res) => res.json()).then((data) => {
      sessionStorage.setItem("candyStar", data.username);
      setUserName(data.username)
      navigate("/")
    })
  }

  return (
    <>
      <Navbar userName={userName} />
      <Routes>
        <Route path='/' element={<AllProducts products={products} />} />
        <Route exact path='/product/:id' element={<SingleProduct />} />
        <Route path='/login' element={<Login handleSubmit={userSubmit} error={{}} />} />
      </Routes>
    </>
  );
}




export default App;