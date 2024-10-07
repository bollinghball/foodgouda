<!-- src/components/RecipeDetail.vue -->
<template>
    <div class="border rounded p-6 shadow">
      <img :src="recipe.imageUrl" alt="Recipe Image" class="w-full h-64 object-cover rounded" />
      <div class="mt-4 flex justify-between items-center">
        <h2 class="text-2xl font-black font-display">{{ recipe.title }}</h2>
        <div v-if="recipe && recipe.id">
        <FavoriteButton :recipeId="recipe.id" />
        </div>
        <div v-else>
        Loading...
      </div>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <h3 class="text-display">Skill Level: {{ recipe.skillLevel }}</h3>
        <p class="text-display" v-for="(serving, index) in formattedServing" :key="index">{{ serving }}</p>
      </div>
      <p class="text-left font-body mt-4">{{ recipe.titleDescription }}</p>
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
        <p class="font-body">{{ recipe.notes }}</p>
      </div>
      <p class="mt-4">If you really, really need to know....Total Calories per serving ~{{ recipe.calorieTotal }}</p>
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
    // Computed property to format serving to strings
    formattedServing() {
      if (this.recipe && Array.isArray(this.recipe.servings)) {
      return this.recipe.servings.map(serving => {
        return `${serving.amount ? serving.amount : ''} ${serving.unit ? serving.unit : ''}`.trim();
      });
    }
    return [];
  },
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
  