import { defineStore } from 'pinia'
import { ref } from 'vue'
import { collection, setDoc, doc, query, where, onSnapshot, updateDoc } from 'firebase/firestore'
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
  const getAllCards = async () => {
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

  const getCardsByExpansion = async (exp) => {
    isLoading.value = true

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
    )
  }

  const addCards = async (cards) => {
    if (cards) {
      cards.forEach(async (card) => {
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

  const clearCards = () => {
    cards.value = []
    if (getCardsSnapshot) getCardsSnapshot() // unsubscribe from active listeners
  }

  const updateCardInfo = async (cardId, quantity) => {
    const cardRef = doc(cardsCollectionRef, cardId)
    await updateDoc(cardRef, {
      quantity,
    })
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
  }
})
