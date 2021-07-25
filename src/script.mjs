import { API_KEY } from './constants.mjs';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const API_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=2`;

//const SEARCH_API = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=2&query=`;

// Get initial recipes
async function getRecipes(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  showRecipes(data.recipes);
}

getRecipes(API_URL);

function showRecipes(recipes) {
  main.innerHTML = '';

  recipes.forEach((recipe) => {
    const {
      title,
      readyInMinutes,
      servings,
      image,
      dishTypes,
      instructions,
      extendedIngredients,
    } = recipe;

    const getIngredients = () =>
      extendedIngredients.map((ingredient) => ingredient.name);

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
          <p><i class="fas fa-book-reader"></i>${formatArray(dishTypes)}</p>
        </div>
        <div class="ingredients">
          <h4>Ingredients</h4>
          <p>${formatArray(getIngredients())}</p>
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
        removeActiveClasses();
        card.classList.add('active');
      });
    });
    function removeActiveClasses() {
      cards.forEach((card) => card.classList.remove('active'));
    }
  });
}

const formatArray = (array) =>
  array.map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join(' - ');

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
