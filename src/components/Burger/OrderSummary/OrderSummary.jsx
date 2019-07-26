import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = ({
  ingredients,
  purchaseCanceled,
  purchaseContinued,
  price = 0
}) => {
  const ingredientSummary = Object.keys(ingredients).map(igKey => {
    if (ingredients[igKey] !== 0) {
      return (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
          {ingredients[igKey]}
        </li>
      );
    }
    return null;
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
