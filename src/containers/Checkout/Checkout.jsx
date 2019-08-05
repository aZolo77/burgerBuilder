import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { ContactData } from './ContactData/ContactData';

export default class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    },
    price: 0
  };

  componentWillMount() {
    const {
      location: { search }
    } = this.props;

    if (!search.length) return;

    const queryParams = search.slice(1).split('&');
    let price = 0;
    const ingredients = queryParams.reduce((obj, el) => {
      const ingredient = el.split('=');
      if (ingredient[0] === 'price') {
        price = ingredient[1];
        return obj;
      }
      obj[ingredient[0]] = +ingredient[1];
      return obj;
    }, {});

    console.log(ingredients);

    this.setState({ ingredients, price });
  }

  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  };

  render() {
    const { ingredients, price } = this.state;
    const {
      match: { path }
    } = this.props;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={path + '/contact-data'}
          render={props => (
            <ContactData ingredients={ingredients} price={price} {...props} />
          )}
        />
      </div>
    );
  }
}
