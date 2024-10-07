<!-- src/components/NavBar.vue -->
<template>
    <nav class="flex justify-between items-center p-4 bg-white">
        <div class="flex items-center">
            <img class="appLogo" alt="food gouda logo" src="../assets/food gouda cheese logo.png">
            <router-link to="/" class="font-display uppercase text-fgBlue text-2xl font-black lowercase">Food Gouda</router-link>
        </div>

        <!-- Hamburger Menu Icon (visible only on mobile) -->
        <button @click="toggleMenu" class="block lg:hidden text-fgBlue z-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <!-- Full Navigation Menu (visible on desktop and when mobile menu is open) -->
        <div :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="w-full lg:w-auto lg:flex content-center uppercase absolute lg:relative top-0 right-0 bg-white p-4 lg:p-0">
          <router-link to="/blog" class="block lg:inline-block text-fgBlue mr-4 font-display font-black hover:text-fgLiteBlue">Blog</router-link>
          <router-link to="/profile" class="block lg:inline-block text-fgBlue mr-4 font-display font-black hover:text-fgLiteBlue">Profile</router-link>
          <div class="block lg:inline-block text-fgBlue mr-4 font-display font-black hover:text-fgLiteBlue">
            <button v-if="!user" @click="login" class="">Login</button>
            <button v-else @click="logout" class="">Logout</button>
          </div>
         </div>
    </nav>
</template>


<script>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default {
  name: 'NavBar',
  setup() {
    const user = inject('user');
    const router = useRouter();

    // New state for controlling the mobile menu
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    // Login with Google
    const login = async () => {
      try {
        const result = await signInWithPopup(auth, provider);
        const currentUser = result.user;

        // Reference to the user document in Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);

        // Check if user document exists
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          // Create a new user document
          await setDoc(userDocRef, {
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            favorites: [], // Initialize favorites as an empty array
            createdAt: new Date(),
          });
        }
      } catch (error) {
        console.error("Error during sign in:", error);
        alert("Failed to sign in. Please try again.");
      }
    };

    // Logout remains the same
    const logout = async () => {
        try {
            await signOut(auth);
            // Optionally, redirect to Home page after logout
            router.push('/');
        } catch (error) {
            console.error("Error during sign out:", error);
            alert("Failed to sign out. Please try again.");
        }
        };


    return {
      user,
      login,
      logout,
      isMenuOpen,
      toggleMenu,
    };
  },
};
</script>

<style scoped>
/* Add any specific styles if needed */
.appLogo{
    width:3rem;
    border-radius: 50%;
    margin-right: 1rem;
}
</style>


