import React, { useState } from 'react';
import Ingredient from './components/Ingredient';

const Stock = ({ stock, ingredients, handleAdd, addIngredient, handleSubtract, handleRemove }) => {
    const [updateComponent, setUpdateComponent] = useState(false);

    const handleClick = e => {
        const id = e.target.getAttribute('ingredient-id')
        switch (e.target.value) {
            case 'add':
                handleAdd(id)
                break;
            case 'subtract':
                handleSubtract(id)
                break;
            case 'remove':
                handleRemove(id)
                break;
            default:
                break;
        }
        setUpdateComponent(!updateComponent);
    };

    return (
        <>
            <h1>Stock</h1>
            <ul>
                {stock.stock.map(i => (
                    <li key={i.id}>{i.title} ({i.qty}{i.unit})
                        <button ingredient-id={i.id} value="add" onClick={handleClick}>+</button>
                        <button ingredient-id={i.id} value="subtract" onClick={handleClick}>-</button>
                        <button ingredient-id={i.id} value="remove" onClick={handleClick}>X</button>
                    </li>
                ))}
            </ul>
            <br/>
            {ingredients.ingredients.map(ingredient => (
                <Ingredient key={ingredient.id} ingredient={ingredient} addIngredient={addIngredient} />
            ))}
        </>
    )
}

export default Stock;
