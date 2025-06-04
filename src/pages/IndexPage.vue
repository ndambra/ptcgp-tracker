<template>
  <q-page class="flex column items-center q-pa-md">
    <div class="q-my-md">
      <div class="text-h6 text-center">Dashboard</div>
      <!-- <q-btn @click="addDocs" label="add" /> -->
      <q-separator class="text-separator" />
    </div>
    <cards-summary />
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import CardsSummary from '/src/components/summary/CardsSummary.vue'
/* bulk add new cards -- uncomment below to add new cards (DEV ONLY) */
// import { allCards } from '/src/js/all-cards-db.js'

// const addDocs = () => {
//   const expCards = allCards.filter((card) => card.expansion === 'a3')
//   cardsStore.addCards(expCards)
// }

onMounted(() => {})
</script>
