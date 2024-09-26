<template>
  <div class="recipe-detail-container p-4 relative">
    <!-- Normal (Portrait) View -->
    <div v-if="!isLandscape" class="normal-view space-y-4">
      <button @click="goBack" class="close-button" aria-label="Close Detailed View">X</button>
      <img
        :src="recipe.image"
        alt="Recipe Image"
        class="w-full h-64 object-cover rounded"
        loading="lazy"
      />
      <div class="flex justify-between items-center my-4">
        <h1 class="text-3xl font-bold">{{ recipe.title }}</h1>
        <FavoriteButton :recipeId="recipe.id" />
      </div>
      <div class="ingredients">
        <h2 class="text-left text-2xl mt-4">Ingredients</h2>
        <ul class="list-disc list-inside">
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
      </div>
      <div class="instructions">
        <h2 class="font-display text-left text-2xl mt-4">Instructions</h2>
        <ol class="text-left font-body text-xl">
          <li v-for="instruction in recipe.instructions" :key="instruction">{{ instruction }}</li>
        </ol>
      </div>
    </div>
    <!-- Landscape View -->
    <div v-else class="landscape-view flex flex-col items-center justify-center space-y-4">
      <button @click="exitLandscape" class="close-button" aria-label="Exit Landscape View">X</button>
      <!-- Inside Landscape View -->
      <div class="instruction-step-container">
        <div class="instruction-step-content p-4 border rounded shadow-lg w-full max-w-md">
          <p class="text-lg">{{ currentStep }}</p>
        </div>
        <div class="step-indicator mt-2">
          Step {{ currentStepIndex + 1 }} of {{ instructionsArray.length }}
        </div>
      </div>
      <div class="recipe-name-and-ingredients text-center">
        <h1 class="text-2xl font-bold">{{ recipe.title }}</h1>
        <div class="ingredients">
          <h2 class="text-xl font-semibold">Ingredients</h2>
          <ul class="list-disc list-inside">
            <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
          </ul>
        </div>
      </div>
      <div
        class="instruction-step p-4 border rounded shadow-lg w-full max-w-md"
        v-if="instructionsArray.length > 1"
        @swipeleft="nextStep"
        @swiperight="prevStep"
      >
        <p class="text-lg">{{ currentStep }}</p>
      </div>
      <div v-else class="instruction-step p-4 border rounded shadow-lg w-full max-w-md">
        <p class="text-lg">{{ currentStep }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
// import axios from 'axios';
// import FavoriteButton from '../components/FavoriteButton.vue';
import { useRouter } from 'vue-router'; // Import Vue Router if not already
import debounce from 'lodash.debounce';


// export default {
//   components: { FavoriteButton },
//   props: ['id'],
//   setup(props) {
//     const recipe = ref({
//       id: null,
//       title: '',
//       image: '',
//       ingredients: [],
//       instructions: [],
//     });

//     const fetchRecipe = async () => {
//       try {
//         // Replace with your chosen API's endpoint and key
//         const response = await axios.get(`https://api.spoonacular.com/recipes/${props.id}/information`, {
//           params: {
//            apiKey,
//           },
//         });
//          console.log(response.data.instructions)

//         recipe.value = {
//           id: response.data.id,
//           title: response.data.title,
//           image: response.data.image,
//           ingredients: response.data.extendedIngredients.map(ing => ing.original),
//           instructions: response.data.instructions.split('\n'),
//         };
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     onMounted(() => {
//       fetchRecipe();
//     });

//     return { recipe };
//   },
// };

export default {
  name: 'RecipeDetail',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    // Reactive property to track orientation
    const isLandscape = ref(window.innerWidth > window.innerHeight);

    // Reactive properties for swipe functionality
    const currentStepIndex = ref(0);
    const currentStep = ref('');

 // Debounced function to update orientation
 const updateOrientation = debounce(() => {
      isLandscape.value = window.innerWidth > window.innerHeight;
    }, 150);

    // Swipe handlers
    const nextStep = () => {
      if (currentStepIndex.value < instructionsArray.value.length - 1) {
        currentStepIndex.value += 1;
        currentStep.value = instructionsArray.value[currentStepIndex.value];
      }
    };

    const prevStep = () => {
      if (currentStepIndex.value > 0) {
        currentStepIndex.value -= 1;
        currentStep.value = instructionsArray.value[currentStepIndex.value];
      }
    };

    // Exit landscape view
    const exitLandscape = () => {
      isLandscape.value = false;
      // Optionally, reset to the first step
      currentStepIndex.value = 0;
      if (instructionsArray.value.length > 0) {
        currentStep.value = instructionsArray.value[0];
      }
    };

    // Navigate back to the homepage
    const goBack = () => {
      router.push({ name: 'HomePage' }); // Ensure 'HomePage' is the correct route name
    };

    // Computed property for instructions array
    const instructionsArray = computed(() => {
      return props.recipe.instructions || [];
    });

    // Initialize the first instruction step
    watch(
      () => props.recipe.instructions,
      (newInstructions) => {
        if (newInstructions.length > 0) {
          currentStep.value = newInstructions[0];
          currentStepIndex.value = 0;
        } else {
          currentStep.value = 'No instructions available.';
        }
      },
      { immediate: true }
    );

    // Event listeners for orientation changes
    onMounted(() => {
      window.addEventListener('resize', updateOrientation);
    });

    onUnmounted(() => {
      window.removeEventListener('resize', updateOrientation);
    });

    return {
      recipe: props.recipe,
      isLandscape,
      currentStep,
      nextStep,
      prevStep,
      exitLandscape,
      goBack,
      instructionsArray,
      currentStepIndex,
    };
  },
};

</script>

<style scoped>
/* Add any specific styles if needed */
.close-button {
  @apply absolute top-4 right-4 text-gray-700 bg-gray-200 rounded-full p-2;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-button:hover {
  @apply bg-gray-300;
}

.recipe-detail-container {
  /* Optional: Adjust container styles as needed */
}

.landscape-view .instruction-step {
  /* Optional: Add specific styles for instruction step in landscape view */
}

.step-indicator {
  @apply text-sm text-gray-600;
}
</style>
