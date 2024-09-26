<!-- src/views/Recipe.vue -->
<template>
  <!-- <div class="max-w-4xl mx-auto p-6"> -->
    <div class="recipe-page-container">
      <div v-if="loading" class="text-center text-gray-500">
        Loading recipe details...
      </div>

    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>
    
    <div v-else>
      <!-- <img :src="recipe.image" :alt="recipe.title" class="w-full h-80 object-cover rounded" /> -->
      <RecipeDetail :recipe="recipe" />
      
      <!-- <div class="flex justify-between items-center mt-4">
        <h1 class="font-display text-3xl font-bold">{{ recipe.title }}</h1>
        <FavoriteButton :recipeId="recipe.id" />
      </div>
      
      <div class="mt-6">
        <h2 class="font-display text-left text-2xl font-semibold mb-2">Ingredients</h2>
        <ul class="font-body text-left text-xl list-disc list-inside">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            {{ ingredient }}
          </li>
        </ul>
      </div>
      
      <div class="mt-6">
        <h2 class="font-display text-left text-2xl font-semibold mb-2">Instructions</h2>
        <ol class="text-left text-xl font-body">
          <li v-for="instruction in recipe.instructions" :key="instruction">{{ instruction }}</li>
        </ol>
      </div>
      
      <div v-if="recipe.nutrition" class="mt-6">
        <h2 class="text-2xl font-semibold mb-2">Nutritional Information</h2>
        <ul class="list-disc list-inside">
          <li>Calories: {{ recipe.nutrition.calories }}</li>
          <li>Fat: {{ recipe.nutrition.fat }}g</li>
          <li>Carbohydrates: {{ recipe.nutrition.carbs }}g</li>
          <li>Protein: {{ recipe.nutrition.protein }}g</li> -->
          <!-- Add more nutritional details as needed -->
        <!-- </ul>
      </div> -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getRecipeDetails } from '../services/recipeService';
import FavoriteButton from '../components/FavoriteButton.vue';
import RecipeDetail from '../components/RecipeDetail.vue'; // Import the RecipeDetail component


// export default {
//   name: 'RecipePage',
//   components: {
//     FavoriteButton,
//   },
//   setup() {
//     const route = useRoute();
//     const recipeId = ref(route.params.id);
//     const recipe = ref({});
//     const loading = ref(true);
//     const error = ref(null);

//     const fetchRecipe = async (id) => {
//       loading.value = true;
//       error.value = null;
//       try {
//         const data = await getRecipeDetails(id);
//         recipe.value = {
//           id: data.id,
//           title: data.title,
//           image: data.image,
//           ingredients: data.extendedIngredients.map(ing => ing.original),
//           instructions: data.instructions.split('\n') || 'No instructions available.',
//           nutrition: data.nutrition ? {
//             calories: data.nutrition.nutrients.find(n => n.name === 'Calories')?.amount,
//             fat: data.nutrition.nutrients.find(n => n.name === 'Fat')?.amount,
//             carbs: data.nutrition.nutrients.find(n => n.name === 'Carbohydrates')?.amount,
//             protein: data.nutrition.nutrients.find(n => n.name === 'Protein')?.amount,
//             // Add more as needed
//           } : null,
//         };
//         console.log(data)
//       } catch (err) {
//         console.error('Error fetching recipe:', err);
//         error.value = 'Failed to load recipe details. Please try again later.';
//         recipe.value.instructions = [];
//       } finally {
//         loading.value = false;
//       }
//     };

//     onMounted(() => {
//       fetchRecipe(recipeId.value);
//     });

//     // Watch for route changes if navigating to a different recipe without leaving the page
//     watch(() => route.params.id, (newId) => {
//       if (newId !== recipeId.value) {
//         recipeId.value = newId;
//         fetchRecipe(newId);
//       }
//     });

//     return {
//       recipe,
//       loading,
//       error,
//     };
//   },
// };

export default {
  name: 'RecipePage',
  components: {
    FavoriteButton,
    RecipeDetail, // Register the RecipeDetail component
  },
  setup() {
    const route = useRoute();
    const recipeId = ref(route.params.id);
    const recipe = ref({});
    const loading = ref(true);
    const error = ref(null);

    const fetchRecipe = async (id) => {
      loading.value = true;
      error.value = null;
      try {
        const data = await getRecipeDetails(id);
        recipe.value = {
          id: data.id,
          title: data.title,
          image: data.image,
          ingredients: data.extendedIngredients.map(ing => ing.original),
          instructions: data.instructions
            ? data.instructions.split('\n').filter(step => step.trim() !== '')
            : ['No instructions available.'],
          nutrition: data.nutrition
            ? {
                calories: data.nutrition.nutrients.find(n => n.name === 'Calories')?.amount,
                fat: data.nutrition.nutrients.find(n => n.name === 'Fat')?.amount,
                carbs: data.nutrition.nutrients.find(n => n.name === 'Carbohydrates')?.amount,
                protein: data.nutrition.nutrients.find(n => n.name === 'Protein')?.amount,
                // Add more as needed
              }
            : null,
        };
        console.log(data);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        error.value = 'Failed to load recipe details. Please try again later.';
        recipe.value.instructions = [];
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchRecipe(recipeId.value);
    });

    // Watch for route changes if navigating to a different recipe without leaving the page
    watch(
      () => route.params.id,
      (newId) => {
        if (newId !== recipeId.value) {
          recipeId.value = newId;
          fetchRecipe(newId);
        }
      }
    );

    return {
      recipe,
      loading,
      error,
    };
  },
};



</script>

<style scoped>
/* Example: Add hover effects or additional styling if needed */
.loading-state,
.error-state {
  /* Center the loading and error messages */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  font-size: 1.2rem;
}


.whitespace-pre-line {
  white-space: pre-line;
}
</style>
