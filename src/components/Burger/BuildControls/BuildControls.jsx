import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = ({
  ingredientAdded,
  ingredientRemoved,
  disabled,
  price,
  purchasable,
  ordered
}) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{price.toFixed(2)}</strong>
      </p>
      {controls.map(({ label, type }) => (
        <BuildControl
          key={type}
          label={label}
          added={ingredientAdded(type)}
          removed={ingredientRemoved(type)}
          disabled={disabled[type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        onClick={ordered}
        disabled={!purchasable}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
