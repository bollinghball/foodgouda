<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">My Favorite Recipes</h1>
    <div v-if="favorites.length === 0" class="text-gray-500">
      You have no favorite recipes yet.
    </div>
    <RecipeGrid v-else :recipes="favoriteRecipes" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import RecipeGrid from '../components/RecipeGrid.vue';
import axios from 'axios';
const apiKey = process.env.VUE_APP_SPOONACULAR_API_KEY;

export default {
  components: { RecipeGrid },
  setup() {
    const favorites = ref([]);
    const favoriteRecipes = ref([]);

    const fetchFavorites = async () => {
      if (!auth.currentUser) return;
      const favDoc = doc(db, 'favorites', auth.currentUser.uid);
      const docSnap = await getDoc(favDoc);
      if (docSnap.exists()) {
        favorites.value = docSnap.data().recipes;
        fetchFavoriteRecipes();
      }
    };

    const fetchFavoriteRecipes = async () => {
      try {
        const promises = favorites.value.map(id =>
          axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: { apiKey },
          })
        );
        const responses = await Promise.all(promises);
        favoriteRecipes.value = responses.map(res => ({
          id: res.data.id,
          title: res.data.title,
          image: res.data.image,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      fetchFavorites();
    });

    return { favoriteRecipes, favorites };
  },
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>
