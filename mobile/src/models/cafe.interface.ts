export interface Cafe {
    id: number,
    name: string,
    address: CafeAddress
}

export interface CafeAddress {
    street: string,
    suite: string,
    city: string,
    geo: CafeGeo
}

export interface CafeGeo {
    lat: string,
    lng: string
}