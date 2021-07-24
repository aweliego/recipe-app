import { API_KEY } from './constants.mjs';

console.log(API_KEY);
console.log(
  `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`
);

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const API_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`;

//const INGREDIENTS_URL =
`https://api.spoonacular.com/recipes/parseIngredients?apiKey=${API_KEY}&ingredientList`;

const SEARCH_API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=15&query=`;

// Get initial recipes
async function getRecipes(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  //console.log(data.recipes[0].title);
  //console.log (data.recipes[0].analyzedInstructions[0].steps[1].ingredients) // gets array of ingredients of first recipe
  showRecipes(data.recipes);

  //console.log(data.results[0].title)
}

getRecipes(API_URL);

// With the parseIngredients endpoint
// async function getIngredients(recipe) {
//   const INGREDIENTS_URL =
//     'https://api.spoonacular.com/recipes/parseIngredients?apiKey=' +
//     API_KEY +
//     '&ingredientList=' +
//     recipe;
//   const res = await fetch(INGREDIENTS_URL, {
//     method: 'POST',
//     // body: JSON.stringify(recipe),
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//   });
//   console.log(res);
//   const data = await res.json();

//   console.log(data);
// }

// With the ingredientsById endpoint
async function getIngredients(id) {
  const res = fetch(
    `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${API_KEY}`
  );
  const data = await res;
  console.log(data.json());
}

function showRecipes(recipes) {
  main.innerHTML = '';

  recipes.forEach((recipe) => {
    const {
      id,
      title,
      readyInMinutes,
      servings,
      image,
      dishTypes,
      instructions,
    } = recipe;
    //console.log(recipe.image);
    //console.log(recipe.dishTypes);
    //console.log(id);

    //Get ingredients
    getIngredients(id);
    //getIngredients(title);

    // Hide recipes that don’t have an image (however they can still be returned as results from our API call, so there might be fewer than 15 recipes showing)
    if (recipe.image !== undefined) {
      const recipeEl = document.createElement('div');
      recipeEl.classList.add('recipe-card');
      recipeEl.innerHTML = ` <img
        src="${image}"
        alt=""
      />
      <h3 class="recipe-title">${title}</h3>
      <div class="recipe-text">
        <div class="recipe-info">
          <p><i class="far fa-clock"></i>${readyInMinutes} min</p>
          <p><i class="fas fa-utensils"></i>${servings} servings</p>
          <p><i class="fas fa-book-reader"></i>${formatDishTypes(
            recipe.dishTypes
          )}</p>
        </div>
        <div class="ingredients">
          <h4>Ingredients</h4>
          <p>Ingredients list</p>
        </div>
        <div class="recipe-instructions">
          <h4>Cooking Steps</h4>
          <p>
            ${instructions}
          </p>
        </div>
      </div>`;

      main.appendChild(recipeEl);
    }

    // Show content of recipe cards
    const cards = document.querySelectorAll('.recipe-card');

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        // console.log(recipe.image);
        // console.log(recipe.readyInMinutes);
        // console.log(recipe.servings);
        // console.log(recipe.dishTypes);
        // console.log(recipe.instructions);

        removeActiveClasses();
        card.classList.add('active');
      });
    });
    function removeActiveClasses() {
      cards.forEach((card) => card.classList.remove('active'));
    }
  });
}

function formatDishTypes(dishes) {
  //console.log(dishes.map(dish => dish.charAt(0).toUpperCase() + dish.slice(1)).join(" - "));
  return dishes
    .map((dish) => dish.charAt(0).toUpperCase() + dish.slice(1))
    .join(' - ');
}

// Search for new recipes
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getRecipes(SEARCH_API + searchTerm);
    //console.log(getRecipes(SEARCH_API + searchTerm))

    search.value = '';
  } else {
    window.location.reload();
  }
});

// Next time:
// try again the getIngredientsbyId(), should work (we just ran out of API calls)
// replace concatenation in URL with template literals
// display ingredients by clicking a button instead of on page load (to save API calls)
// look into https://spoonacular.com/food-api/docs#Get-Recipe-Information to access ingredients
