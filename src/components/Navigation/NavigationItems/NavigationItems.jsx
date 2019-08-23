import React from 'react';
import NavItem from './NavItem/NavItem';

import classes from './NavigationItems.css';

const NavigationItems = ({ isAuthenticated }) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/" exact>
        Burger Builder
      </NavItem>
      {isAuthenticated ? <NavItem link="/orders">Orders</NavItem> : null}
      {isAuthenticated ? (
        <NavItem link="/logout">Logout</NavItem>
      ) : (
        <NavItem link="/auth">Authenticate</NavItem>
      )}
    </ul>
  );
};

export default NavigationItems;
