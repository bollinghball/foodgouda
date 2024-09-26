<!-- src/components/RecipeCard.vue -->
<template>
    <router-link :to="`/recipe/${recipe.id}`" class="block">
      <div class="border rounded overflow-hidden shadow hover:shadow-lg transition-shadow">
        <img :src="recipe.image" alt="Recipe Image" class="w-full h-48 object-cover" />
        <div class="p-2">
          <h3 class="text-lg font-semibold">{{ recipe.title }}</h3>
        </div>
      </div>
    </router-link>
  </template>
  
  <script>
  export default {
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
  