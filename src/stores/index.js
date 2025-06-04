import { defineStore } from '#q-app/wrappers'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'
import router from 'src/router'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default defineStore((/* { ssrContext } */) => {
  const pinia = createPinia()

  pinia.use(({ store }) => {
    store.router = markRaw(router)
  })

  return pinia
})
