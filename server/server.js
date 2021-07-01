require("dotenv").config();
const express =require('express');
const cors = require('cors');
 
const apiRouter = require('./apiRouter');
 
const app = express();
 
 
 
const PORT= process.env.PORT;
 
app.use(express.json());
app.use(cors());
 
app.use('/apiRouter',apiRouter)
 
app.listen(PORT, ()=>{
    console.log(`server is listening  on ${PORT}`);
});
 
module.exports = app;