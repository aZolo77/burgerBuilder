import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

const Layout = ({ children, isAuthenticated }) => {
  const [showSideDrawer, setSideDrawerVisibility] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisibility(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerVisibility(!showSideDrawer);
  };

  return (
    <Fragment>
      <Toolbar
        isAuth={isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={isAuthenticated}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{children}</main>
    </Fragment>
  );
};

const mapStateToProps = ({ auth: { idToken } }) => {
  return {
    isAuthenticated: idToken !== null
  };
};

export default connect(
  mapStateToProps,
  null
)(Layout);
