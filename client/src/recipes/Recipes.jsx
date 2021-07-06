import React from 'react';
import Card from './components/Card';

const Recipes = ({
  recipes, stock, cookRecipe, handleError,
}) => (
  <div className="recipe-wrapper">
    {recipes.recipes.map((recipe) => (
      <Card
        key={recipe.id}
        recipe={recipe}
        stock={stock}
        cookRecipe={cookRecipe}
        handleError={handleError}
      />
    ))}
  </div>
);

export default Recipes;
