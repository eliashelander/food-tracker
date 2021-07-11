import React, { useState, useEffect, useCallback } from 'react';
// import PropTypes from 'prop-types';

const Card = ({
  recipe, stock, cookRecipe,
  handleError,
}) => {
  const [notEnoughIngredients, setNotEnoughIngredients] = useState(false);
  const [updateComponent, setUpdateComponent] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const checkIfEnoughStock = useCallback(() => {
    try {
      if (initialLoad) {
        setInitialLoad(false);
        return;
      }
      const allIngredientsRecipe = recipe.ingredients.map((ingr) => ({
        id: ingr.id,
        qty: ingr.qty,
      }));
      const allIngredientsStock = stock.map((ingr) => ingr.id);
      allIngredientsRecipe.forEach((ingr) => {
        if (!allIngredientsStock.includes(ingr.id)) {
          setNotEnoughIngredients(true);
          return;
        }
        const ingredientToCompare = stock.find((item) => item.id === ingr.id);
        if (ingredientToCompare.qty < parseInt(ingr.qty, 8)) {
          setNotEnoughIngredients(true);
        }
      });
    } catch (err) {
      handleError({
        fetch: true,
        msg: err.message,
      });
    }
  }, [recipe, stock, initialLoad, handleError]);

  useEffect(() => {
    if (initialLoad) {
      setUpdateComponent(!updateComponent);
    }
  }, [notEnoughIngredients, updateComponent, initialLoad]);

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
