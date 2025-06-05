import { defineStore } from "pinia";
import { ref } from "vue";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  // getDocsFromServer,
} from "firebase/firestore";
import { db } from "src/js/firebase";

let cardsCollectionRef = collection(db, "cards");

export const useCardsStore = defineStore("cards", () => {
  /* state */
  const cards = ref([]);
  const expansions = ref([]);
  const isLoading = ref(false);

  /* getters */

  /* actions */
  async function fetchInitialData() {
    isLoading.value = true;
    // const querySnapshot = await getDocsFromServer(cardsCollectionRef);
    const querySnapshot = await getDocs(cardsCollectionRef);

    const expansionsDb = [];
    querySnapshot.forEach((doc) => {
      const exp = {
        ...doc.data(),
        id: doc.id,
      };
      expansionsDb.push(exp);
    });
    expansions.value = expansions;
    getAllCards();
    isLoading.value = false;
  }

  function getAllCards() {
    const allCards = [];
    // const expId = doc.id.split("-");
    // const cardDataObj = {
    //   ...doc.data(),
    //   id: expId[1],
    // };
    // allCards.push(cardDataObj);
    cards.value = allCards;
  }
  async function addCards(addCards) {
    if (addCards) {
      addCards.forEach(async (card) => {
        const { expansion, id, name, pack, quantity, rarity, type } = card;
        const dbId = expansion.concat("-", id);
        const cardDataObj = {
          name,
          pack,
          quantity,
          rarity,
          expansion,
          type,
        };
        await setDoc(doc(db, "cards", dbId), cardDataObj);
      });
    }
  }

  async function updateCardInfo(cardId, quantity) {
    const cardRef = doc(cardsCollectionRef, cardId);
    await updateDoc(cardRef, {
      quantity,
    });
  }

  function getCardsByExpansion(exp) {
    if (exp === "all") return cards.value;
    else return cards.value.filter((card) => card.expansion === exp);
  }

  function missingCards(code, packname) {
    const expCards = getCardsByExpansion(code);
    const missingCards = expCards.filter((card) => card.quantity === 0);
    const packCardsMissing = missingCards.filter((mc) =>
      mc.pack.includes(packname),
    );
    return packCardsMissing.length;
  }

  function getCardsOwnedInExp(exp) {
    let expCards = getCardsByExpansion(exp);
    return expCards.filter((card) => card.quantity > 0).length;
  }

  function getExpCardCount(exp) {
    if (exp && !isLoading.value) {
      let expCards = getCardsByExpansion(exp);
      return expCards.length;
    }
    return 0;
  }

  function missingCardsPerPack(code, packname) {
    const expCards = getCardsByExpansion(code);
    const missingCards = expCards.filter((card) => card.quantity === 0);
    const packCardsMissing = missingCards.filter((mc) =>
      mc.pack.includes(packname),
    );
    return packCardsMissing.length;
  }

  /* return */
  return {
    /* state */
    cards,
    isLoading,
    /* getters */
    /* actions */
    fetchInitialData,
    getCardsByExpansion,
    addCards,
    updateCardInfo,
    missingCards,
    getExpCardCount,
    getCardsOwnedInExp,
    missingCardsPerPack,
  };
});
