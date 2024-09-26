<!-- src/components/RecipeGrid.vue -->
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
  