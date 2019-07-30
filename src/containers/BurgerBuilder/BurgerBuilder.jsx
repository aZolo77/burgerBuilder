import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// 3d libs
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(({ data }) => {
        const { ingredients } = this.state;
        if (!ingredients) this.setState({ ingredients: data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

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

  // Send Order to the Database
  purchaseContinueHandler = () => {
    const { ingredients, totalPrice } = this.state;
    this.setState({
      loading: true
    });
    const order = {
      ingredients,
      price: totalPrice,
      customer: {
        name: 'Zollo',
        address: {
          street: 'Test street 1',
          zipcode: '123456',
          country: 'Russia'
        },
        email: 'test@gmail.com'
      },
      deliveryMethod: 'fastest'
    };

    axios
      .post('/orders.json', order) // firebase endpoint
      .then(response => {
        console.log(response);
        this.setState({
          loading: false,
          purchasing: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          loading: true,
          purchasing: false
        });
      });
  };

  render() {
    const {
      ingredients,
      totalPrice,
      purchasable,
      purchasing,
      loading,
      error
    } = this.state;
    // for disabling Less Buttons
    const disabledInfo = { ...ingredients };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    // showing Spinner while loading data from server
    const orderSummary = !ingredients ? null : (
      <OrderSummary
        ingredients={ingredients}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={totalPrice}
      />
    );

    const burger = (
      <Aux>
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

    const burgerAlternative = error ? (
      <p style={{ textAlign: 'center', color: 'red' }}>
        Ingredients can't be loaded
      </p>
    ) : (
      <Spinner />
    );

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {loading ? <Spinner /> : orderSummary}
        </Modal>
        {ingredients ? burger : burgerAlternative}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
