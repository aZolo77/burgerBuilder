import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).reduce(
      (sum, igKey) => sum + ingredients[igKey],
      0
    );
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => () => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...ingredients, [type]: updatedCount };
    const priceAddition = INGREDIENT_PRICES[type];
    const updatedPrice = totalPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => () => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    if (oldCount === 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...ingredients, [type]: updatedCount };
    const priceDeduction = INGREDIENT_PRICES[type];
    const updatedPrice = totalPrice - priceDeduction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({
      purchasing: true
    });
  };

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false
    });
  };

  purchaseContinueHandler = () => {
    console.log('Send Order to the Server');
  };

  render() {
    const { ingredients, totalPrice, purchasable, purchasing } = this.state;
    // for disabling Less Buttons
    const disabledInfo = { ...ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={totalPrice}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
