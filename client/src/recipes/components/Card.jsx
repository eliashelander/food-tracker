import React, { useState, useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';

const Card = ({
  recipe, stock, cookRecipe, handleError,
}) => {
  const [notEnoughIngredients, setNotEnoughIngredients] = useState(false);
  const [updateComponent, setUpdateComponent] = useState(false);

  const checkIfEnoughStock = useCallback(() => {
    try {
      const allIngredientsRecipe = recipe.ingredients.map((i) => i.id);
      const allIngredientsStock = stock.map((s) => s.id);
      allIngredientsRecipe.forEach((i) => {
        if (!allIngredientsStock.includes(i)) {
          setNotEnoughIngredients(true);
        }
      });
      recipe.ingredients.forEach((i) => {
        const ingredientToCompare = stock.find((item) => item.id === i.id);
        if (ingredientToCompare.qty < i.qty) {
          setNotEnoughIngredients(true);
        }
      });
    } catch (error) {
      handleError({ fetch: error.message });
    }
  }, [recipe.ingredients, stock, handleError]);

  useEffect(() => {
    checkIfEnoughStock();
  }, [checkIfEnoughStock]);

  const handleClick = () => {
    cookRecipe(recipe.ingredients);
    setUpdateComponent(!updateComponent);
    checkIfEnoughStock();
  };

  return (
    <div className="recipe-group">
      <div className="recipe-left">
        <h2 className="recipe-title">{recipe.title}</h2>
        <p>{recipe.instructions}</p>
        <p>
          {notEnoughIngredients
            ? "You don't have enough ingredients"
            : 'You have all ingredients!'}
        </p>
        <button className="recipe-btn" onClick={handleClick} type="button" disabled={notEnoughIngredients}>Cook</button>
      </div>
      <div className="recipe-right">
        <ul className="recipe-ul">
          {recipe.ingredients.map((i) => (
            <li className="recipe-li" key={i.id}>
              {i.title}
              {' '}
              (
              {i.qty}
              {i.unit}
              )
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Card.propTypes = {
//   recipe: PropTypes.objectOf(PropTypes.object).isRequired,
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

export default Card;
