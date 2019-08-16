import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case actionTypes.PURCHASE_INIT:
      return updateObject(state, { purchased: false });
    case actionTypes.FETCH_ORDERS_START:
    case actionTypes.PURCHASE_BURGER_START:
      return updateObject(state, { loading: true });
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: payload.orders, loading: false });
    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(payload.orderData, { id: payload.orderId });
      return updateObject(state, {
        orders: [...state.orders, newOrder],
        loading: false,
        purchased: true
      });
    case actionTypes.PURCHASE_BURGER_FAIL:
      return updateObject(state, { loading: false });

    default:
      return state;
  }
};

export default reducer;
