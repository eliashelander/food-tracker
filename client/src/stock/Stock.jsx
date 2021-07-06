import React, { useState } from 'react';
import Ingredient from './components/Ingredient';

const Stock = ({
  stock, ingredients, handleAdd, addIngredient, handleSubtract, handleRemove,
}) => {
  const [updateComponent, setUpdateComponent] = useState(false);

  const handleClick = (e) => {
    const id = e.target.getAttribute('ingredient-id');
    switch (e.target.value) {
      case 'add':
        handleAdd(id);
        break;
      case 'subtract':
        handleSubtract(id);
        break;
      case 'remove':
        handleRemove(id);
        break;
      default:
        break;
    }
    setUpdateComponent(!updateComponent);
  };

  return (
    <section className="stock-wrapper">
      <h1 className="stock-title">Stock</h1>
      <ul className="stock-ul">
        {stock.stock.map((i) => (
          <li className="stock-li" key={i.id}>
            <div className="stock-li__left">
              {i.title}
            </div>
            <div className="stock-li__right">
              <span className="stock-li__qty">
                {i.qty}
                {' '}
                {i.unit}
              </span>
              <div className="stock-li__buttons-wrapper">
                <button className="stock-btn stock-btn__add" type="button" ingredient-id={i.id} value="add" onClick={handleClick}>+</button>
                <button className="stock-btn stock-btn__subtract" type="button" ingredient-id={i.id} value="subtract" onClick={handleClick}>-</button>
                <button className="stock-btn stock-btn__remove" type="button" ingredient-id={i.id} value="remove" onClick={handleClick}>X</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <section className="ingredients-wrapper">
        <h2>Add new ingredients</h2>
        {ingredients.ingredients.map((ingredient) => (
          <Ingredient key={ingredient.id} ingredient={ingredient} addIngredient={addIngredient} />
        ))}
      </section>
    </section>
  );
};

export default Stock;
