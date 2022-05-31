require('dotenv').config()
const path= require(`path`)
const { PORT, NODE_ENV } = process.env;

const express = require('express');
const cors = require('cors');
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,`Client`)))
const {
    getRecipes, getSavedRecipes, saveRecipe, deleteRecipe } = require(`./controller`)
app.get(`/`,(req,res)=>{res.sendFile(path.join(__dirname,`Client/index.html`))})
app.get(`/recipes/`, getRecipes)
app.get('/saved-recipes/', getSavedRecipes)
app.post(`/recipe`, saveRecipe)
app.delete(`/recipe/:id`, deleteRecipe)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
