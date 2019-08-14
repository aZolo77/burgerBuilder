import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const rootReducer = (state = initialState, { type, payload = {} }) => {
  const { ingredients, totalPrice } = state;
  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...ingredients,
          [payload.ingredientName]: ingredients[payload.ingredientName] + 1
        },
        totalPrice: totalPrice + INGREDIENT_PRICES[payload.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      if (!ingredients[payload.ingredientName]) return state;
      return {
        ...state,
        ingredients: {
          ...ingredients,
          [payload.ingredientName]: ingredients[payload.ingredientName] - 1
        },
        totalPrice: totalPrice - INGREDIENT_PRICES[payload.ingredientName]
      };
    case actionTypes.SET_INGREDIENTS:
      const { salad, bacon, cheese, meat } = payload.ingredients;
      return {
        ...state,
        ingredients: {
          salad,
          bacon,
          cheese,
          meat
        },
        error: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default rootReducer;
