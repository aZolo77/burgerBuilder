import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../axios-orders';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from '../../store/actions/index';
import Adj from '../../hoc/Adj/Adj';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const BurgerBuilder = ({ history }) => {
  const [purchasing, setPurchasing] = useState(false);

  // * [useSelector] react hook instead of [mapStateToProps]
  const { ings, price, error, isAuthenticated } = useSelector(
    ({
      burgerBuilder: { ingredients, totalPrice, error },
      auth: { idToken }
    }) => {
      return {
        ings: ingredients,
        price: totalPrice,
        error: error,
        isAuthenticated: idToken !== null
      };
    }
  );

  // * [useDispatch] react hook instead of [mapDispatchToProps]
  const dispatch = useDispatch();

  const onIngredientAdded = ingName => () =>
    dispatch(actions.addIngedient(ingName));
  const onIngredientRemoved = ingName => () =>
    dispatch(actions.removeIngedient(ingName));
  const onInitIngredients = useCallback(
    () => dispatch(actions.initIngredients()),
    [dispatch]
  );
  const onInitPurchase = () => dispatch(actions.purchaseInit());
  const onSetRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).reduce(
      (sum, igKey) => sum + ingredients[igKey],
      0
    );
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetRedirectPath('/checkout');
      history.push({
        pathname: '/auth'
      });
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
    history.push({
      pathname: '/checkout'
    });
  };

  // for disabling Less Buttons
  const disabledInfo = { ...ings };
  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] === 0;
  }

  // showing Spinner while loading data from server
  const orderSummary = !ings ? null : (
    <OrderSummary
      ingredients={ings}
      purchaseCanceled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={price}
    />
  );

  const burger = ings ? (
    <Adj>
      <Burger ingredients={ings} />
      <BuildControls
        isAuth={isAuthenticated}
        ingredientAdded={onIngredientAdded}
        ingredientRemoved={onIngredientRemoved}
        disabled={disabledInfo}
        price={price}
        purchasable={updatePurchaseState(ings)}
        ordered={purchaseHandler}
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
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {ings ? burger : burgerAlternative}
    </Adj>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
