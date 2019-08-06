import React from 'react';

import classes from './Order.css';

const Order = ({ ingredients, price }) => {
  const ingredientsArr = [];

  for (const key in ingredients) {
    ingredientsArr.push({
      name: key,
      amount: ingredients[key]
    });
  }

  const ingredientOutput = ingredientsArr.map(({ name, amount }) => (
    <span
      key={name + amount}
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
    >
      {name} ({amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>
        <u>Ingredients</u>: {ingredientOutput}
      </p>
      <p>
        <u>Price</u>: <strong>USD {price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
