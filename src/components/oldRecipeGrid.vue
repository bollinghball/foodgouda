<template>
  <div class="mt-10 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
    <RecipeCard v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
  </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue';

export default {
  components: { RecipeCard },
  props: ['recipes'],
};
</script>

<style scoped>
/* Optional: Add styles for column gaps */

</style>
