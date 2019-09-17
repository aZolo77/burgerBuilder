import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const Orders = ({ orders, loading, idToken, userId, onFetchOrders }) => {
  useEffect(() => {
    onFetchOrders(idToken, userId);
  }, [onFetchOrders, idToken, userId]);

  const renderOrders = () => {
    return orders.map(({ id, ingredients, price }) => {
      return <Order key={id} ingredients={ingredients} price={+price} />;
    });
  };

  return <div>{loading ? <Spinner /> : renderOrders()}</div>;
};

const mapStateToProps = ({
  order: { orders, loading },
  auth: { idToken, userId }
}) => {
  return {
    orders,
    loading,
    idToken,
    userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
