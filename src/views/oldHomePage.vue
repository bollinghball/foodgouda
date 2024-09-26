<!-- src/views/HomePage.vue -->
<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Introductory Section -->
    <section class="text-center mt-8 mb-8">
      <h1 class="font-display uppercase text-4xl font-black text-fgBlue mb-4">Welcome to Food Gouda!</h1>
      <p class="font-body text-lg text-gray-700">
        Discover and save your favorite recipes with ease. Whether you're a beginner or a seasoned chef, Food Gouda has something for everyone.
      </p>
    </section>

    <!-- Search Bar -->
    <SearchBar @search="handleSearch" />

    <!-- Loading Indicator -->
    <div v-if="loading" class="flex justify-center mt-8">
      <svg
        class="animate-spin h-8 w-8 text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    </div>

    <!-- Error Message -->
    <div v-else-if="error" class="text-center text-red-500 mt-8">
      {{ error }}
    </div>

    <!-- Recipe Grid -->
    <RecipeGrid v-else :recipes="recipes" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import RecipeGrid from '../components/RecipeGrid.vue';
import { getRandomRecipes, searchRecipes } from '../services/recipeService';

export default {
  name: 'HomePage',
  components: {
    SearchBar,
    RecipeGrid,
  },
  setup() {
    // Reactive state variables
    const recipes = ref([]);
    const loading = ref(true);
    const error = ref(null);

    /**
     * Fetches random recipes from the API.
     */
    const fetchRandomRecipes = async () => {
      loading.value = true;
      error.value = null;
      try {
        const data = await getRandomRecipes(20); // Fetch 20 random recipes
        recipes.value = data.map((recipe) => ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
        }));
      } catch (err) {
        console.error('Error fetching random recipes:', err);
        error.value = 'Unable to load recipes. Please try again later.';
      } finally {
        loading.value = false;
      }
    };

    /**
     * Handles search queries from the SearchBar component.
     * @param {String} query - The search term entered by the user.
     */
    const handleSearch = async (query) => {
      if (!query.trim()) {
        // If the search query is empty, fetch random recipes
        fetchRandomRecipes();
        return;
      }
      loading.value = true;
      error.value = null;
      try {
        const data = await searchRecipes(query, 20); // Search for 20 recipes matching the query
        if (data.length === 0) {
          error.value = 'No recipes found for your search.';
        }
        recipes.value = data.map((recipe) => ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
        }));
      } catch (err) {
        console.error('Error searching recipes:', err);
        error.value = 'Search failed. Please try again later.';
      } finally {
        loading.value = false;
      }
    };

    // Fetch random recipes when the component is mounted
    onMounted(() => {
      fetchRandomRecipes();
    });

    return {
      recipes,
      loading,
      error,
      handleSearch,
    };
  },
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
