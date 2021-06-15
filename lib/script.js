'use strict';

// Get initial recipes
var getRecipes = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var res, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url);

          case 2:
            res = _context.sent;
            _context.next = 5;
            return res.json();

          case 5:
            data = _context.sent;


            //console.log(data.recipes[0].title);
            //console.log (data.recipes[0].analyzedInstructions[0].steps[1].ingredients) // gets array of ingredients of first recipe
            showRecipes(data.recipes);
            //console.log(data.results[0].title)

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRecipes(_x) {
    return _ref.apply(this, arguments);
  };
}();

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

var getIngredients = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
    var res, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            res = fetch('https://api.spoonacular.com/recipes?apiKey=2e29523a99aa4f658af5c757103cc87a&${id}/ingredientWidget.json');
            _context2.next = 3;
            return res;

          case 3:
            data = _context2.sent;

            console.log(data); // logs Response {type: "cors", url: "https://api.spoonacular.com/recipes?apiKey=2e29523…aa4f658af5c757103cc87a&{id}/ingredientWidget.json", redirected: false, status: 200, ok: true, …}

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getIngredients(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//import { API_KEY } from './constants.js' //Cannot use import statement outside a module
//API_KEY = require('constants.js'); //require is not defined

var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search');

var API_URL = 'https://api.spoonacular.com/recipes/random?apiKey=2e29523a99aa4f658af5c757103cc87a&number=15';

//const INGREDIENTS_URL =
'https://api.spoonacular.com/recipes/parseIngredients?apiKey=2e29523a99aa4f658af5c757103cc87a&ingredientList';

//const INGREDIENTS_URL = 'https://api.spoonacular.com/recipes/{id}/ingredientWidget.json'

var SEARCH_API = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=2e29523a99aa4f658af5c757103cc87a&number=15&query=';

getRecipes(API_URL);

function showRecipes(recipes) {
  main.innerHTML = '';

  recipes.forEach(function (recipe) {
    var id = recipe.id,
        title = recipe.title,
        readyInMinutes = recipe.readyInMinutes,
        servings = recipe.servings,
        image = recipe.image,
        dishTypes = recipe.dishTypes,
        instructions = recipe.instructions;
    //console.log(recipe.image);
    //console.log(recipe.dishTypes);
    //console.log(id);
    //Get ingredients
    //getIngredients(recipe.title);

    getIngredients(id);

    // Hide recipes that don’t have an image (however they can still be returned as results from our API call, so there might be fewer than 15 recipes showing)
    if (recipe.image !== undefined) {
      var recipeEl = document.createElement('div');
      recipeEl.classList.add('recipe-card');
      recipeEl.innerHTML = ' <img\n        src="' + image + '"\n        alt=""\n      />\n      <h3 class="recipe-title">' + title + '</h3>\n      <div class="recipe-text">\n        <div class="recipe-info">\n          <p><i class="far fa-clock"></i>' + readyInMinutes + ' min</p>\n          <p><i class="fas fa-utensils"></i>' + servings + ' servings</p>\n          <p><i class="fas fa-book-reader"></i>' + formatDishTypes(recipe.dishTypes) + '</p>\n        </div>\n        <div class="ingredients">\n          <h4>Ingredients</h4>\n          <p>Ingredients list</p>\n        </div>\n        <div class="recipe-instructions">\n          <h4>Cooking Steps</h4>\n          <p>\n            ' + instructions + '\n          </p>\n        </div>\n      </div>';

      main.appendChild(recipeEl);
    }

    // Show content of recipe cards
    var cards = document.querySelectorAll('.recipe-card');

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
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
      cards.forEach(function (card) {
        return card.classList.remove('active');
      });
    }
  });
}

function formatDishTypes(dishes) {
  //console.log(dishes.map(dish => dish.charAt(0).toUpperCase() + dish.slice(1)).join(" - "));
  return dishes.map(function (dish) {
    return dish.charAt(0).toUpperCase() + dish.slice(1);
  }).join(' - ');
}

// Search for new recipes
form.addEventListener('submit', function (e) {
  e.preventDefault();

  var searchTerm = search.value;

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
//       'https://api.spoonacular.com/recipes/parseIngredients?apiKey={API_KEY}&ingredientList=${title}';
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