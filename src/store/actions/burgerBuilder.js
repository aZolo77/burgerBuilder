import * as actionTypes from './actionTypes';

export const addIngedient = ingredientName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { ingredientName }
  };
};

export const removeIngedient = ingredientName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: { ingredientName }
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: { ingredients }
  };
};

export const fetchIngredientsFailed = error => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => ({
  type: actionTypes.INIT_INGREDIENTS
});
