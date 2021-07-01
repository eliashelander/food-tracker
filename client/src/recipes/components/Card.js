import React, { useEffect, useState } from 'react';

const Card = ({ recipe, stock, cookRecipe }) => {
    const [notEnoughIngredients, setNotEnoughIngredients] = useState(false);
    const [updateComponent, setUpdateComponent] = useState(false);

    const checkIfEnoughStock = () => {
        recipe.ingredients.forEach(i => {
            const ingredientToCompare = stock.stock.find(stock => stock.id === i.id);
            if (ingredientToCompare.qty < i.qty) {
                setNotEnoughIngredients(true);
            }
        })
    };

    useEffect(() => {
        checkIfEnoughStock();
    })

    const handleClick = () => {
        cookRecipe(recipe.ingredients);
        setUpdateComponent(!updateComponent);
    };

    return (
        <div>
            <h2>{recipe.title}</h2>
            <button onClick={handleClick} disabled={notEnoughIngredients}>Cook</button>
            <ul>
                {recipe.ingredients.map(i => (
                    <li key={i.id}>{i.title} ({i.qty}{i.unit})</li>
                ))}
            </ul>
        </div>
    )
}

export default Card;
