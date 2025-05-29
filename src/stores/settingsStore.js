import { defineStore } from 'pinia'
import { reactive, ref, watch } from 'vue'
import { Dark, LocalStorage } from 'quasar'

const defaultSettings = reactive({
  darkMode: true,
})

export const useSettingsStore = defineStore('settings', () => {
  /* state */
  const settings = ref({})

  // watch darkMode
  watch(
    () => settings.value.darkMode,
    (value) => Dark.set(value),
    { immediate: true },
  )

  // watch settings
  watch(settings, () => {
    saveSettings()
  })

  /* getters */

  /* actions */
  const saveSettings = () => {
    LocalStorage.set('settings', settings)
  }

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem('settings')
    if (savedSettings) Object.assign(settings, savedSettings)
    else Object.assign(settings, defaultSettings)
  }

  /* return */
  return {
    /* state */
    settings,
    /* getters */
    /* actions */
    loadSettings,
  }
})
