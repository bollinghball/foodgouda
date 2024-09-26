// src/services/recipeService.js
import axios from 'axios';

// const apiKey = process.env.VUE_APP_SPOONACULAR_API_KEY;

const apiKey = '6a351731a7f54fd8bf92d69192d2fc45';

export const getRandomRecipes = async (number = 20) => {
  const response = await axios.get('https://api.spoonacular.com/recipes/random', {
    params: { number, apiKey },
  });
  return response.data.recipes;
};

export const searchRecipes = async (query, number = 20) => {
  const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
    params: { query, number, apiKey },
  });
  return response.data.results;
};

export const getRecipeDetails = async (id) => {
  const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
    params: { apiKey },
  });
  return response.data;
};
