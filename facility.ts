export interface Facility {
  storeId: string
  ownerId: string
  ozStoreId: number
  salesForceId: string
  address: Address
  adminFee: number
  allowOverbooking: boolean
  archived: boolean
  brands: Brand[]
  directions: Directions
  expectedOpeningDate?: any
  geocode: Geocode
  hasAvailableInventory: boolean
  hasKiosk: boolean
  hoursOfOperation: HoursOfOperation[]
  isComingSoon: boolean
  isGrandOpening: boolean
  isNewlyBuilt: boolean
  isNewManagement: boolean
  isParking: boolean
  isTestStore: boolean
  jsonLd: JsonLd
  manager: string
  modified: string
  name: string
  number: number
  omniConversionDate: string
  phonesRoutedToNsc?: any
  promotion?: any
  showHours: boolean
  showInventory: boolean
  telephone: string
  telephoneDirectDial: string
  timeZone: string
  transitionType?: any
  version: string
  reviewSummary: ReviewSummary
  websiteHoldWindow: number
  websiteReservationWindow: number
}

interface ReviewSummary {
  averageRating: number
  latestReviews?: any
  maxRange: number
  totalCount: number
  totalRating: number
}

interface JsonLd {
  hoursOfOperation: string[]
}

interface HoursOfOperation {
  friday: string
  monday: string
  saturday: string
  sunday: string
  thursday: string
  tuesday: string
  type: string
  wednesday: string
}

interface Geocode {
  latitude: number
  longitude: number
}

interface Directions {
  east: string
  landmarks: string
  north: string
  shortLink: string
  south: string
  west: string
}

interface Brand {
  brand: string
}

interface Address {
  city: string
  formattedAddress?: any
  line1: string
  line2: string
  line3: string
  line4: string
  postalCode: string
  stateAbbreviation: string
  stateName: string
}
