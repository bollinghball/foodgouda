<template>
  <nav class="flex justify-between p-4 bg-white">
    <div class="flex items-center">
        <img class="appLogo" alt="Vue logo" src="../assets/food gouda cheese logo.png">
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
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { ref } from 'vue';

export default {
  setup() {
    const user = ref(null);

    auth.onAuthStateChanged((currentUser) => {
      user.value = currentUser;
    });

    const login = async () => {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error(error);
      }
    };

    const logout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error(error);
      }
    };

    return { user, login, logout };
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
