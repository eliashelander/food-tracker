import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';
import Nav from './components/Nav';
import Recipes from './recipes/Recipes';
import Stock from './stock/Stock';

dotenv.config({ path: '../.env' });

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [stock, setStock] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [errors, setErrors] = useState({
    fetch: false,
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/recipes`)
      // .then((res) => res.json())
      .then((res) => setRecipes(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/stock`)
      // .then((res) => res.json())
      .then((res) => setStock(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/ingredients`)
      // .then((res) => res.json())
      .then((res) => setIngredients(res.data))
      .catch((err) => console.log(err));
  }, []);

  const cookRecipe = (ingredientsUsed) => {
    const newStock = stock.map((i) => i);
    ingredientsUsed.forEach((i) => {
      const ingredientToChange = newStock.findIndex((s) => s.id === i.id);
      const newQty = newStock[ingredientToChange].qty - i.qty;
      newStock[ingredientToChange] = {
        ...newStock[ingredientToChange],
        qty: newQty,
      };
    });
    setStock(newStock);

    // const requestOptions = {
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ stock: newStock }),
    // };
    axios.patch(`${process.env.REACT_APP_API_URL}/api/stock`, { stock: newStock });
  };

  const handleAdd = (id) => {
    const newStock = stock;
    const ingredientToAdd = stock.findIndex((s) => s.id === id);

    let addAmount;
    switch (newStock[ingredientToAdd].unit) {
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

    const newQty = parseInt(newStock[ingredientToAdd].qty, 10) + addAmount;

    newStock[ingredientToAdd] = {
      ...newStock[ingredientToAdd],
      qty: newQty,
    };

    setStock(newStock);

    // const requestOptions = {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newStock),
    // };
    // fetch('${process.env.REACT_APP_API_URL}stock', requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => setSuccessMsg({ msg: data.msg }));
    axios.patch(`${process.env.REACT_APP_API_URL}/api/stock`, { stock: newStock })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleSubtract = (id) => {
    const newStock = stock;
    const ingredientToSubtract = stock.findIndex((s) => s.id === id);

    let addAmount;
    switch (newStock[ingredientToSubtract].unit) {
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

    let newQty = parseInt(newStock[ingredientToSubtract].qty, 10) - addAmount;

    if (newQty < 0) {
      newQty = 0;
    }

    newStock[ingredientToSubtract] = {
      ...newStock[ingredientToSubtract],
      qty: newQty,
    };

    setStock(newStock);

    // const requestOptions = {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newStock),
    // };
    // fetch(`${process.env.REACT_APP_API_URL}stock`, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => setSuccessMsg({ msg: data.msg }));
    axios.patch(`${process.env.REACT_APP_API_URL}/api/stock`, { stock: newStock })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleRemove = (id) => {
    const newStock = stock;
    const ingredientToRemove = stock.findIndex((s) => s.id === id);

    newStock.splice(ingredientToRemove, 1);

    setStock(newStock);

    // const requestOptions = {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newStock),
    // };
    // fetch('${process.env.REACT_APP_API_URL}/api/stock', requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => setSuccessMsg({ msg: data.msg }));
    axios.patch(`${process.env.REACT_APP_API_URL}/api/stock`, { stock: newStock })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const addIngredient = (id, qty) => {
    const newStock = stock.map((item) => item);
    let alreadyStock = false;

    stock.forEach((s) => {
      if (s.id === id) {
        const ingredientToChange = newStock.findIndex((item) => item.id === id);
        const newQty = parseInt(newStock[ingredientToChange].qty, 10) + parseInt(qty, 10);
        newStock[ingredientToChange] = {
          ...newStock[ingredientToChange],
          qty: newQty,
        };
        alreadyStock = true;
      }
    });

    if (!alreadyStock) {
      const ingredientToAdd = ingredients.find((i) => i.id === id);
      newStock.push({
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
    // fetch('${process.env.REACT_APP_API_URL}stock', requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => setSuccessMsg({ msg: data.msg }));
    axios.patch(`${process.env.REACT_APP_API_URL}/api/stock`, { stock: newStock })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
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
