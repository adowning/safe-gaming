export interface UnitClasses {
  availability: Availability
  dimensions: Dimensions
  discount: Discount
  features: Feature[]
  filters: { [key: string]: boolean | null }
  overbookingLimit: string
  promotion: Promotion
  promotions: Promotion[]
  ranking: Ranking
  rates: Rates
  uid: string
  unitClassID: string
  websiteMoveInWindow: number
  websiteReservationWindow: number
}

export interface Availability {
  showAvailable: boolean
  showFirstCome: boolean
  showLimited: boolean
  showOnline: boolean
  showPromotion: boolean
  showRapidRental: boolean
  showReserve: boolean
}

export interface Dimensions {
  depth: number
  display: string
  isExactSize: boolean
  size: string
  squareFoot: number
  videoURL: string
  width: number
}

export interface Discount {
  description: null | string
  isPercent: boolean
  value: number
}

export interface Feature {
  codingID: number
  display: string
  name: string
}

export interface Promotion {
  discount: Discount | null
  type: null | string
}

export interface Ranking {
  rank: number
}

export interface Rates {
  street: number
  walkIn: number
  web: number
}
