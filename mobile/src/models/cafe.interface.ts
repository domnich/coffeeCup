export interface Cafe {
    id: number,
    name: string,
    address: CafeAddress,
    photos: string[]
}

export interface CafeAddress {
    city: string,
    street: string,
    phone: string,
    cite: string,
    workingTime: CafeWorkingTime,
    geolocation: CafeGelocation
}

export interface CafeWorkingTime {
  from: string,
  to: string
}

export interface CafeGelocation {
    lat: number,
    lng: number
}

export interface FilteredCafes {
    data: Cafe[],
    value: string,
    height: number
  }