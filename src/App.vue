<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useCardsStore } from 'src/stores/cardsStore'
import { useSettingsStore } from 'src/stores/settingsStore'

const settingsStore = useSettingsStore()
const cardsStore = useCardsStore()

onMounted(() => {
  settingsStore.loadSettings()
  cardsStore.getAllCards()
})
</script>
