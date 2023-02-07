import React, { useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import Reviews from './Reviews'
import {postItems, updateItemQuantity} from './updateCart'

const SingleProduct = ({cart, setCart}) => {
  const navigate = useNavigate()
  const params = useParams()
  const [product, setProduct] = useState({})
  const [imagesArray, setImagesArray] = useState([])

  useEffect(() => {
    fetch(`/api/stocks/${params.id}`).then((res) => res.json()).then((data) => {
      setProduct(data)
      setImagesArray(data.images)
    })
  },[params])

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
          cart.items.forEach(item => {
            if (item.stockId === stockId) item.quantity = quantity
          })
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
          cart.items.push({stockId, quantity: value})
        }
      }
      navigate("/")
  };

  function currentDiv(n) {
    let slideIndex = n;
    let x = document.getElementsByClassName('mySlides');
    var dots = document.getElementsByClassName('demo');
    if (n > x.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = x.length;
    }
    for (let i = 0; i < x.length; i++) {
      x[i].className = 'mySlides hide';
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace('opacity-off', '');
    }
    x[slideIndex - 1].className = 'mySlides';
    dots[slideIndex - 1].className =
      'demo opacity opacity-off hover-opacity-off';
  }

  return (
    <div className="main-outline">
      <div className="single-outline">
        <div className="productName">
          {product && product.name && <h1><span>{product.name.toUpperCase()}</span><br/><span>{'$' + product.price}</span></h1>}
          <div className="qty-bar2">
            <span className="qty-text2">QTY</span>
            <input
              type="text"
              className="qty2"
              name={`q${product.id}`}
              defaultValue="1"
            />
            <span
              className="qty-sign2"
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
            onClick={() => {
              submitResult(product.id);
            }}
            type="button"
          >
            ADD TO BAG
          </button>
          <Link to="/">
            <button
              type="button"
              className="back"
            >
              {'<< BACK'}
            </button>
          </Link>
        </div>

        <div className="s-outline">
          {imagesArray[0] &&
            imagesArray.map(m => {
              return (
                <div key={m.id}>
                  <img
                    className={m.id === imagesArray[0].id ? 'mySlides' : 'mySlides hide'}
                    src={m.imageUrl}
                    alt={m.name}
                  />
                </div>
              );
            })}

          <div className="s-row">
            {imagesArray[0] &&
              imagesArray.map((m, i) => {
                return (
                  <div key={m.id}>
                    <img
                      className={
                        i === 0
                          ? 'demo opacity opacity-off hover-opacity-off'
                          : 'demo opacity hover-opacity-off'
                      }
                      src={m.imageUrl}
                      alt={m.name}
                      onClick={() => {
                        currentDiv(i + 1);
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="review">
          <hr />
          <h4>SHIPPING INFO</h4>
          <p>
            This item typically ships within 1-2 business days.
          </p>
          <hr />
          <h4>WHY YOU WANT THIS</h4>
          <p>{product.description}</p>
          <hr />
          <Reviews product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct