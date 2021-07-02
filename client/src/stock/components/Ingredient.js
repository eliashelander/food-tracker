import React, { useState } from 'react'

const Ingredient = ({ ingredient, addIngredient }) => {

    const [inputValues, setInputValues] = useState({
        quantity: ''
    })


    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        addIngredient(ingredient.id, inputValues.quantity)
      };
    

    return (
        <div>
            <p>{ingredient.title}</p>
            <form onSubmit={handleSubmit} action="post">
                <label htmlFor="quantity">How much?</label>
                <input name="quantity" onChange={handleOnChange} id="quantity" type="number" value={inputValues.quantity} /><span>{ingredient.unit}</span>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default Ingredient;
