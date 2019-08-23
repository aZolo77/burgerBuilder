import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: {
      orders
    }
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    payload: {
      error
    }
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    payload: {
      orderId: id,
      orderData
    }
  };
};

export const purchaseBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    payload: { error }
  };
};

// * async
export const purchaseBurger = (orderData, token = null) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post(`/orders.json?auth=${token}`, orderData) // firebase endpoint
      .then(response => {
        // console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
      })
      .catch(err => {
        dispatch(purchaseBurgerFail(err));
      });
  };
};

export const fetchOrders = (token = null, userId = null) => {
  return dispatch => {
    dispatch(fetchOrdersStart());

    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

    axios
      .get('/orders.json' + queryParams) // ** sending token & userId to firebase
      .then(({ data }) => {
        const orders = [];
        for (const key in data) {
          orders.push({
            ...data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(orders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
