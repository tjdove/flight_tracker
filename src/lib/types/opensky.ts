// lib/types/opensky.ts
export type AircraftState = {
  icao24: string
  callsign: string | null
  originCountry: string
  longitude: number | null
  latitude: number | null
  altitude: number | null
  onGround: boolean
  velocity: number | null
  heading: number | null
  verticalRate: number | null
  timestamp: number
}

export type FlightInfo = {
  icao24: string
  firstSeen: number
  lastSeen: number
  callsign: string | null
  departureAirport: string | null
  arrivalAirport: string | null
}
