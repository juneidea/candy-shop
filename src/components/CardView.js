import React from 'react';
import {Link} from 'react-router-dom'

import {postItems, updateItemQuantity} from './updateCart'

const CardView = ({product, cart, setCart}) => {
  const addUp = id => {
    const qty = document.getElementsByName(`q${id}`);
    let value = Number(qty[0].value);
    qty[0].value = value + 1;
  };
  const cutDown = id => {
    const qty = document.getElementsByName(`q${id}`);
    let value = Number(qty[0].value);
    if (value > 1) qty[0].value = value - 1;
    else qty[0].value = 1;
  };

  const submitResult = stockId => {
    const qty = document.getElementsByName(`q${stockId}`);
    const value = Number(qty[0].value);
    const cartId = cart.id;
    if (cart.items.filter(stock => stock.stockId === stockId)[0]) {
      const quantity =
        cart.items.filter(stock => stock.stockId === stockId)[0].quantity +
        value;
      if (cartId) {
        updateItemQuantity({
          stockId,
          cartId,
          quantity,
          setCart
        }) 
      } else {
        cart.items.map(item => {
          if (item.stockId === stockId) item.quantity = quantity
        })
        setCart({items: [...cart.items]})
      };
    } else {
      if (cartId) {
        postItems({
          stockId,
          cartId,
          quantity: value,
          setCart
        });
      } else {
        setCart({items: [...cart.items, {stockId, quantity: value}]})
      }
    }
  };

  return (
    <div className="single-card-outline">
      <div className="card">
        <div className="card-img">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.images && product.images.sort((a, b) => a.id - b.id)[0].imageUrl}
              alt={product.name}
            />
          </Link>
        </div>
        <div className="productText">
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
      </div>
      <div className="card-extend">
        <div className="qty-bar">
          <span className="qty-text">QTY</span>
          <input
            type="text"
            className="qty"
            name={`q${product.id}`}
            defaultValue="1"
          />
          <span
            className="qty-sign"
            onClick={() => {
              cutDown(product.id);
            }}
          >
            -
          </span>
          <span
            className="qty-sign"
            onClick={() => {
              addUp(product.id);
            }}
          >
            +
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            submitResult(product.id);
          }}
        >
          <span>ADD TO BAG</span>
        </button>
      </div>
    </div>
  );
};

export default CardView