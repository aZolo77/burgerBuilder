import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import * as bugerBuilderActions from '../../store/actions/index';
import Adj from '../../hoc/Adj/Adj';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).reduce(
      (sum, igKey) => sum + ingredients[igKey],
      0
    );
    return sum > 0;
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
    const { history } = this.props;
    history.push({
      pathname: '/checkout'
    });
  };

  render() {
    const { purchasing } = this.state;
    const {
      ings,
      price,
      onIngredientAdded,
      onIngredientRemoved,
      error
    } = this.props;

    // for disabling Less Buttons
    const disabledInfo = { ...ings };
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    // showing Spinner while loading data from server
    const orderSummary = !ings ? null : (
      <OrderSummary
        ingredients={ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={price}
      />
    );

    const burger = ings ? (
      <Adj>
        <Burger ingredients={ings} />
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          price={price}
          purchasable={this.updatePurchaseState(ings)}
          ordered={this.purchaseHandler}
        />
      </Adj>
    ) : null;

    const burgerAlternative = error ? (
      <p style={{ textAlign: 'center', color: 'red' }}>
        Ingredients can't be loaded
      </p>
    ) : (
      <Spinner />
    );

    return (
      <Adj>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {ings ? burger : burgerAlternative}
      </Adj>
    );
  }
}

const mapStateToProps = ({
  burgerBuilder: { ingredients, totalPrice, error }
}) => {
  return {
    ings: ingredients,
    price: totalPrice,
    error: error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => () =>
      dispatch(bugerBuilderActions.addIngedient(ingName)),
    onIngredientRemoved: ingName => () =>
      dispatch(bugerBuilderActions.removeIngedient(ingName)),
    onInitIngredients: () => dispatch(bugerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
