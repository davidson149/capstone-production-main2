const axios = require('axios')

let allRecipes = []

let favorites = []

const baseURL = `https://api.edamam.com/search?app_id=d83bf513&app_key=fd37e0b3a9047b1936db99f0ad3c1171&q=`;

module.exports = {
    getRecipes: async (req, res) => {
        const response = await axios.get(baseURL + req.query.ingredient)
        allRecipes = response.data.hits
        res.status(200).send(allRecipes)
    },

    getSavedRecipes: (req, res) => {
        res.status(200).send(favorites)
    },
    deleteRecipe: (req, res) => {
        let index = favorites.findIndex(elem => elem.id === +req.params.id)
        favorites.splice(index, 1)
        res.status(200).send(favorites)
    },

    saveRecipe: (req, res) => {
        console.log('test')
        const { recipeID } = req.body
        const recipe = allRecipes.filter(({recipe}) => recipe.uri.includes(recipeID))
        favorites.push(recipe)
        res.status(200).send(favorites)
    }
}
