import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavItem.css';

const NavItem = ({ children, link, exact }) => {
  return (
    <li className={classes.NavItem}>
      <NavLink to={link} activeClassName={classes.active} exact={exact}>
        {children}
      </NavLink>
    </li>
  );
};

export default NavItem;
