var express = require('express')
var router = express.Router()

router.get('/ingredients', function (req, res) {
    res.send('All ingredients');
});

router.get('/ingredients/:id', function (req, res) {
    res.send(`One ingredient with id ${req.params.id}`)
})

router.get('/recipes', function (req, res) {
    res.send(`Get all recipes`)
})

router.post('/recipes', function (req, res) {
    res.send(`Add recipe`)
})

router.get('/recipes/:id', function (req, res) {
    res.send(`Get one recipe with id ${req.params.id}`)
})

router.put('/recipes/:id', function (req, res) {
    res.send(`Update recipe with id ${req.params.id}`)
})

router.delete('/recipes/:id', function (req, res) {
    res.send(`Delete recipe with id ${req.params.id}`)
})

router.get('/stock', function (req, res) {
    res.send(`Get all available ingredients in stock`)
})

router.put('/stock', function (req, res) {
    res.send(`Update available ingredients in stock`)
})

module.exports = router;
