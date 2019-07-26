import React from 'react';
import classes from './NavItem.css';

const NavItem = ({ children, link, active = false }) => {
  return (
    <li className={classes.NavItem}>
      <a href={link} className={active ? classes.active : null}>
        {children}
      </a>
    </li>
  );
};

export default NavItem;
