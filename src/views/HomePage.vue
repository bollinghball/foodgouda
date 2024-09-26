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
      <div class="container mx-auto p-4">
        <SearchBar v-model="searchQuery" />
        <RecipeGrid :recipes="filteredRecipes" />
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted } from 'vue';
  import { db } from '../firebase';
  import { collection, getDocs } from 'firebase/firestore';
  import SearchBar from '../components/SearchBar.vue';
  import RecipeGrid from '../components/RecipeGrid.vue';
  
  export default {
    components: { SearchBar, RecipeGrid },
    setup() {
      const recipes = ref([]);
      const searchQuery = ref('');
  
      const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
        recipes.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched recipes:", recipes.value); // Debugging line
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
  
      onMounted(fetchRecipes);
  
      const filteredRecipes = computed(() => {
        if (!searchQuery.value) return recipes.value;
        return recipes.value.filter(recipe =>
          recipe.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      });
  
      return { recipes, searchQuery, filteredRecipes };
    },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles if needed */
  </style>
  