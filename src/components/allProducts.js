import React, {useState, useEffect} from 'react';
import CardView from './CardView';
import SideBar from './SideBar';

const AllProducts = ({products, cart, setCart}) => {
  const [filteredProducts, setFilteredProducts] = useState([])
  useEffect(() => {
    setFilteredProducts(products)
  }, [products])
  return (
    <div className="outline">
      <div className="all-outline">
        <SideBar all={products} products={filteredProducts} setFilter={setFilteredProducts} />

        <div className="card-outline">
          {filteredProducts.length > 2 && filteredProducts.map(product => {
            return (
              <div key={product.id}>
                <CardView product={product} cart={cart} setCart={setCart} />
              </div>
            );
          })}
          {filteredProducts.length === 2 && <>
            <div key={filteredProducts[0].id}>
              <CardView product={filteredProducts[0]} cart={cart} setCart={setCart} />
            </div>
            <div key={filteredProducts[1].id}>
              <CardView product={filteredProducts[1]} cart={cart} setCart={setCart} />
            </div>
            <div className="card-empty" />
          </>}
          {filteredProducts.length === 1 && <>
            <div key={filteredProducts[0].id}>
              <CardView product={filteredProducts[0]} cart={cart} setCart={setCart} />
            </div>
            <div className="card-empty" />
            <div className="card-empty" />
          </>}
          {!filteredProducts.length && <h1 className="no-product">No products!</h1>}
        </div>
      </div>
    </div>
  );
};

export default AllProducts