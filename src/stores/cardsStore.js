import { defineStore } from "pinia";
import { ref } from "vue";
import {
  collection,
  setDoc,
  doc,
  getDocs,
  getDocsFromServer,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "src/js/firebase";
import { useAuthStore } from "./authStore";

let cardsCollectionRef = collection(db, "cards");
let cardsQuerySnapshot = null;
let usersCollectionRef = null;
const needsUpdate = false;

export const useCardsStore = defineStore("cards", () => {
  /* state */
  const cards = ref([]);
  const isLoading = ref(false);

  /* getters */
  /* actions */
  async function fetchInitialData() {
    isLoading.value = true;
    if (needsUpdate) {
      console.log("fetch All Cards from Server");
      cardsQuerySnapshot = await getDocsFromServer(cardsCollectionRef);
    } else {
      console.log("fetch All Cards from Cache");
      cardsQuerySnapshot = await getDocs(cardsCollectionRef);
    }

    const expansionsDb = [];
    cardsQuerySnapshot.forEach((doc) => {
      const exp = {
        ...doc.data(),
        id: doc.id,
      };
      expansionsDb.push(exp);
    });
    this.getUsersCards(expansionsDb);
  }

  async function getUsersCards(expansionsDb) {
    const authStore = useAuthStore();
    if (authStore.user.id) {
      usersCollectionRef = collection(db, "users", authStore.user.id, "cards");
      let allCards = [];

      onSnapshot(usersCollectionRef, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let cardsToAdd = [];
          let usersCards = doc.data().cards;
          cardsToAdd.push(usersCards);

          let currExp = expansionsDb.filter(
            (expansion) => expansion.id === doc.id,
          )[0];

          // Loop through all the expansions set of cards
          currExp.cards.forEach((card) => {
            // console.log("exp card: ", card);
            let cardQty = 0;
            let userCard = usersCards.find((c) => c.cardId === card.id);
            if (userCard) {
              // console.log("userCard", userCard);
              cardQty = userCard.quantity;
            } else {
              cardsToAdd.push({
                cardId: card.id,
                quantity: cardQty,
              });
            }
            allCards.push({
              ...card,
              quantity: cardQty,
            });
          });
          // console.log("Cards to Add", doc.id, cardsToAdd);
        });
        cards.value = allCards;
        isLoading.value = false;
      });
    }
  }

  async function addCards(addCards, expId) {
    if (addCards) {
      console.log("expId", expId);
      console.log("addCards", addCards);
      let newObj = {
        cards: addCards,
      };
      await setDoc(doc(db, "cards", expId), newObj);
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
    getUsersCards,
    addCards,
    updateCardInfo,
    missingCards,
    getExpCardCount,
    getCardsOwnedInExp,
    missingCardsPerPack,
  };
});
