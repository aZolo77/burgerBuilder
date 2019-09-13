import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

// * асинхронная подгрузка компонентов (Lazy Loading)
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = ({ isAuthenticated, onTryAutoSignup }) => {
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  const routes = !isAuthenticated ? (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" component={BurgerBuilder} exact />
      <Redirect to="/" />
    </Switch>
  ) : (
    <Switch>
      <Route path="/checkout" render={() => <Checkout />} />
      <Route path="/orders" render={() => <Orders />} />
      <Route path="/logout" component={Logout} />
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/" component={BurgerBuilder} exact />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
};

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
