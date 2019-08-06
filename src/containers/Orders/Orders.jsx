import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

export class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(({ data }) => {
        const orders = [];
        for (const key in data) {
          orders.push({
            ...data[key],
            id: key
          });
        }
        this.setState({
          loading: false,
          orders
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        console.log(err);
      });
  }

  renderOrders = () => {
    const { orders } = this.state;
    return orders.map(
      ({ id, customer, deliveryMethod, ingredients, price }) => {
        return <Order key={id} ingredients={ingredients} price={+price} />;
      }
    );
  };

  render() {
    const { loading } = this.state;
    return <div>{loading ? <Spinner /> : this.renderOrders()}</div>;
  }
}

export default withErrorHandler(Orders, axios);
