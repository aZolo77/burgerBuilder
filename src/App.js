import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  componentDidMount() {
    const { onTryAutoSignup } = this.props;
    onTryAutoSignup();
  }

  render() {
    const { isAuthenticated } = this.props;
    const routes = !isAuthenticated ? (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={BurgerBuilder} exact />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} exact />
        <Redirect to="/" />
      </Switch>
    );

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = ({ auth: { idToken } }) => {
  return {
    isAuthenticated: idToken !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
