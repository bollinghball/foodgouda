<!-- src/components/RecipeDetail.vue -->
<template>
    <div class="border rounded p-4 shadow">
      <img :src="recipe.image" alt="Recipe Image" class="w-full h-64 object-cover rounded" />
      <div class="mt-4 flex justify-between items-center">
        <h2 class="text-2xl font-bold">{{ recipe.title }}</h2>
        <FavoriteButton :recipeId="recipe.id" />
      </div>
      <div class="mt-4">
        <h3 class="text-xl font-semibold">Ingredients:</h3>
        <ul class="list-disc list-inside">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">{{ ingredient }}</li>
        </ul>
      </div>
      <div class="mt-4">
        <h3 class="text-xl font-semibold">Instructions:</h3>
        <ol class="list-decimal list-inside">
          <li v-for="(instruction, index) in recipe.instructions" :key="index">{{ instruction }}</li>
        </ol>
      </div>
      <div class="mt-4" v-if="recipe.notes">
        <h3 class="text-xl font-semibold">Notes:</h3>
        <p>{{ recipe.notes }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import FavoriteButton from './FavoriteButton.vue';
  
  export default {
    components: { FavoriteButton },
    props: {
      recipe: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles if needed */
  </style>
  