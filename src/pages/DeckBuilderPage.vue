<template>
  <q-page>
    <q-table flat bordered title="Treats" :rows="rows" :columns="columns" row-key="name">
      <template v-slot:header-cell="props">
        <q-th :props="props">
          <q-icon
            class="reorder-col-icon"
            name="chevron_left"
            clickable
            left
            @click="reorderCol(props.col, 'left')"
          />
          {{ props.col.label }}
          <q-icon
            class="reorder-col-icon"
            name="chevron_right"
            clickable
            right
            @click="reorderCol(props.col, 'right')"
          />
        </q-th>
      </template>
    </q-table>
    <div class="q-ma-lg">
      <div class="drop-zone" @drop="onDrop($event, 1)" @dragover.prevent @dragenter.prevent>
        <div
          class="drag-el"
          v-for="item in listOne"
          :key="item.title"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="drop-zone" @drop="onDrop($event, 2)" @dragover.prevent @dragenter.prevent>
        <div
          class="drag-el"
          v-for="item in listTwo"
          :key="item.title"
          draggable="true"
          @dragstart="startDrag($event, item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
const columns = ref([
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  {
    name: 'calcium',
    label: 'Calcium (%)',
    field: 'calcium',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'iron',
    label: 'Iron (%)',
    field: 'iron',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
])

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
  },
]
const items = ref([
  {
    id: 0,
    title: 'Item A',
    list: 1,
  },
  {
    id: 1,
    title: 'Item B',
    list: 1,
  },
  {
    id: 2,
    title: 'Item C',
    list: 2,
  },
])

const listOne = computed(() => items.value.filter((item) => item.list === 1))
const listTwo = computed(() => items.value.filter((item) => item.list === 2))

function startDrag(evt, item) {
  evt.dataTransfer.dropEffect = 'move'
  evt.dataTransfer.effectAllowed = 'move'
  evt.dataTransfer.setData('itemID', item.id)
}

function onDrop(evt, list) {
  const itemID = evt.dataTransfer.getData('itemID')
  const item = this.items.find((item) => item.id == itemID)
  item.list = list
}

function reorderCol(col, dir) {
  const colIndex = columns.value.findIndex((column) => column.name === col.name)
  if (dir === 'left' && colIndex > 0) swapCols(colIndex, colIndex - 1)
  else if (dir === 'right' && colIndex < columns.value.length - 1) swapCols(colIndex, colIndex + 1)
}
function swapCols(colIndex, swapIndex) {
  const temp = columns.value[colIndex]
  columns.value.splice(colIndex, 1, columns.value[swapIndex])
  columns.value.splice(swapIndex, 1, temp)
}
</script>
<style scoped>
.drop-zone {
  background-color: #eee;
  margin-bottom: 10px;
  padding: 10px;
}

.drag-el {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 5px;
}
.reorder-col-icon {
  font-size: 1.5em;
}
.reorder-col-icon:hover {
  background-color: #eee;
}
</style>
