import { defineStore } from 'pinia'
import { auth } from 'src/js/firebase'
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  /* state */
  const user = ref({})
  /* getters */

  /* actions */
  function init() {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        user.value.id = u.uid
        user.value.email = u.email
        this.router.push('/')
      } else {
        user.value = {}
        this.router.replace('/auth')
      }
    })
  }

  function registerUser(credentials) {
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log('register new user:', user)
      })
      .catch((error) => {
        console.log('error.message: ', error.message)
      })
  }

  function logoutUser() {
    signOut(auth)
      .then(() => {
        // console.log('user signed out')
      })
      .catch((error) => {
        console.log('error.message: ', error.message)
      })
  }

  function loginUser(credentials) {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const userT = userCredential.user
        console.log('Login user:', userT)
      })
      .catch((error) => {
        console.log('error.message: ', error.message)
      })
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
  }
})
