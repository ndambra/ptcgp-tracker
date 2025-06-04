<template>
  <q-card>
    <q-card-section class="q-pa-sm">
      <div class="text-weight-bold text-center">
        {{ exp.label }}
      </div>
      <div class="text-weight-semibold flex no-wrap justify-center">
        <p>
          {{ cardsStore.getCardsOwnedInExp(exp.name) }}/{{ cardsStore.getExpCardCount(exp.name) }}
        </p>
        <p class="text-negative">{{ missingCards }}</p>
      </div>
    </q-card-section>
    <q-separator inset />
    <q-card-section class="flex no-wrap flex-center q-pa-sm">
      <div v-for="pack in filteredPacks" :key="pack" class="flex column flex-center">
        <q-badge :color="badgeColor(pack)" :label="pack" class="q-pa-sm q-ma-xs" rounded />
        <div v-if="!cardsStore.isLoading">{{ cardsStore.missingCardsPerPack(exp.name, pack) }}</div>
        <div v-else>0</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
/* imports */
import { computed } from 'vue'
import { useCardsStore } from 'src/stores/cardsStore'
import { expansions, badgeColor } from '/src/js/constant.js'

const cardsStore = useCardsStore()

/* props */
const props = defineProps(['exp'])

const filteredPacks = computed(() => {
  const found = expansions.find((exp) => exp.code === props.exp.name)
  if (found) return found.packs
  else return []
})

const missingCards = computed(() => {
  return cardsStore.getExpCardCount(props.exp.name) - cardsStore.getCardsOwnedInExp(props.exp.name)
})
</script>
