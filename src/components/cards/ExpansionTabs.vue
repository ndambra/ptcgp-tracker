<template>
  <div class="q-ma-md">
    <div class="panel-container">
      <q-tabs
        v-model="tab"
        :class="useLightOrDark('bg-grey-3 text-grey-8', 'bg-grey-9 text-grey-6')"
        active-color="primary"
        no-caps
        dense
      >
        <q-tab v-for="tab in tabs" :key="tab.name" v-bind="tab" />
      </q-tabs>
      <q-tab-panels v-model="tab">
        <q-tab-panel v-for="tab in tabs" :key="tab.name" :name="tab.name" class="q-pa-none">
          <expansion-summary :exp="tab" />
          <cards-table :tab="tab.name"></cards-table>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { expansions } from 'src/js/constant.js'
import CardsTable from 'src/components/cards/CardsTable.vue'
import { useLightOrDark } from 'src/use/useLightOrDark'
import ExpansionSummary from '../summary/ExpansionSummary.vue'

/* Tabs */
const tab = ref('all')
const tabs = ref([])

/* onMounted */
onMounted(() => {
  tabs.value.push({
    name: 'all',
    label: 'All',
  })
  expansions.forEach((exp) => {
    tabs.value.push({
      name: exp.code,
      label: exp.name,
    })
  })
})
</script>

<style scope>
.summary-card {
  max-width: 500px;
}
.panel-container {
  border: solid 1px rgba(0, 0, 0, 0.18);
  border-radius: 5px;
}
</style>
