import React from 'react';
import { Link } from 'react-router-dom';

const CardView = props => {
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
    const cartId = props.info.id;
    const value = Number(qty[0].value);

    if (props.cart.filter(stock => stock.stockId === stockId)[0]) {
      const quantity =
        props.cart.filter(stock => stock.stockId === stockId)[0].quantity +
        value;
      props.updateItemQuantity({
        stockId,
        cartId,
        quantity
      });
    } else {
      props.postItems(cartId, {
        stockId,
        cartId,
        quantity: value
      });
    }
  };

  const { product } = props;

  function sortImages(images) {
    let min = 1000;
    let ans = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i].id < min) min = images[i].id;
    }
    for (let j = 0; j < images.length; j++) {
      if (images.filter(im => im.id === min)[0]) {
        ans.push(images.filter(im => im.id === min)[0]);
        min += 1;
      } else {
        min += 1;
        j--;
      }
    }
    return ans;
  }

  return (
    <div className="single-card-outline">
      <div className="card">
        <div className="card-img">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.images && sortImages(product.images)[0].imageUrl}
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
            submitResult(product.id, product.price);
          }}
        >
          <span>ADD TO BAG</span>
        </button>
      </div>
    </div>
  );
};

export default CardView