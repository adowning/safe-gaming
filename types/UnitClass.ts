export interface UnitClass {
  id: String
  storeId: String
  unitClassId: String
  availability: any
  dimensions: Dimensions
  discount: Discount
  features: Feature[]
  filters: Filters
  overbookingLimit: String
  promotion: Promotion
  ranking: Ranking
  rates: Rates
  websiteMoveInWindow: number
  websiteReservationWindow: number
  updatedAt: number
}

interface Rates {
  street: number
  walkIn: number
  web: number
}

interface Ranking {
  rank: number
}

interface Promotion {
  discount: any
  type: any
}

interface Filters {
  distance: any
  airCooled: boolean
  annex: boolean
  climateControlled: boolean
  coveredAisle: boolean
  dehumidified: boolean
  driveUpAccess: boolean
  elevatorAccess: boolean
  enclosedStorage: boolean
  enclosedVehicleStorage: boolean
  firstFloorAccess: boolean
  heated: boolean
  highBayDoor: boolean
  highCeiling: boolean
  highDoor: boolean
  indoor: boolean
  indoor1stFloorAccess: boolean
  indoorDriveUpAccess: boolean
  liftAccess: boolean
  multidoor: boolean
  outdoor: boolean
  outdoorNoDriveUp: boolean
  outdoorRvCovered: boolean
  outdoorRvUnCovered: boolean
  parking: boolean
  powerAvailable: boolean
  premium: boolean
  pullThrough: boolean
  reducedHeight: boolean
  reducedHeightRollingStairAccess: boolean
  rollingStairAccess: boolean
  rvCoveredParking: boolean
  rvParking: boolean
  stairAccess: boolean
  twentyFourHourAccess: boolean
  unusualSize: boolean
  wineStorage: boolean
}

interface Feature {
  codingId: number
  display: String
  name: String
}

interface Discount {
  description: any
  isPercent: boolean
  value: number
}

interface Dimensions {
  depth: number
  display: String
  isExactSize: boolean
  size: String
  squareFoot: number
  videoUrl: String
  width: number
}

interface Availability {
  showAvailable: boolean
  showFirstCome: boolean
  showLimited: boolean
  showOnline: boolean
  showPromotion: boolean
  showRapidRental: boolean
  showReserve: boolean
}
