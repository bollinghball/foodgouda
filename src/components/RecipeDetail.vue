<!-- src/components/RecipeDetail.vue -->
<template>
    <div class="border rounded p-4 shadow">
      <img :src="recipe.imageUrl" alt="Recipe Image" class="w-full h-64 object-cover rounded" />
      <div class="mt-4 flex justify-between items-center">
        <h2 class="text-2xl font-black font-display">{{ recipe.title }}</h2>
        <FavoriteButton :recipeId="recipe.id" />
      </div>
      <div class="mt-4 text-left">
        <h3 class="text-xl font-semibold font-display">Ingredients:</h3>
        <ul class="list-disc list-inside font-body">
          <li v-for="(ingredient, index) in formattedIngredients" :key="index">{{ ingredient }}</li>
        </ul>
      </div>
      <div class="mt-4 text-left">
        <h3 class="text-xl font-semibold font-display">Instructions:</h3>
        <ol class="list-decimal list-inside font-body">
          <li v-for="(instruction, index) in formattedInstructions" :key="index">{{ instruction }}</li>
        </ol>
      </div>
      <div class="mt-4 text-left" v-if="recipe.notes">
        <h3 class="text-xl font-semibold font-display">Notes:</h3>
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
    computed: {
    // Computed property to format ingredients as strings
    formattedIngredients() {
      return this.recipe.ingredients.map(ingredient => {
        let detailString = ingredient.detail != null ? `, ${ingredient.detail}` : '';
        let ingrdstr = `${ingredient.amount} ${ingredient.unit} of ${ingredient.name}${detailString}`
        return ingrdstr
        // return `${ingredient.amount ? ingredient.amount : ''} ${ingredient.unit ? ingredient.unit : ''} ${ingredient.name ? ingredient.name : ''} ${ingredient.detail ? ingredient.detail : ''}`.trim();
      });
    },
    // Computed property to format instructions as strings
    formattedInstructions() {
      return this.recipe.instructions.map(instruction => instruction.description);
    },
  },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles if needed */
  </style>
  