<!-- src/views/RecipePage.vue -->
<template>
    <div>
      <div class="container mx-auto p-4">
        <div class="relative">
          <button @click="closeDetail" class="absolute top-2 right-2 text-black font-display">X</button>
          
          <!-- Desktop or Portrait Mobile View -->

          
          <!-- <div v-if="!isMobileView || !isLandscape"> -->
            <div v-if="!isLandscape">
            <RecipeDetail :recipe="recipe" />
          </div>
          
          <!-- Landscape Mobile View with Swipe -->
          <div
            v-else
            v-touch:swipe.left="onSwipeLeft"
            v-touch:swipe.right="onSwipeRight"
            class="p-4 swipe-area"
          >
          <div class="mt-2 text-center text-sm text-gray-500">
            Step {{ currentStep }} of {{ recipe.instructions.length }}
          </div>
          <transition name="fade" mode="out-in">
            <div v-if="recipe.ingredients && recipe.instructions">
              <div v-if="currentStep === 0">
                <h2 class="text-xl font-bold mt-4">{{ recipe.title }}</h2>
                <p class="mt-2 font-body">{{ recipe.titleDescription }}</p>
                <h3 class="mt-2 font-semibold text-left">Ingredients:</h3>
                <ul class="list-disc list-inside text-left font-body">
                  <li v-for="(ingredient, index) in formattedIngredients" :key="index">
                    {{ ingredient }}
                  </li>
                </ul>
                <p class="font-body text-left mt-4"><strong>Note:</strong> {{ recipe.notes }}</p>
              </div>
              <div v-else>
                <h3 class="font-semibold mt-6">Step {{ currentStep }}:</h3>
                <p class="mt-4 font-body text-left">{{ formattedInstructions[currentStep - 1] }}</p>
              </div>
            </div>
        </transition>
            <div class="mt-4 text-center text-sm text-gray-500">
              Swipe left/right to navigate steps
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { doc, getDoc } from 'firebase/firestore'
  import { db } from '../firebase'
  import RecipeDetail from '../components/RecipeDetail.vue'
  
  export default {
    components: { RecipeDetail },
    setup() {
      const recipe = ref({
        ingredients: [],
        instructions: [],
      })
      const isLandscape = ref(false)
      const isMobileView = ref(false)
      const currentStep = ref(0)
      const router = useRouter()
      const route = useRoute()
  
      const fetchRecipe = async () => {
        const recipeId = route.params.id
        const docRef = doc(db, 'recipes', recipeId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          recipe.value = { id: docSnap.id, ...docSnap.data() };
            console.log('Loaded recipe:', recipe.value); // Debugging line
            console.log(docSnap.data()) 
          } else {
            console.error('No such recipe!');
          }
      }

      watch(isLandscape, (newVal) => {
        // When isLandscape changes to true, reset currentStep to 0
        if (newVal) {
          currentStep.value = 0
        }
      })
  
      const isLastStep = computed(() => currentStep.value === recipe.value.instructions.length);

      const updateOrientation = () => {
        isLandscape.value = window.innerWidth > window.innerHeight
        isMobileView.value = window.innerWidth < 768 // Adjust breakpoint as needed
        console.log(`Orientation updated: Landscape: ${isLandscape.value}, Mobile: ${isMobileView.value}`); // Debugging log

      }
  
      const onSwipeLeft = () => {
        if (currentStep.value < recipe.value.instructions.length) {
          currentStep.value += 1
        }
      }
  
      const onSwipeRight = () => {
        if (currentStep.value > 0) {
          currentStep.value -= 1
        }
      }
  
      const closeDetail = () => {
        router.push('/')
      }

    const formattedIngredients = computed(() => 
      recipe.value.ingredients && Array.isArray(recipe.value.ingredients)
        ? recipe.value.ingredients.map(ingredient => {
            // Safely handle possible null or undefined fields
            const amount = ingredient.amount ? ingredient.amount : '';
            const unit = ingredient.unit ? ingredient.unit : '';
            const name = ingredient.name ? ingredient.name : '';
            const detail = ingredient.detail ? `(${ingredient.detail})` : '';

            return `${amount} ${unit} ${name} ${detail}`.trim();
          })
        : []
    );

    const formattedInstructions = computed(() =>
      recipe.value.instructions && Array.isArray(recipe.value.instructions)
        ? recipe.value.instructions.map(instruction => instruction.description || '')
        : []
    );
  
      onMounted(() => {
        fetchRecipe()
        updateOrientation()
        window.addEventListener('resize', updateOrientation)
        window.addEventListener('orientationchange', updateOrientation);
      })
  
      onUnmounted(() => {
        window.removeEventListener('resize', updateOrientation)
        window.removeEventListener('orientationchange', updateOrientation);
      })
  
      return {
        recipe,
        formattedIngredients,
        formattedInstructions,
        isLandscape,
        isMobileView,
        currentStep,
        onSwipeLeft,
        onSwipeRight,
        closeDetail,
        isLastStep
      }
    },
  }
  </script>
  
  <style scoped>
  .swipe-area {
    user-select: none;
    /* For example, a border or background color */
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>
  