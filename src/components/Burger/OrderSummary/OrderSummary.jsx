import React, { Component } from 'react';
import Adj from '../../../hoc/Adj/Adj';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // componentWillUpdate() {
  //   console.log('OrderSummary was updated');
  // }

  render() {
    const {
      ingredients,
      purchaseCanceled,
      purchaseContinued,
      price
    } = this.props;

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
      <Adj>
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
      </Adj>
    );
  }
}

export default OrderSummary;
