import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";
import Adj from "../../hoc/Adj/Adj";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

// 3d libs
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then(({ data }) => {
    //     const { ingredients } = this.state;
    //     if (!ingredients) this.setState({ ingredients: data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
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
      pathname: "/checkout"
    });
  };

  render() {
    const { ings, price, onIngredientAdded, onIngredientRemoved } = this.props;
    const { purchasing, loading, error } = this.state;
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

    const burger = (
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
    );

    const burgerAlternative = error ? (
      <p style={{ textAlign: "center", color: "red" }}>
        Ingredients can't be loaded
      </p>
    ) : (
      <Spinner />
    );

    return (
      <Adj>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {loading ? <Spinner /> : orderSummary}
        </Modal>
        {ings ? burger : burgerAlternative}
      </Adj>
    );
  }
}

const mapStateToProps = ({ ingredients, totalPrice }) => {
  return {
    ings: ingredients,
    price: totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredientName => () =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredientName }
      }),
    onIngredientRemoved: ingredientName => () =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredientName }
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
