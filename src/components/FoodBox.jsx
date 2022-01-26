import React from 'react';
import { useState } from 'react';

const FoodBox = ({ food, addToTodayFoods }) => {
  const [quantity, setQuantity] = useState(0);
  const { name, calories, image } = food;
  // console.log('food :>> ', food);

  // passing the food to add to today's food with the right quantity 
  const handlePlus = e => {
    // console.log('--- --- handlePlus - e.target :>> ', e.target);
    addToTodayFoods({...food, quantity: quantity});
  };

  return (
    <div>
      <div className="box">
        <article className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={image} alt={name} />
            </figure>
          </div>
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{name}</strong> <br />
                <small>{calories} cal</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <div className="field has-addons">
              <div className="control">
                <input className="input" type="number"
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)} />
              </div>
              <div className="control">
                <button className="button is-info" onClick={handlePlus} >
                  +
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default FoodBox;
