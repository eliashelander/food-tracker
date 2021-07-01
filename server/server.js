require("dotenv").config();
const express = require('express');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db/db.json')
const db = low(adapter);

const router = require('./apiRouter');

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/api', router)

app.listen(PORT, () => {
    console.log(`server is listening  on ${PORT}`);
});

module.exports = app;