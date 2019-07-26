import React from 'react';
import NavItem from './NavItem/NavItem';

import classes from './NavigationItems.css';

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/" active>
        Burger Builder
      </NavItem>
      <NavItem link="/checkout">Checkout</NavItem>
    </ul>
  );
};

export default NavigationItems;
