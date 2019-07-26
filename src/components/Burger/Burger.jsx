import React from 'react';
import classes from './Burger.css';
import BugerIngredient from './BurgerIngredient/BugerIngredient';

const Burger = ({ ingredients }) => {
  // возвращаем массив из ингредиентов
  const transformedingredients = Object.keys(ingredients)
    .map(igKey => {
      return [...Array(ingredients[igKey])].map((_, i) => (
        <BugerIngredient key={igKey + i} type={igKey} />
      ));
    })
    .reduce((arr, el) => [...arr, ...el], []);

  return (
    <div className={classes.Burger}>
      <BugerIngredient type="bread-top" />
      {transformedingredients.length ? (
        transformedingredients
      ) : (
        <p>Please start adding ingredients!</p>
      )}
      <BugerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
