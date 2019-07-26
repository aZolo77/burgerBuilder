import React from 'react';

import classes from './Logo.css';

// receives the path of the image
import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="burger-logo" />
  </div>
);

export default Logo;
