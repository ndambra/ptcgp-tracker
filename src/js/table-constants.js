import { expansionName } from './constant'

function rarityValue(rarity) {
  let calcVal = 0
  switch (rarity.type) {
    case 'crown':
      calcVal += 10
      break
    case 'shiny':
      calcVal += 7
      break
    case 'star':
      calcVal += 5
      break
    default:
      calcVal = 0
      break
  }
  calcVal += rarity.value
  return calcVal
}

export const raritySymbols = [
  { type: 'diamond', symbol: '♦' },
  { type: 'star', symbol: '★' },
  { type: 'shiny', symbol: '✷' },
  { type: 'crown', symbol: '♕' },
]

export const columns = [
  {
    name: 'id',
    label: 'ID',
    field: (row) => `${row.expansion}-${row.id}`,
    sortable: true,
    sort: (a, b) => {
      if (!a || !b) return 0
      const splitA = a.split('-')
      const splitB = b.split('-')
      if (splitA[0] === splitB[0]) {
        const aNum = Number(splitA[1])
        const bNum = Number(splitB[1])
        return aNum - bNum
      }
      return a - b
    },
  },
  {
    name: 'name',
    label: 'Card name',
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: 'rarity',
    label: 'Rarity',
    field: (row) => row.rarity,
    format: (val) => getRaritySymbols(val),
    sortable: true,
    sort: (a, b) => {
      if (!a || !b) return 0

      const aVal = rarityValue(a)
      const bVal = rarityValue(b)

      return aVal - bVal
    },
  },
  {
    name: 'expansion',
    label: 'Expansion',
    field: (row) => row.expansion,
    format: (val) => expansionName(val),
    sortable: true,
  },
  {
    name: 'pack',
    label: 'Pack',
    field: (row) => row.pack,
    align: 'center',
  },
  {
    name: 'own',
    label: 'Own?',
    sortable: true,
    field: (row) => row.quantity,
  },
  {
    name: 'quantity',
    label: '# Own',
    sortable: true,
    field: (row) => row.quantity,
  },
  {
    name: 'actions',
    label: 'Actions',
    field: (row) => row,
  },
]

export function getRaritySymbols(rarityObj) {
  let symbol = ''
  let rarityString = ''

  if (rarityObj.type) {
    const type = rarityObj.type
    const rarityValue = raritySymbols.find((sym) => sym.type === type)
    if (rarityValue) {
      symbol = rarityValue.symbol
      rarityString = symbol.repeat(rarityObj.value)
    } else {
      rarityString = type
    }
  }
  return rarityString
}

export const items = (row) => [
  [
    {
      label: 'Mark Own',
      icon: 'i-heroicons-check-circle-16-solid',
      click: () => console.log('Own it', row.own),
    },
    {
      label: 'Mark Unown',
      icon: 'i-heroicons-x-circle-16-solid',
    },
  ],
  [
    {
      label: 'Add 1',
      icon: 'i-heroicons-document-plus-16-solid',
    },
    {
      label: 'Remove 1',
      icon: 'i-heroicons-document-minus-16-solid',
    },
  ],
  [
    {
      label: 'View/Hide',
      icon: 'i-heroicons-eye-16-solid',
    },
  ],
]
