import React, {useEffect, useState} from 'react';

import Stars from './Stars';

export type Rating = {
  id: number,
  rating_num: number,
  review_text: string
}

export type Image = {
  id: number
  imageUrl: string
}

export type Category = {
  id: number, 
  category_name: string
}

export type Product = {
  id: number,
  name: string,
  description: string,
  quantity: number,
  price: number,
  ratings: Rating[],
  images: Image[],
  categories: Category[]
}

const Reviews: React.FunctionComponent<{ product: Product }> = ({product}) => {
  const [ratings, setRatings] = useState<Rating[] | []>([])
  const [r_text, setR_text] = useState('')
  const [r_num, setR_num] = useState(0)
  useEffect(() => {
    setRatings(product.ratings)
  },[product])
  return (
    <div className="review">
      {ratings && ratings[0] ? (
        ratings.map(rating => {
          const { review_text, rating_num, id } = rating;
          return (
            <div key={`key${id}`}>
              <Stars stars={rating_num} />
              <p>{review_text}</p>
            </div>
          );
        })
      ) : (
        <p>No Reviews Yet</p>
      )}
      {ratings && ratings[0] && <hr />}
      <form
        onSubmit={evt => {
          evt.preventDefault();
          fetch('/api/reviews', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              review_text: r_text,
              stockId: product.id,
              rating_num: r_num
            })
          }).then((res) => res.json()).then((newRating: Rating) => {
            setRatings([...ratings, newRating])
          })
        }}
      >
        <h4>WHAT DID YOU THINK?</h4>
        <span>Stars:</span>
        <input
          className="input"
          type="number"
          min="1"
          max="5"
          onChange={evt => setR_num(Number(evt.target.value))}
          value={r_num}
        />
        <br />
        <input
          className="input"
          type="text"
          onChange={evt => setR_text(evt.target.value)}
          value={r_text}
        />
        <br />
        <button className="checkout-button" type="submit" disabled={r_num === 0 || !r_text}>Post Review</button>
      </form>
    </div>
  );
}

export default Reviews;