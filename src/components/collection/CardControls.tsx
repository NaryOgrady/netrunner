
import { Checkbox } from "@mui/material"
import { Square, CheckBoxOutlineBlank } from "@mui/icons-material"
import { orange } from "@mui/material/colors"

import { getCardQty, saveToCollection } from "@/store/cardsSlice"
import { useAppSelector, useAppDispatch } from "@/store"
import { ICard } from "@/types/types"
import React from "react"

interface Props {
  cardData: ICard
  setId: string
}


export default function CardControls({ cardData, setId }: Props) {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.user.user?.uid )
  const cardQuantity = useAppSelector(getCardQty(setId, cardData.id))

  const isChecked = (qty: number)  => cardQuantity > qty

  const handleQuantityChange = (qty: number) => {
    if (qty === cardQuantity) {
      dispatch(saveToCollection({ setId, cardId: cardData.id, qty: qty - 1 }))
      return
    }
    //dispatch(addToCollection({ id: cardData.id, qty }))
    dispatch(saveToCollection({ setId, cardId: cardData.id, qty }))
  }

  return (<>
    <div className="w-full flex justify-center">
      { [...Array(3).keys()].map(e => (
        <Checkbox
          key={e}
          checked={isChecked(e)}
          icon={<CheckBoxOutlineBlank sx={{ color: orange[400] }} />}
          checkedIcon={<Square sx={{ color: orange[400] }} />}
          size="small"
          onChange={(event) => handleQuantityChange(e + 1) }
        />
      ))}
    </div>
  </>)
}