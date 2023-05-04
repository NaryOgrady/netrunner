import { useEffect } from "react"

import { setCards, getCollection } from "@/store/cardsSlice"
import { ISet, ICard, ICards } from "@/types/types"
import ProtectedRoute from "@/components/ProtectedRoute"
import Set from "@/components/collection/Set"
import { useAppDispatch, useAppSelector, wrapper } from "@/store"


interface Props {
  sets: Array<ISet>
}

export default function Collection({ sets }: Props) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user.user)

  useEffect(() => {
    if (!user) {
      return
    }
    dispatch(getCollection())
  }, [dispatch, user])

  const setList = sets?.map(set => {
    return (
      <Set key={set.id} setData={set} />
    )
  })

  return (
    <ProtectedRoute>
      <div className="h-screen w-full flex flex-col items-center">
        <div className="w-10/12">
          { setList }
        </div>
      </div>
    </ProtectedRoute>
  )
}

export const getStaticProps = wrapper.getStaticProps(store => async () => {
  let res = await fetch('https://api-preview.netrunnerdb.com/api/v3/public/card_sets')
  let json = await res.json()
  const sets = json.data.sort((a: ISet, b: ISet) => {
    return Date.parse(b.attributes.date_release) - Date.parse(a.attributes.date_release)
  })

  const id: string = sets[0].id
  res = await fetch(`https://api-preview.netrunnerdb.com/api/v3/public/card_sets/${id}/cards`)
  json = await res.json()
  const cardsData: Array<ICard> = json.data
  const cards: ICards = {}
  cards[id] = cardsData 
  store.dispatch(setCards(cards))
  return {
    props: { sets }
  }
})
