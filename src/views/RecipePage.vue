<!-- src/views/RecipePage.vue -->
<template>
    <div>
      <div class="container mx-auto p-4">
        <div class="relative">
          <button @click="closeDetail" class="absolute top-2 right-2 text-gray-500">X</button>
          
          <!-- Desktop or Portrait Mobile View -->
          <div v-if="!isMobileView || !isLandscape">
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
            <div v-if="currentStep === 0">
              <h2 class="text-xl font-bold">{{ recipe.title }}</h2>
              <h3 class="mt-2 font-semibold">Ingredients:</h3>
              <ul class="list-disc list-inside">
                <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
                  {{ ingredient }}
                </li>
              </ul>
            </div>

            
            <div v-else>
              <h3 class="font-semibold">Step {{ currentStep }}:</h3>
              <p>{{ recipe.instructions[currentStep - 1] }}</p>
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
  import { ref, onMounted, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { doc, getDoc } from 'firebase/firestore'
  import { db } from '../firebase'
  import RecipeDetail from '../components/RecipeDetail.vue'
  
  export default {
    components: { RecipeDetail },
    setup() {
      const recipe = ref({})
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
          recipe.value = { id: docSnap.id, ...docSnap.data() }
        } else {
          console.error('No such recipe!')
        }
      }
  
      const updateOrientation = () => {
        isLandscape.value = window.innerWidth > window.innerHeight
        isMobileView.value = window.innerWidth < 768 // Adjust breakpoint as needed
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
  
      onMounted(() => {
        fetchRecipe()
        updateOrientation()
        window.addEventListener('resize', updateOrientation)
      })
  
      onUnmounted(() => {
        window.removeEventListener('resize', updateOrientation)
      })
  
      return {
        recipe,
        isLandscape,
        isMobileView,
        currentStep,
        onSwipeLeft,
        onSwipeRight,
        closeDetail,
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
  