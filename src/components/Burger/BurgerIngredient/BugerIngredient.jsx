import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

const BurgerIngredient = ({ type }) => {
  const renderIngredient = () => {
    switch (type) {
      case 'bread-bottom':
        return <div className={classes.BreadBottom} />;
      case 'bread-top':
        return (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1} />
            <div className={classes.Seeds2} />
          </div>
        );
      case 'meat':
        return <div className={classes.Meat} />;
      case 'cheese':
        return <div className={classes.Cheese} />;
      case 'salad':
        return <div className={classes.Salad} />;
      case 'bacon':
        return <div className={classes.Bacon} />;
      default:
        return null;
    }
  };

  return renderIngredient();
};

BurgerIngredient.propTypes = { type: PropTypes.string.isRequired };

export default BurgerIngredient;
