import React, {useState, useEffect} from 'react';
import CardView from './CardView';
import SideBar from './SideBar';

const AllProducts = ({products}) => {
  const [filteredProducts, setFilteredProducts] = useState([])
  useEffect(() => {
    setFilteredProducts(products)
  }, [products])
  return (
    <div className="outline">
      <div className="all-outline">
        <SideBar all={products} products={filteredProducts} setFilter={setFilteredProducts} />

        <div className="card-outline">
          {filteredProducts.length ? (
            filteredProducts.map(product => {
              return (
                <div key={product.id}>
                  <CardView product={product} />
                </div>
              );
            })
          ) : (
            <h1>No products!</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts