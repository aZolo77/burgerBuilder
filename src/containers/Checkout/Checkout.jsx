import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    history.replace('/checkout/contact-data');
  };

  render() {
    const { ingredients } = this.props;
    const {
      match: { path }
    } = this.props;

    const summary = ingredients ? (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={path + '/contact-data'} component={ContactData} />
      </div>
    ) : (
      <Redirect to="/" />
    );

    return summary;
  }
}

const mapStateToProps = ({ burgerBuilder: { ingredients } }) => {
  return {
    ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
