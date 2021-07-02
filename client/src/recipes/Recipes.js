import React, { useEffect } from 'react';
import Card from './components/Card';

const Recipes = ({ recipes, setRecipes, stock, cookRecipe }) => {
    return (
        <div className="recipe-wrapper">
            {recipes.recipes.map(recipe => (
                <Card key={recipe.id} recipe={recipe} stock={stock} cookRecipe={cookRecipe} />
            ))}
        </div>
    )
}

export default Recipes;
