import express from 'express';
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
    res.send(`Add recipe`)
})

router.get('/recipes/:id', function (req, res) {
    const recipes = readJson('./db/db.json').recipes;
    const recipe = recipes.find(rec => rec.id === req.params.id);
    res.json(recipe);
})

router.put('/recipes/:id', function (req, res) {
    res.send(`Update recipe with id ${req.params.id}`)
})

router.delete('/recipes/:id', function (req, res) {
    res.send(`Delete recipe with id ${req.params.id}`)
})

router.get('/stock', function (req, res) {
    const stock = readJson('./db/db.json').stock;
    res.json(stock);
})

router.patch('/stock', function (req, res) {
    res.send(`Update available ingredients in stock`)
})

export default router;
