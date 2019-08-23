import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const addIngredient = (state, payload) => {
  const updatedIngredientInc = {
    [payload.ingredientName]: state.ingredients[payload.ingredientName] + 1
  };
  const updatedIngredientsInc = updateObject(
    state.ingredients,
    updatedIngredientInc
  );
  const updatedStateInc = {
    ingredients: updatedIngredientsInc,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.ingredientName],
    building: true
  };
  return updateObject(state, updatedStateInc);
};

const removeIngredient = (state, payload) => {
  if (!state.ingredients[payload.ingredientName]) return state;
  const updatedIngredientDec = {
    [payload.ingredientName]: state.ingredients[payload.ingredientName] - 1
  };
  const updatedIngredientsDec = updateObject(
    state.ingredients,
    updatedIngredientDec
  );
  const updatedStateDec = {
    ingredients: updatedIngredientsDec,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.ingredientName],
    building: true
  };
  return updateObject(state, updatedStateDec);
};

const setIngredients = (state, payload) => {
  const { salad, bacon, cheese, meat } = payload.ingredients;
  return updateObject(state, {
    ingredients: {
      salad,
      bacon,
      cheese,
      meat
    },
    totalPrice: 4,
    error: false,
    building: false
  });
};

const fetchIngsFailed = state => {
  return updateObject(state, { error: true });
};

const rootReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, payload);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, payload);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, payload);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngsFailed(state);

    default:
      return state;
  }
};

export default rootReducer;
