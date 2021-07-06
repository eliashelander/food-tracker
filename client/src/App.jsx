import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav';
import Recipes from './recipes/Recipes';
import Stock from './stock/Stock';

function App() {
  const [ingredients, setIngredients] = useState({ ingredients: [] });
  const [stock, setStock] = useState({ stock: [] });
  const [recipes, setRecipes] = useState({ recipes: [] });
  const [errors, setErrors] = useState({ fetch: false });

  useEffect(() => {
    axios.get(`${process.env.HOST}/api/recipes`)
      // .then((res) => res.json())
      .then((res) => setRecipes({ recipes: res }));
  }, []);

  useEffect(() => {
    axios.get(`${process.env.HOST}/api/stock`)
      // .then((res) => res.json())
      .then((res) => setStock({ stock: res }));
  }, []);

  useEffect(() => {
    axios.get(`${process.env.HOST}/api/ingredients`)
      // .then((res) => res.json())
      .then((res) => setIngredients({ ingredients: res }));
  }, []);

  const cookRecipe = (ingredientsUsed) => {
    const newStock = stock.stock.map((i) => i);
    ingredientsUsed.forEach((i) => {
      const ingredientToChange = newStock.findIndex((s) => s.id === i.id);
      const newQty = newStock[ingredientToChange].qty - i.qty;
      newStock[ingredientToChange] = {
        ...newStock[ingredientToChange],
        qty: newQty,
      };
    });
    setStock({ stock: newStock });

    // const requestOptions = {
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ stock: newStock }),
    // };
    axios.patch(`${process.env.HOST}/api/stock`, { stock: newStock });
  };

  const handleAdd = (id) => {
    const newStock = stock;
    const ingredientToAdd = stock.stock.findIndex((s) => s.id === id);

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

    const newQty = parseInt(newStock.stock[ingredientToAdd].qty, 10) + addAmount;

    newStock.stock[ingredientToAdd] = {
      ...newStock.stock[ingredientToAdd],
      qty: newQty,
    };

    setStock(newStock);

    // const requestOptions = {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newStock),
    // };
    // fetch('${process.env.HOST}stock', requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => setSuccessMsg({ msg: data.msg }));
    axios.patch(`${process.env.HOST}/api/stock`, newStock);
  };

  const handleSubtract = (id) => {
    const newStock = stock;
    const ingredientToSubtract = stock.stock.findIndex((s) => s.id === id);

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

    let newQty = parseInt(newStock.stock[ingredientToSubtract].qty, 10) - addAmount;

    if (newQty < 0) {
      newQty = 0;
    }

    newStock.stock[ingredientToSubtract] = {
      ...newStock.stock[ingredientToSubtract],
      qty: newQty,
    };

    setStock(newStock);

    // const requestOptions = {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newStock),
    // };
    // fetch(`${process.env.HOST}stock`, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => setSuccessMsg({ msg: data.msg }));
    axios.patch(`${process.env.HOST}/api/stock`, newStock);
  };

  const handleRemove = (id) => {
    const newStock = stock;
    const ingredientToRemove = stock.stock.findIndex((s) => s.id === id);

    newStock.stock.splice(ingredientToRemove, 1);

    setStock(newStock);

    // const requestOptions = {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newStock),
    // };
    // fetch('${process.env.HOST}/api/stock', requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => setSuccessMsg({ msg: data.msg }));
    axios.patch(`${process.env.HOST}/api/stock`, newStock);
  };

  const addIngredient = (id, qty) => {
    const newStock = { stock: stock.stock.map((item) => item) };
    let alreadyStock = false;

    stock.stock.forEach((s) => {
      if (s.id === id) {
        const ingredientToChange = newStock.stock.findIndex((item) => item.id === id);
        const newQty = parseInt(newStock.stock[ingredientToChange].qty, 10) + parseInt(qty, 10);
        newStock.stock[ingredientToChange] = {
          ...newStock.stock[ingredientToChange],
          qty: newQty,
        };
        alreadyStock = true;
      }
    });

    if (!alreadyStock) {
      const ingredientToAdd = ingredients.ingredients.find((i) => i.id === id);
      newStock.stock.push({
        ...ingredientToAdd,
        qty,
      });
    }

    setStock(newStock);

    // const requestOptions = {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newStock),
    // };
    // fetch('${process.env.HOST}stock', requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => setSuccessMsg({ msg: data.msg }));
    axios.patch(`${process.env.HOST}/api/stock`, newStock);
  };

  const handleError = (errorObject) => {
    setErrors({
      ...errors,
      errorObject,
    });
  };

  return (
    <Router>
      <div>
        {errors.fetch
          ? <p>{errors.fetch}</p>
          : ''}
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
              handleError={handleError}
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
