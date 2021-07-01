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
    let newStock = stock.stock.map(i => i);
    ingredients.forEach(i => {
      const ingredientToChange = newStock.findIndex(s => s.id === i.id)
      let newQty = newStock[ingredientToChange].qty - i.qty;
      newStock[ingredientToChange] = {
        ...newStock[ingredientToChange],
        qty: newQty
      }
    })
    setStock({ stock: newStock });
  };

  const handleAdd = id => {
    let newStock = stock;
    const ingredientToAdd = stock.stock.findIndex(s => s.id === id);

    let addAmount;
    switch (newStock.stock[ingredientToAdd].unit) {
      case 'g':
        addAmount = 10;
        break;
      case 'pcs':
        addAmount = 1;
        break;
      case 'ml':
        addAmount = 10;
        break;
      case 'dl':
        addAmount = 1;
        break;
      default:
        addAmount = 1;
        break;
    }

    const newQty = parseInt(newStock.stock[ingredientToAdd].qty) + addAmount;

    newStock.stock[ingredientToAdd] = {
      ...newStock.stock[ingredientToAdd],
      qty: newQty
    }

    setStock(newStock);
  }

  const handleSubtract = id => {
     let newStock = stock;
    const ingredientToSubtract = stock.stock.findIndex(s => s.id === id);

    let addAmount;
    switch (newStock.stock[ingredientToSubtract].unit) {
      case 'g':
        addAmount = 10;
        break;
      case 'pcs':
        addAmount = 1;
        break;
      case 'ml':
        addAmount = 10;
        break;
      case 'dl':
        addAmount = 1;
        break;
      default:
        addAmount = 1;
        break;
    }

    let newQty = parseInt(newStock.stock[ingredientToSubtract].qty) - addAmount;

    if(newQty < 0) {
        newQty = 0;
    }

    newStock.stock[ingredientToSubtract] = {
      ...newStock.stock[ingredientToSubtract],
      qty: newQty
    }

    setStock(newStock);
  }

  const handleRemove = id => {
     let newStock = stock;
    const ingredientToRemove = stock.stock.findIndex(s => s.id === id);

    newStock.stock.splice(ingredientToRemove, 1);

    setStock(newStock);
  }

  return (
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
            <Stock
              stock={stock}
              setStock={setStock}
              handleAdd={handleAdd}
              handleSubtract={handleSubtract}
              handleRemove={handleRemove}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
