<template>
  <q-scroll-area class="summary-panel q-pa-md">
    <div v-if="!cardsStore.isLoading" class="row no-wrap justify-center q-gutter-x-sm">
      <q-card
        v-for="exp in summaryStats"
        :key="exp.code"
        style="max-width: 270px"
        :bordered="useLightOrDark(true, false)"
        flat
      >
        <q-card-section class="q-pa-sm">
          <div class="text-weight-bold text-center">
            {{ exp.name }}
          </div>
          <div class="text-weight-semibold flex no-wrap justify-center">
            <p>{{ exp.ownCards }}/{{ exp.totalCards }}</p>
            <p class="text-negative">{{ exp.totalCards - exp.ownCards }}</p>
          </div>
        </q-card-section>
        <q-separator inset />
        <q-card-section class="flex no-wrap flex-center q-pa-sm">
          <div v-for="pack in exp.packs" :key="pack" class="flex column flex-center">
            <q-badge :color="badgeColor(pack)" :label="pack" class="q-pa-sm q-ma-xs" rounded />
            <div>{{ missingCardsPerPack(exp.code, pack) }}</div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>
      <p>Fetching data....</p>
    </div>
  </q-scroll-area>
</template>

<script setup>
import { expansions, badgeColor } from '/src/js/constant.js'
import { ref } from 'vue'
import { useLightOrDark } from 'src/use/useLightOrDark'
import { useCardsStore } from 'src/stores/cardsStore'

const cardsStore = useCardsStore()
const summaryStats = ref([])

expansions.forEach((exp) => {
  const expCards = cardsStore.cards.filter((card) => card.expansion === exp.code)
  const cardsOwned = expCards.filter((card) => card.quantity > 0).length

  const summary = {
    ...exp,
    totalCards: expCards.length,
    ownCards: cardsOwned,
  }
  summaryStats.value.push(summary)
})

const missingCardsPerPack = (code, packname) => {
  const expCards = cardsStore.cards.filter((card) => card.expansion === code)
  const missingCards = expCards.filter((card) => card.quantity === 0)
  const packCardsMissing = missingCards.filter((mc) => mc.pack.includes(packname))
  return packCardsMissing.length
}
</script>

<style scoped>
.summary-panel {
  border: solid 1px rgba(0, 0, 0, 0.18);
  border-radius: 5px;
  height: 200px;
  width: 90%;
}

p {
  margin: 0;
  padding: 0 12px;
}
</style>
