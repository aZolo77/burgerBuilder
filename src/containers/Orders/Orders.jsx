import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
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

const mapStateToProps = ({ order: { orders, loading } }) => {
  return {
    orders,
    loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
