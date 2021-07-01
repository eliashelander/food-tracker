import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Nav from './components/Nav';
import Recipes from './recipes/Recipes';
import Stock from './stock/Stock';

function App() {
  const [ingredients, setIngredients] = useState({ ingredients: [] });
  const [stock, setStock] = useState({ stock: [] });
  const [recipes, setRecipes] = useState({ recipes: [] });

  useEffect(() => {
    fetch("http://localhost:8080/api/recipes")
      .then(res => res.json())
      .then(res => setRecipes({ recipes: res }))
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/api/stock")
      .then(res => res.json())
      .then(res => setStock({ stock: res }))
  }, [])

  const cookRecipe = (ingredients) => {
    let newStock = stock;
    ingredients.forEach(i => {
        const ingredientToChange = stock.stock.findIndex(s => s.id === i.id)
        const newQty = stock.stock[ingredientToChange].qty - i.qty;
        newStock.stock[ingredientToChange] = {
            ...newStock.stock[ingredientToChange],
            qty: newQty
        }
    })
    setStock(newStock);
};

  return (
    // <>
    //   {recipes.recipes.map(recipe => (
    //     <h1 key={recipe.id}>{recipe.title}</h1>
    //   ))}
    // </>
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route path="/recipes">
            <Recipes
              ingredients={ingredients}
              stock={stock}
              setStock={setStock}
              recipes={recipes}
              setRecipes={setRecipes}
              cookRecipe={cookRecipe}
            />
          </Route>
          <Route path="/">
            <Stock stock={stock} setStock={setStock}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
