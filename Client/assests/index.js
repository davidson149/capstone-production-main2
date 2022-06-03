const recipeContainer = document.querySelector(`#recipes`);

const recipes = [];
const favorites = [];

const form = document.querySelector("form");

const baseURL = `https://api.edamam.com/search?app_id=d83bf513&app_key=fd37e0b3a9047b1936db99f0ad3c1171&q=`;

function makeRecipeCard(recipe) {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");

  recipeCard.innerHTML = `
  <p class= "label">${recipe.label}</p>
  <img alt='recipe cover image' src='${recipe.image}'/>
  <p class="ingredients">${recipe.ingredients}</p>
  <div class= "save-btn">
  <button onclick="saveRecipe ('${recipe.id}')">Save</button>
  </div>
  `;

  recipeContainer.appendChild(recipeCard);
}

async function getRecipes(event) {
  event.preventDefault();
  const ingredients = document.getElementById(`input`).value;
  const res = await axios.get(
    `http://localhost:4000/recipes/?ingredient=${ingredients}`
  );
  res.data.forEach(({ recipe }) => {
    const recipeID = recipe.uri.split("#");
    const newRecipe = {
      id: recipeID[1],
      label: recipe.label,
      image: recipe.image,
      ingredients: recipe.ingredientLines,
    };
    makeRecipeCard(newRecipe);
  });
}

async function saveRecipe(recipeID) {
  try {
    const res = await axios.post(`http://localhost:4000/recipe/`, { recipeID });
    favorites.push(res.data);
    favorites.forEach((recipe) => {
      favoriteRecipeCard(recipe);
    });
  } catch (error) {
    console.log(error);
  }
}
function favoriteRecipeCard(recipes) {
  const savedRecipesContainer = document.getElementById(`saved`);
  savedRecipesContainer.innerHTML = ``;
  for (let i = 0; i < recipes.length; i++) {
    const recipeObj = recipes[i][0].recipe;
    console.log(recipeObj);
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("favorite-card");
    recipeCard.innerHTML = `
    <p class= "label">${recipeObj.label}</p>
    <img alt='recipe cover image' src='${recipeObj.image}'/>
    <p class="ingredients">${recipeObj.ingredientLines}</p>

    <div class= "del-btn">
    <button onclick="deleteRecipe('${recipeObj.uri}')">Delete</button>
    </div>
    `;

    document.getElementById(`saved`).appendChild(recipeCard);
  }
}
async function getSavedRecipes() {
  const res = await axios.get(`http://localhost:4000/saved-recipes/`);
  favorites.push(res.data);
  favorites.forEach((recipes) => {
    favoriteRecipeCard(recipes);
  });
}
async function deleteRecipe(recipeURI) {
  const res = await axios.delete(
    `http://localhost:4000/recipe/?recipeURI=${recipeURI}`
  );
  favorites.push(res.data);
  favorites.forEach((recipes) => {
    favoriteRecipeCard(recipes);
  });
}
getSavedRecipes();
form.addEventListener(`saved`, saveRecipe);
form.addEventListener(`submit`, getRecipes);
