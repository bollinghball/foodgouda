<!-- src/components/RecipeGrid.vue -->
<template>
    <h2 class="font-display font-black text-left text-xl">All Recipes</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-8">
      <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </template>
  
  <script>
  import RecipeCard from './RecipeCard.vue';
  
  export default {
    components: { RecipeCard },
    props: {
      recipes: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles if needed */
  </style>
  