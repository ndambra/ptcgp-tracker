<template>
  <div
    v-if="!cardsStore.isLoading"
    class="row q-gutter-md"
  >
    <q-card
      v-for="exp in summaryStats"
      :key="exp.code"
      style="max-width: 270px"
    >
      <q-card-section class="q-pa-sm">
        <div class="text-weight-bold text-center">
          {{ exp.name }}
        </div>
        <div class="text-weight-semibold flex no-wrap justify-center">
          <p>{{ getCardsOwned(exp) }}</p>
          <p class="text-negative">{{ getTotalMissingCards(exp) }}</p>
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="flex no-wrap flex-center q-pa-sm">
        <div
          v-for="pack in exp.packs"
          :key="pack"
          class="flex column flex-center"
        >
          <q-badge
            :color="badgeColor(pack)"
            :label="pack"
            class="q-pa-sm q-ma-xs"
            rounded
          />
          <div>{{ missingCardsPerPack(exp.code, pack) }}</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div v-else>
    <p>Fetching data....</p>
  </div>
</template>

<script setup>
import { expansions, badgeColor } from "/src/js/constant.js";
import { computed } from "vue";
import { useCardsStore } from "src/stores/cardsStore";

const cardsStore = useCardsStore();

const getCardsOwned = (exp) => {
  return `${exp.ownCards} / ${exp.totalCards}`;
};

const getTotalMissingCards = (exp) => {
  return exp.totalCards - exp.ownCards;
};

const missingCardsPerPack = (code, packname) => {
  const expCards = cardsStore.cards.filter((card) => card.expansion === code);
  const missingCards = expCards.filter((card) => card.quantity === 0);
  const packCardsMissing = missingCards.filter((mc) =>
    mc.pack.includes(packname),
  );
  return packCardsMissing.length;
};

const summaryStats = computed(() => {
  const stats = [];
  expansions.forEach((exp) => {
    const expCards = cardsStore.cards.filter(
      (card) => card.expansion === exp.code,
    );
    const cardsOwned = expCards.filter((card) => card.quantity > 0).length;

    const summary = {
      ...exp,
      totalCards: expCards.length,
      ownCards: cardsOwned,
    };
    stats.push(summary);
  });
  return stats;
});
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

.q-card--dark {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
</style>
