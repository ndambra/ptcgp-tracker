import { useCardsStore } from 'src/stores/cardsStore'

const cardsStore = useCardsStore()

export function addDocs(cardsList) {
  // change expansion name
  const expCards = cardsList.filter((card) => card.expansion === 'promo')
  cardsStore.addCards(expCards)
}
