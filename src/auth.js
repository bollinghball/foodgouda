// src/auth.js
import { ref, onMounted } from 'vue';
import { auth } from './firebase';

const user = ref(null);

const useAuth = () => {
  onMounted(() => {
    auth.onAuthStateChanged((currentUser) => {
      user.value = currentUser;
    });
  });

  return {
    user,
  };
};

export default useAuth;
