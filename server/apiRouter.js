import express from 'express';
import uuid4 from "uuid4";
import fs from 'fs';

const router = express.Router();

const readJson = (path) => {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
};

const saveJson = (data, path) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(path, stringifyData)
}

router.get('/ingredients', function (req, res) {
    const ingredients = readJson('./db/ingredients.json').ingredients;
    res.json(ingredients);
});

router.get('/ingredients/:id', function (req, res) {
    const ingredients = readJson('./db/ingredients.json').ingredients;
    const ingredient = ingredients.find(ing => ing.id === req.params.id);
    res.json(ingredient);
})

router.get('/recipes', function (req, res) {
    const recipes = readJson('./db/db.json').recipes;
    res.json(recipes);
})

router.post('/recipes', function (req, res) {
    const data = readJson('./db/db.json');
    const recipes = data.recipes;
    const recipieToAdd = {
        id: uuid4(),
        title: req.body.title,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients
    }
    const newRecipies = [...recipes, recipieToAdd]
    const newData = {
        ...data,
        recipes: newRecipies
    }
    saveJson(newData, './db/db.json');
    res.status(200);
    res.json({ msg: "Successfully added recipie" });
})

router.get('/recipes/:id', function (req, res) {
    const recipes = readJson('./db/db.json').recipes;
    const recipe = recipes.find(rec => rec.id === req.params.id);
    res.json(recipe);
})

router.patch('/recipes/:id', function (req, res) {
    const data = readJson('./db/db.json');
    const recipe = data.recipes.find(rec => rec.id === req.params.id);
    const recipeIdx = data.recipes.findIndex(rec => rec.id === req.params.id);
    const recipieToUpdate = {
        ...recipe,
        title: req.body.title ? req.body.title : recipe.title,
        instructions: req.body.instructions ? req.body.instructions : recipe.instructions,
        ingredients: req.body.ingredients ? req.body.ingredients : recipe.ingredients
    }
    let newRecipies = data.recipes;
    newRecipies[recipeIdx] = recipieToUpdate;
    const newData = {
        ...data,
        recipes: newRecipies
    }
    saveJson(newData, './db/db.json');
    res.status(200);
    res.json({ msg: "Successfully updated recipie" });
})

router.delete('/recipes/:id', function (req, res) {
    res.send(`Delete recipe with id ${req.params.id}`)
})

router.get('/stock', function (req, res) {
    const stock = readJson('./db/db.json').stock;
    res.json(stock);
})

router.patch('/stock', function (req, res) {
    const data = readJson('./db/db.json');
    const stock = data.stock;
    const newStock = req.body.stock;

    const newData = {
        ...data,
        stock: newStock
    }

    saveJson(newData, './db/db.json');

    res.status(200);
    res.json({ msg: "Successfully updated stock", stock: newStock});
})

export default router;
