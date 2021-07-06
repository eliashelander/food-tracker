import React, { useState } from 'react';

const Ingredient = ({ ingredient, addIngredient }) => {
  const [inputValues, setInputValues] = useState({
    quantity: '',
  });
  const [updateComponent, setUpdateComponent] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addIngredient(ingredient.id, inputValues.quantity);
    setUpdateComponent(!updateComponent);
    setInputValues({ quantity: '' });
  };

  return (
    <div className="ingredients-group">
      <div className="ingredients-left">
        <img className="ingredients-img" src={ingredient.imageUrl} alt="" />
      </div>
      <div className="ingredients-right">
        <h4 className="ingredients-title">{ingredient.title}</h4>
        <form className="ingredients-form" onSubmit={handleSubmit} action="post">
          <label className="ingredients-form__label" htmlFor="quantity">
            Amount?
            <input className="ingredients-form__input" name="quantity" onChange={handleOnChange} id="quantity" type="number" value={inputValues.quantity} />
          </label>
          <span>{ingredient.unit}</span>
          <button className="ingredients-form__btn" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default Ingredient;
