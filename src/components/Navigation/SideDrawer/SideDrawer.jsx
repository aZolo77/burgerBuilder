import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Adj from '../../../hoc/Adj/Adj';

import classes from './SideDrawer.css';

const SideDrawer = ({ closed, open }) => {
  let attachedClasses = open
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];
  return (
    <Adj>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Adj>
  );
};

export default SideDrawer;
