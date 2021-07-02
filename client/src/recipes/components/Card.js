import React, { useEffect, useState } from 'react';

const Card = ({ recipe, stock, cookRecipe }) => {
    const [notEnoughIngredients, setNotEnoughIngredients] = useState(false);
    const [updateComponent, setUpdateComponent] = useState(false);

    const checkIfEnoughStock = () => {
        try {
            const allIngredientsRecipe = recipe.ingredients.map(i => i.id);
            const allIngredientsStock = stock.stock.map(s => s.id);
            console.log('Reci ingr', allIngredientsRecipe);
            console.log('Stock ingr', allIngredientsStock)
            allIngredientsRecipe.forEach(i => {
                if (!allIngredientsStock.includes(i)) {
                    setNotEnoughIngredients(true);
                    return;
                }
            })
            recipe.ingredients.forEach(i => {
                const ingredientToCompare = stock.stock.find(stock => stock.id === i.id);
                if (ingredientToCompare.qty < i.qty) {
                    setNotEnoughIngredients(true);
                    return;
                }
            })
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        checkIfEnoughStock();
    })

    const handleClick = () => {
        cookRecipe(recipe.ingredients);
        setUpdateComponent(!updateComponent);
    };

    return (
        <div className="recipe-group">
            <div className="recipe-left">
                <h2 className="recipe-title">{recipe.title}</h2>
                <p>{recipe.instructions}</p>
                {notEnoughIngredients ? <p>You don't have enough ingredients</p> : <p>You have all ingredients!</p>}
                <button className="recipe-btn" onClick={handleClick} disabled={notEnoughIngredients}>Cook</button>
            </div>
            <div className="recipe-right">
                <ul className="recipe-ul">
                    {recipe.ingredients.map(i => (
                        <li className="recipe-li" key={i.id}>{i.title} ({i.qty}{i.unit})</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Card;
