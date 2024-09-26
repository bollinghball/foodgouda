<template>
  <button @click="toggleFavorite" class="focus:outline-none hover:rose-600">
    <svg
      v-if="isFavorite"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-red-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
               4.42 3 7.5 3c1.74 0 3.41 0.81 
               4.5 2.09C13.09 3.81 14.76 3 
               16.5 3 19.58 3 22 5.42 22 
               8.5c0 3.78-3.4 6.86-8.55 
               11.54L12 21.35z" />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 21l-1.45-1.32C5.4 15.36 2 
           12.28 2 8.5 2 5.42 4.42 3 
           7.5 3c1.74 0 3.41 0.81 
           4.5 2.09C13.09 3.81 14.76 
           3 16.5 3 19.58 3 22 5.42 
           22 8.5c0 3.78-3.4 6.86-8.55 
           11.54L12 21z"
      />
    </svg>
  </button>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

export default {
  props: ['recipeId'],
  setup(props) {
    const isFavorite = ref(false);
    const user = ref(auth.currentUser);

    const favoriteRef = () => doc(db, 'favorites', user.value.uid);

    const checkFavorite = async () => {
      if (!user.value) return;
      const docSnap = await getDoc(favoriteRef());
      if (docSnap.exists()) {
        isFavorite.value = docSnap.data().recipes.includes(props.recipeId);
      }
    };

    const toggleFavorite = async () => {
      if (!user.value) {
        alert('Please login to favorite recipes.');
        return;
      }
      const favDoc = favoriteRef();
      if (isFavorite.value) {
        await updateDoc(favDoc, {
          recipes: arrayRemove(props.recipeId),
        });
        isFavorite.value = false;
      } else {
        await setDoc(favDoc, {
          recipes: arrayUnion(props.recipeId),
        }, { merge: true });
        isFavorite.value = true;
      }
    };

    onMounted(() => {
      checkFavorite();
    });

    return { isFavorite, toggleFavorite };
  },
};
</script>

<style scoped>
/* Add any specific styles if needed */

</style>
