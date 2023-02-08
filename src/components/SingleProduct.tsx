import React, { useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import Reviews, {Product, Image} from './Reviews'
import {postItems, updateItemQuantity} from './updateCart'

export type CartItems = {
  id: number,
  stockId: number,
  quantity: number,
}

export type Address = {
  id: number,
  firstName: string,
  lastName: string,
  street: string,
  city: string,
  state: string,
  zip: string
}

export type Cart = {
  id: number,
  items: [CartItems],
  address: Address | null,
}

export const addUp = (id: number) => {
  const qty: any = document.getElementsByName(`q${id}`);
  let value = Number(qty[0].value);
  qty[0].value = value + 1;
};
export const cutDown = (id: number) => {
  const qty: any = document.getElementsByName(`q${id}`);
  let value = Number(qty[0].value);
  if (value > 1) qty[0].value = value - 1;
  else qty[0].value = 1;
};

const SingleProduct: React.FunctionComponent<{ cart: Cart , setCart: () => void }> = ({cart, setCart}) => {
  const navigate = useNavigate()
  const params = useParams()
  const [product, setProduct] = useState<Product>()
  const [imagesArray, setImagesArray] = useState<Image[] | []>([])

  useEffect(() => {
    fetch(`/api/stocks/${params.id}`).then((res) => res.json()).then((data) => {
      setProduct(data)
      setImagesArray(data.images)
    })
  },[params])

  const submitResult = (stockId: number) => {
    const qty: any = document.getElementsByName(`q${stockId}`);
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
          cart.items.push({id: cart.id, stockId, quantity: value})
        }
      }
      navigate("/")
  };

  function currentDiv(n: number) {
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
          {product && <div className="qty-bar2">
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
          </div>}
          {product && <button
            onClick={() => {
              submitResult(product.id);
            }}
            type="button"
          >
            ADD TO BAG
          </button>}
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
          {imagesArray.map(m => {
              return imagesArray[0] ? 
              (
                <div key={m.id}>
                  <img
                    className={m.id === imagesArray[0].id ? 'mySlides' : 'mySlides hide'}
                    src={m.imageUrl}
                    alt={m.imageUrl}
                  />
                </div>
              ) : 
              (<></>);
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
                      alt={m.imageUrl}
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
          {product && <p>{product.description}</p>}
          <hr />
          {product && <Reviews product={product} />}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct