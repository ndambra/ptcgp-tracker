<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/authStore'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useCardsStore } from 'src/stores/cardsStore'

const authStore = useAuthStore()
const settingsStore = useSettingsStore()
const cardsStore = useCardsStore()

onMounted(() => {
  authStore.init()
  settingsStore.loadSettings()
  cardsStore.getAllCards()
})
</script>
