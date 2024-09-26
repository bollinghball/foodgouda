<!-- src/components/NavBar.vue -->
<template>
    <nav class="flex justify-between p-4 bg-white">
        <div class="flex items-center">
            <img class="appLogo" alt="food gouda logo" src="../assets/food gouda cheese logo.png">
            <router-link to="/" class="font-display uppercase text-fgBlue text-2xl font-black">Food Gouda</router-link>
        </div>
        <div class="content-center uppercase">
            <router-link to="/blog" class="text-fgBlue mr-4 font-display font-black hover:text-fgLiteBlue">Blog</router-link>
            <router-link to="/profile" class="text-fgBlue mr-4 font-display font-black hover:text-fgLiteBlue">Profile</router-link>
            <button v-if="!user" @click="login" class="text-fgBlue font-display font-black hover:text-fgLiteBlue">Login</button>
            <button v-else @click="logout" class="text-fgBlue font-display font-black hover:text-fgLiteBlue">Logout</button>
        </div>
    </nav>
</template>


<script>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default {
  name: 'NavBar',
  setup() {
    const user = inject('user');
    const router = useRouter();

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


