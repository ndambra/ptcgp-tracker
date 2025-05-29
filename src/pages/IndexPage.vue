<template>
  <q-page class="flex column items-center q-pa-sm">
    <div class="q-my-md">
      <div class="text-h6 text-center">Dashboard</div>
      <q-separator class="text-separator" />
    </div>
    <cards-summary />
    <expansion-tabs />
  </q-page>
</template>

<script setup>
import CardsSummary from '/src/components/summary/CardsSummary.vue'
import ExpansionTabs from '/src/components/cards/ExpansionTabs.vue'
// import { useCardsStore } from 'src/stores/cardsStore'
// import { allCards } from '/src/js/all-cards-db.js'

// const cardsStore = useCardsStore()

// const addDocs = () => {
//   const expCards = allCards.filter((card) => card.expansion === 'promo')
//   cardsStore.addCards(expCards)
// }
</script>
