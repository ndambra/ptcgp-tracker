<template>
  <q-table v-model:pagination="pagination" :columns="columns" :rows="tableRows" row-key="id">
    <template v-slot:body-cell-pack="props">
      <q-td key="pack" :props="props">
        <q-badge
          v-for="pck in props.value"
          :key="pck"
          :color="badgeColor(pck)"
          :label="pck"
          class="q-mx-xs"
        />
      </q-td>
    </template>
    <template v-slot:body-cell-own="props">
      <q-td key="own" :props="props">
        <q-icon v-if="props.value > 0" color="green" name="check_circle" size="1.5em" />
        <q-icon v-else name="cancel" color="grey-6" size="1.5em" />
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td key="actions" :props="props">
        <q-btn flat dense color="primary" icon="more_horiz">
          <q-menu>
            <q-list dense>
              <q-item
                v-if="props.row.quantity <= 0"
                clickable
                v-close-popup
                @click="updateCardCount(props.row, 1)"
              >
                <q-item-section side>
                  <q-icon size="xs" color="green" name="check_circle" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Own</q-item-label>
                </q-item-section>
              </q-item>
              <q-item v-else clickable v-close-popup @click="updateCardCount(props.row, 0)">
                <q-item-section side>
                  <q-icon size="xs" color="red" name="cancel" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Don't own</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="increaseCardCount(props.row)">
                <q-item-section side>
                  <q-icon size="xs" color="green" name="add_circle_outline" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Add 1</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="decreaseCardCount(props.row)">
                <q-item-section side>
                  <q-icon size="xs" color="red" name="remove_circle_outline" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>Remove 1</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
    </template>
  </q-table>
</template>
<script setup>
/* imports */
import { computed, ref } from 'vue'
import { columns } from 'src/js/table-constants.js'
import { badgeColor } from 'src/js/constant.js'
import { useCardsStore } from 'src/stores/cardsStore'

const cardsStore = useCardsStore()

/* props */
const props = defineProps(['tab'])

/* table */
const tableRows = computed(() => {
  if (props.tab === 'all') return cardsStore.cards
  else return cardsStore.cards.filter((card) => card.expansion === props.tab)
})
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 20,
})

// methods
const increaseCardCount = (row) => {
  const quantity = row.quantity + 1
  updateCardCount(row, quantity)
}

const decreaseCardCount = (row) => {
  const quantity = row.quantity - 1
  updateCardCount(row, quantity)
}

const updateCardCount = (cardInfo, quantity) => {
  const cardId = cardInfo.expansion.concat('-', cardInfo.id)
  cardsStore.updateCardInfo(cardId, quantity)
}
</script>
