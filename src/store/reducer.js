import * as actionTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};


const rootReducer = (state = initialState, { type, payload }) => {
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

    default:
      return state;
  }
};

export default rootReducer;
