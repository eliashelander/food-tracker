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
  const [successMsg, setSuccessMsg] = useState({ msg: '' });

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

  useEffect(() => {
    fetch("http://localhost:8080/api/ingredients")
      .then(res => res.json())
      .then(res => setIngredients({ ingredients: res }))
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

    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: newStock })
    };
    fetch('http://localhost:8080/api/stock', requestOptions)
      .then(response => response.json())
      .then(data => setSuccessMsg({ msg: data.msg }));
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

    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStock)
    };
    fetch('http://localhost:8080/api/stock', requestOptions)
      .then(response => response.json())
      .then(data => setSuccessMsg({ msg: data.msg }));
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

    if (newQty < 0) {
      newQty = 0;
    }

    newStock.stock[ingredientToSubtract] = {
      ...newStock.stock[ingredientToSubtract],
      qty: newQty
    }

    setStock(newStock);

    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStock)
    };
    fetch('http://localhost:8080/api/stock', requestOptions)
      .then(response => response.json())
      .then(data => setSuccessMsg({ msg: data.msg }));
  }

  const handleRemove = id => {
    let newStock = stock;
    const ingredientToRemove = stock.stock.findIndex(s => s.id === id);

    newStock.stock.splice(ingredientToRemove, 1);

    setStock(newStock);

    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStock)
    };
    fetch('http://localhost:8080/api/stock', requestOptions)
      .then(response => response.json())
      .then(data => setSuccessMsg({ msg: data.msg }));
  }

  const addIngredient = (id, qty) => {
    let newStock = { stock: stock.stock.map(i => i)};
    let alreadyStock = false;

    stock.stock.forEach(s => {
      if (s.id === id) {
        const ingredientToChange = newStock.stock.findIndex(stock => stock.id === id)
        let newQty = parseInt(newStock.stock[ingredientToChange].qty) + parseInt(qty);
        newStock.stock[ingredientToChange] = {
          ...newStock.stock[ingredientToChange],
          qty: newQty
        }
        alreadyStock = true;
      }
    })

    if (!alreadyStock) {
      const ingredientToAdd = ingredients.ingredients.find(i => i.id === id)
      newStock.stock.push({
        ...ingredientToAdd,
        qty
      })
    }
    
    setStock(newStock);

    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStock)
    };
    fetch('http://localhost:8080/api/stock', requestOptions)
      .then(response => response.json())
      .then(data => setSuccessMsg({ msg: data.msg }));
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
              ingredients={ingredients}
              addIngredient={addIngredient}
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

// Add recipie
// Update recipie
// Tell when out of stock in recipe
// Style
// Refactor and handle api endpoints with error and so on
