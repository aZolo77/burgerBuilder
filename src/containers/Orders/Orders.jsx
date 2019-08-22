import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
  componentDidMount() {
    const { idToken } = this.props;
    this.props.onFetchOrders(idToken);
  }

  renderOrders = () => {
    const { orders } = this.props;
    return orders.map(({ id, orderData, ingredients, price }) => {
      return <Order key={id} ingredients={ingredients} price={+price} />;
    });
  };

  render() {
    const { loading } = this.props;
    return <div>{loading ? <Spinner /> : this.renderOrders()}</div>;
  }
}

const mapStateToProps = ({ order: { orders, loading }, auth: { idToken } }) => {
  return {
    orders,
    loading,
    idToken
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: token => dispatch(actions.fetchOrders(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
