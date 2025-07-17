import { defineStore } from "pinia";
import { auth } from "src/js/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { ref } from "vue";
import { useCardsStore } from "src/stores/cardsStore";

export const useAuthStore = defineStore("auth", () => {
  /* state */
  const user = ref({});
  /* getters */

  /* actions */
  function init() {
    const cardsStore = useCardsStore();
    onAuthStateChanged(auth, (u) => {
      if (u) {
        user.value.id = u.uid;
        user.value.email = u.email;
        cardsStore.fetchInitialData();
        this.router.push("/");
      } else {
        user.value = {};
        this.router.replace("/auth");
      }
    });
  }

  function registerUser(credentials) {
    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password,
    );
  }

  function logoutUser() {
    signOut(auth);
  }

  function loginUser(credentials) {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password);
  }

  /* return */
  return {
    /* state */
    user,
    /* getters */
    /* actions */
    init,
    registerUser,
    logoutUser,
    loginUser,
  };
});
