const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const API_URL =
  'https://api.spoonacular.com/recipes/random?apiKey=2e29523a99aa4f658af5c757103cc87a&number=15';

//const INGREDIENTS_URL =
('https://api.spoonacular.com/recipes/parseIngredients?apiKey=2e29523a99aa4f658af5c757103cc87a&ingredientList');

//const INGREDIENTS_URL = 'https://api.spoonacular.com/recipes/{id}/ingredientWidget.json'

const SEARCH_API =
  'https://api.spoonacular.com/recipes/complexSearch?apiKey=2e29523a99aa4f658af5c757103cc87a&number=15&query="';

// Get initial recipes
async function getRecipes(url) {
  const res = await fetch(url);
  const data = await res.json();

  //console.log(data.recipes[0].title);
  //console.log (data.recipes[0].analyzedInstructions[0].steps[1].ingredients) // gets array of ingredients of first recipe
  showRecipes(data.recipes);
  //console.log(data.results[0].title)
}

getRecipes(API_URL);

// async function getIngredients(recipe) {
//   const INGREDIENTS_URL =
//     'https://api.spoonacular.com/recipes/parseIngredients?apiKey=2e29523a99aa4f658af5c757103cc87a&ingredientList={recipe}';
//   const res = await fetch(INGREDIENTS_URL, {
//     method: 'POST',
//     body: JSON.stringify(recipe),
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//   });
//   //console.log(res);
//   const data = await res.json();

//   console.log(data); // logs error 400 "We're so sorry, something went wrong. If this error persists, please contact us."
// }

async function getIngredients(id) {
  const res = fetch(
    'https://api.spoonacular.com/recipes/{id}/ingredientWidget.json'
  );
  const data = await res.json();
  console.log(data); // logs error 404
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
    //getIngredients(recipe.title);

    getIngredients(id);

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

// const xhr = new XMLHttpRequest();
//     const url =
//       'https://api.spoonacular.com/recipes/parseIngredients?apiKey=2e29523a99aa4f658af5c757103cc87a&ingredientList=${title}';
//     const data = JSON.stringify({ id: '200' });

//     //xhr.responseType = 'json';
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === XMLHttpRequest.DONE) {
//         //console.log(data);
//         console.log(xhr.responseText); // {"status":"failure", "code":400,"message":"The form parameter 'ingredientList' must not be null."}
//       }
//     };

//     xhr.open('POST', url);
//     //xhr.setRequestHeader("Accept", "application/json");
//     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//     xhr.send(data);
