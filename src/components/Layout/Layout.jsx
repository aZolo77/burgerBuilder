import React from 'react';
import Aux from '../../hoc/Aux';

import classes from './Layout.css';

const Layout = ({ children }) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{children}</main>
  </Aux>
);

export default Layout;
