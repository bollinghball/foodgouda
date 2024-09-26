<!-- src/components/FavoriteButton.vue -->
<template>
    <button @click="toggleFavorite" class="text-red-500 focus:outline-none">
      <svg
        v-if="isFavorited"
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 fill-current"
        viewBox="0 0 20 20"
      >
        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3.172 5.172a4 4 0 015.656 0L12 8.343l3.172-3.171a4 4 0 115.656 5.656L12 21.343l-8.828-8.829a4 4 0 010-5.656z"
        />
      </svg>
    </button>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { auth, db } from '../firebase';
  import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
  
  export default {
    props: {
      recipeId: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const isFavorited = ref(false);
      const user = ref(auth.currentUser);
  
      const checkFavorite = async () => {
        if (user.value) {
          const userDocRef = doc(db, "users", user.value.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            isFavorited.value = (userDoc.data().favorites || []).includes(props.recipeId);
          }
        }
      };
  
      const toggleFavorite = async () => {
        if (user.value) {
          const userDocRef = doc(db, "users", user.value.uid);
          if (isFavorited.value) {
            await updateDoc(userDocRef, {
              favorites: arrayRemove(props.recipeId),
            });
            isFavorited.value = false;
          } else {
            await updateDoc(userDocRef, {
              favorites: arrayUnion(props.recipeId),
            });
            isFavorited.value = true;
          }
        } else {
          // Prompt user to log in
          alert("Please log in to favorite recipes.");
        }
      };
  
      onMounted(checkFavorite);
  
      return { isFavorited, toggleFavorite };
    },
  };
  </script>
  
  <style scoped>
  /* Add any specific styles if needed */
  </style>
  