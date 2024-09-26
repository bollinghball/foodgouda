<!-- src/views/ProfilePage.vue -->
<template>
    <div>
      <div class="container mx-auto p-4">
        <h1 class="text-2xl font-black mb-4 font-display">My Favorites</h1>
        <div v-if="loading" class="text-center">Loading...</div>
        <div v-else>
          <div v-if="favorites.length > 0">
            <RecipeGrid :recipes="favoriteRecipes" />
          </div>
          <div v-else>
            <p>You have no favorite recipes yet.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { auth, db } from '../firebase';
  import { doc, getDoc } from 'firebase/firestore';
  import RecipeGrid from '../components/RecipeGrid.vue';
  import { collection, query, where, getDocs } from 'firebase/firestore';
  
  export default {
    components: { RecipeGrid },
    setup() {
      const favorites = ref([]);
      const favoriteRecipes = ref([]);
      const loading = ref(true);
  
      const fetchFavorites = async () => {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            favorites.value = userDocSnap.data().favorites || [];
            if (favorites.value.length > 0) {
              // Fetch recipe details for each favorite
              const recipesCollection = collection(db, "recipes");
              const q = query(recipesCollection, where('__name__', 'in', favorites.value.slice(0, 10)));
              const querySnapshot = await getDocs(q);
              favoriteRecipes.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            }
          }
        }
        loading.value = false;
      };
  
      onMounted(() => {
        fetchFavorites();
      });
  
      return {
        favorites,
        favoriteRecipes,
        loading,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles if needed */
  </style>
  