import {
  API_URL,
  showRecipes,
  getRecipes,
  main,
  favBtn,
  formatArray,
} from './script.mjs';

import { API_KEY } from './constants.mjs';

getRecipes(API_URL);

function createRecipe(recipe) {
  showRecipes(recipe);
  // replace saveBtn with deleteBtn on cards
}

function getLocalStorage() {
  if (localStorage.getItem('favourites')) {
    const favourites = JSON.parse(localStorage.getItem('favourites'));
    favourites.forEach((favourite) => createRecipe(favourite));
  } else {
    return [];
  }
}

getLocalStorage();
