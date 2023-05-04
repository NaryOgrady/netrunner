import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import { ExpandMore } from "@mui/icons-material"

import { useAppSelector } from "@/store"
import { ISet } from "@/types/types"

import CardControls from "./CardControls"

import Card from "../Card"

interface Props {
  setData: ISet
}

export default function Set({ setData }: Props) {
  const cards = useAppSelector(state => state.cards?.cards)

  return (
    <Accordion key={setData.id}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
      >
        { setData.attributes.name }
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-wrap">
          {cards[setData.id]?.map(c => {
            return (
              <Card
                key={c.id}
                cardData={c}
                size="large"
                controls={ <CardControls cardData={c} setId={setData.id} />}
              />
            )
          })}
        </div>
      </AccordionDetails>
    </Accordion>
  )
}