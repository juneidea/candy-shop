import React from 'react';
import CardView from './CardView';
import SideBar from './SideBar';

const AllProducts = ({products}) => {
  return (
    <div className="outline">
      <div className="all-outline">
        <SideBar products={products}/>

        <div className="card-outline">
          {products.length ? (
            products.map(product => {
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