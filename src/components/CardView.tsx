import React from 'react';
import {Link} from 'react-router-dom'

import {postItems, updateItemQuantity} from './updateCart'
import {addUp, cutDown, Cart} from './SingleProduct'
import {Product} from './Reviews'

const CardView: React.FunctionComponent<{product: Product, cart: Cart, setCart: (cart: Cart) => void }> = ({product, cart, setCart}) => {
  const submitResult = (stockId: number) => {
    const qty: any = document.getElementsByName(`q${stockId}`);
    const value = Number(qty[0].value);
    const cartId = cart.id;
    if (cart.items.filter(stock => stock.stockId === stockId)[0]) {
      const quantity =
        cart.items.filter(stock => stock.stockId === stockId)[0].quantity +
        value;
      if (cartId >= 0) {
        updateItemQuantity({
          stockId,
          cartId,
          quantity,
          setCart
        }) 
      } else {
        cart.items.forEach(item => {
          if (item.stockId === stockId) item.quantity = quantity
        })
        setCart({id: cart.id, items: [...cart.items], address: cart.address})
      };
    } else {
      if (cartId >= 0) {
        postItems({
          stockId,
          cartId,
          quantity: value,
          setCart
        })
      } else {
        cart.items.push({id: -1, stockId, quantity: value})
        setCart({id: cart.id, items: cart.items, address: cart.address})
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