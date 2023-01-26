import React, { useEffect, useState } from 'react'
import {Routes, Route } from 'react-router-dom'

import { Navbar } from './components'
import AllProducts from './components/allProducts'

const App = () => {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('api/stocks').then((res) => res.json()).then((data) => {
      setProducts(data)
    })
  },[])

  return (
    <Routes>
      <Route path='/' element={<Navbar products={products} />} />
      <Route path='/home' element={<AllProducts products={products}/>} />
    </Routes>
  );
}



export default App;
