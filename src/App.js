import React, { useEffect, useState } from 'react'
import {Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'

const App = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('/api/stocks').then((res) => res.json()).then((data) => {
      setProducts(data)
    })
  },[])

  return (
    <>
      <Navbar products={products} />
      <Routes>
        <Route path='/' element={<AllProducts products={products} />} />
        <Route exact path='/product/:id' element={<SingleProduct />} />
      </Routes>
    </>
  );
}

export default App;