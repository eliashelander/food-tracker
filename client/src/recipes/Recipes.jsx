import React from 'react';
// import PropTypes from 'prop-types';
import Card from './components/Card';

const Recipes = ({
  recipes, stock, cookRecipe, handleError,
}) => (
  <div className="recipe-wrapper">
    {recipes.map((recipe) => (
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

// Recipes.propTypes = {
//   recipes: PropTypes.arrayOf(PropTypes.array).isRequired,
//   stock: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     title: PropTypes.string.isRequired,
//     imageUrl: PropTypes.string.isRequired,
//     unit: PropTypes.string.isRequired,
//     qty: PropTypes.string.isRequired,
//   })).isRequired,
//   cookRecipe: PropTypes.func.isRequired,
//   handleError: PropTypes.func.isRequired,
// };

export default Recipes;
