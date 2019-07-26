import React from 'react';
import classes from './Button.css';

const Button = ({ children, btnType, clicked = () => {} }) => {
  return (
    <button
      className={[classes.Button, classes[btnType]].join(' ')}
      onClick={clicked}
    >
      {children}
    </button>
  );
};

export default Button;
