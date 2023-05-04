import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { onValue, ref, set } from "firebase/database";
import { getFirebaseDatabase } from "@/db";

import { ICards } from "@/types/types";
import { AppDispatch, AppStore, AppState } from ".";

interface ICardsState {
  cards: ICards
  collection: {
    [key: string]: {
      [key: string]: number
    } 
  }
}


const initialState: ICardsState = {
  cards: {},
  collection: {}
}

const cardsSlice = createSlice({
  name: 'cards',

  initialState,

  reducers: {
    setCards: (state, action) => {
      state.cards  = action.payload
    },

    setCollection: (state, action) => {
      state.collection = action.payload
    },

    setQtyToCollection: (state, action) => {
      const { setId, cardId, qty } = action.payload
      if (!state.collection?.[setId]) {
        state.collection[setId] = {}
      }
      state.collection[setId][cardId] = qty
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.cards
      }
    }
  }
})

interface SaveToCollectionPayload {
  setId: string
  cardId: string
  qty: number
}

export const saveToCollection = (payload: SaveToCollectionPayload) => (
  async (dispatch: AppDispatch, getState: AppStore['getState']) => {
    const {setId, cardId, qty} = payload
    const db = getFirebaseDatabase()
    const user = getState().user.user
    try {
      await set(ref(db, `collections/${user?.uid}/${setId}/${cardId}`), qty)
    } catch (err) {
      console.log(err)
    }
    dispatch(setQtyToCollection(payload))
  }
)

export const getCollection = () => (dispatch: AppDispatch, getState: AppStore['getState']) => {
  const db = getFirebaseDatabase()
  const user = getState().user.user
  const collectionRef = ref(db, `collections/${user?.uid}`)
  onValue(collectionRef, snapshot => {
    const data = snapshot.val()
    dispatch(setCollection(data))
  })
}

export const getCardQty = (setId: string, cardId: string) => (state: AppState) => {
  const set = state.cards.collection?.[setId]
  if (!set) {
    return 0
  }

  return set[cardId] || 0
}

export const { setCards, setQtyToCollection, setCollection } = cardsSlice.actions


export default cardsSlice.reducer