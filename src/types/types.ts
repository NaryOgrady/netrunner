export interface ICard {
  id: string
  attributes: {
    title: string
    latest_printing_id: string
  }
}

export interface ISet {
  id: string
  attributes: {
    name: string
    date_release: string
  }
}

export interface ICards {
  [key: string]: Array<ICard>
}