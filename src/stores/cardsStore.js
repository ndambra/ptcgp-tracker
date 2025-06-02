import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, setDoc, doc, query, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from 'src/js/firebase'

let cardsCollectionRef = collection(db, 'cards')
let cardsCollectionQuery = null
let getCardsSnapshot = null

export const useCardsStore = defineStore('cards', () => {
  /* state */
  const cards = ref([])
  const isLoading = ref(false)

  /* getters */

  /* actions */
  async function getAllCards() {
    isLoading.value = true
    cardsCollectionQuery = query(cardsCollectionRef)
    getCardsSnapshot = onSnapshot(cardsCollectionQuery, (querySnapshot) => {
      const allCards = []
      querySnapshot.forEach((doc) => {
        const expId = doc.id.split('-')
        const cardDataObj = {
          ...doc.data(),
          id: expId[1],
        }
        allCards.push(cardDataObj)
      })
      cards.value = allCards
      isLoading.value = false
    })
  }

  async function addCards(addCards) {
    if (addCards) {
      addCards.forEach(async (card) => {
        const { expansion, id, name, pack, quantity, rarity, type } = card
        const dbId = expansion.concat('-', id)
        const cardDataObj = {
          name,
          pack,
          quantity,
          rarity,
          expansion,
          type,
        }
        await setDoc(doc(db, 'cards', dbId), cardDataObj)
      })
    }
  }

  function clearCards() {
    cards.value = []
    if (getCardsSnapshot) getCardsSnapshot() // unsubscribe from active listeners
  }

  async function updateCardInfo(cardId, quantity) {
    const cardRef = doc(cardsCollectionRef, cardId)
    await updateDoc(cardRef, {
      quantity,
    })
  }

  function getCardsByExpansion(exp) {
    if (exp === 'all') return cards.value
    else return cards.value.filter((card) => card.expansion === exp)

    /* isLoading.value = true

    cardsCollectionQuery = query(cardsCollectionRef, where('expansion', '==', exp))
    onSnapshot(
      cardsCollectionQuery,
      (querySnapshot) => {
        const queryCards = []
        querySnapshot.forEach((doc) => {
          const expId = doc.id.split('-')
          const cardDataObj = {
            ...doc.data(),
            id: expId[1],
          }
          queryCards.push(cardDataObj)
        })
        cards.value = queryCards
        isLoading.value = false
      },
      (error) => {
        console.log('error.message', error.message)
      },
    ) */
  }
  function missingCards(code, packname) {
    const expCards = getCardsByExpansion(code)
    const missingCards = expCards.filter((card) => card.quantity === 0)
    const packCardsMissing = missingCards.filter((mc) => mc.pack.includes(packname))
    return packCardsMissing.length
  }

  function getCardsOwnedInExp(exp) {
    let expCards = getCardsByExpansion(exp)
    return expCards.filter((card) => card.quantity > 0).length
  }

  function getExpCardCount(exp) {
    if (exp && !isLoading.value) {
      let expCards = getCardsByExpansion(exp)
      return expCards.length
    }
    return 0
  }

  function missingCardsPerPack(code, packname) {
    const expCards = getCardsByExpansion(code)
    const missingCards = expCards.filter((card) => card.quantity === 0)
    const packCardsMissing = missingCards.filter((mc) => mc.pack.includes(packname))
    return packCardsMissing.length
  }

  /* return */
  return {
    /* state */
    cards,
    isLoading,
    /* getters */
    /* actions */
    getAllCards,
    getCardsByExpansion,
    addCards,
    clearCards,
    updateCardInfo,
    missingCards,
    getExpCardCount,
    getCardsOwnedInExp,
    missingCardsPerPack,
  }
})
