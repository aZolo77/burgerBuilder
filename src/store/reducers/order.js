import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false
};

const reducer = (state = initialState, { type, upload = {} }) => {
  switch (type) {
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...upload.orderData,
        id: upload.orderId
      };
      return {
        ...state,
        orders: [...state.orders, newOrder],
        loading: false
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

export default reducer;
