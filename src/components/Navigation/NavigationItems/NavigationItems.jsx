import React from 'react';
import NavItem from './NavItem/NavItem';

import classes from './NavigationItems.css';

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/" exact>
        Burger Builder
      </NavItem>
      <NavItem link="/orders">Orders</NavItem>
      <NavItem link="/auth">Authenticate</NavItem>
    </ul>
  );
};

export default NavigationItems;
