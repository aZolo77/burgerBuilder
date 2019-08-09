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

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      const { ingredients } = state;
      const { ingredientName } = payload;
      return {
        ...state,
        ingredients: {
          ...ingredients,
          [ingredientName]: ingredients[ingredientName] + 1
        }
      };
    case actionTypes.REMOVE_INGREDIENT:
      const { ingredients } = state;
      const { ingredientName } = payload;
      if (!ingredients[ingredientName]) return state;
      return {
        ...state,
        ingredients: {
          ...ingredients,
          [ingredientName]: ingredients[ingredientName] - 1
        }
      };

    default:
      return state;
  }
};

export default rootReducer;
