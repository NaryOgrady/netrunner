import Image from "next/image"

import { ICard } from "@/types/types"
import React from "react"

interface Props {
  cardData: ICard
  controls?: React.ReactNode
  size?: 'small' | 'medium' | 'large'
}

export default function Card({ cardData, controls, size = 'medium' }: Props) {
  const cardSrc = `https://static.nrdbassets.com/v1/${size}/${cardData.attributes.latest_printing_id}.jpg`
  return (
    <div className="w-1/2 md:w-1/4 lg:w-1/6 min-w-72 px-2 mb-2">
      <div className="relative">
        { controls }
        <Image
          loader={() => cardSrc}
          src={cardSrc}
          alt={cardData.attributes.title}
          width={360}
          height={420}
          unoptimized
        />
      </div>
    </div>
  )
}