// lib/services/openskyApi.ts
import { AircraftState, FlightInfo } from "@/lib/types/opensky"

const OPENSKY_BASE_URL = "https://opensky-network.org/api"

class OpenskyService {
  async getAircraftState(icao24: string): Promise<AircraftState | null> {
    try {
      const response = await fetch(
        `${OPENSKY_BASE_URL}/states/all?icao24=${icao24.toLowerCase()}`,
        { next: { revalidate: 30 } } // Cache for 30 seconds
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: { states: (string | number | boolean | null)[][] | null } =
        await response.json()

      if (!data.states || data.states.length === 0) {
        return null
      }

      const state = data.states[0]
      return {
        icao24: state[0] as string,
        callsign: state[1] ? (state[1] as string).trim() : null,
        originCountry: state[2] as string,
        longitude: state[5] as number | null,
        latitude: state[6] as number | null,
        altitude: state[7] as number | null,
        onGround: state[8] as boolean,
        velocity: state[9] as number | null,
        heading: state[10] as number | null,
        verticalRate: state[11] as number | null,
        timestamp: state[4] as number,
      }
    } catch (error) {
      console.error("Error fetching aircraft state:", error)
      throw error
    }
  }

  async getAirportArrivals(
    airport: string,
    begin: number,
    end: number
  ): Promise<FlightInfo[]> {
    try {
      const response = await fetch(
        `${OPENSKY_BASE_URL}/flights/arrival?airport=${airport.toUpperCase()}&begin=${begin}&end=${end}`,
        { next: { revalidate: 60 } } // Cache for 1 minute
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      return data.map(
        (flight: any): FlightInfo => ({
          icao24: flight.icao24,
          firstSeen: flight.firstSeen,
          lastSeen: flight.lastSeen,
          callsign: flight.callsign?.trim() || null,
          departureAirport: flight.estDepartureAirport,
          arrivalAirport: flight.estArrivalAirport,
        })
      )
    } catch (error) {
      console.error("Error fetching airport arrivals:", error)
      throw error
    }
  }

  async getAirportDepartures(
    airport: string,
    begin: number,
    end: number
  ): Promise<FlightInfo[]> {
    try {
      const response = await fetch(
        `${OPENSKY_BASE_URL}/flights/departure?airport=${airport.toUpperCase()}&begin=${begin}&end=${end}`,
        { next: { revalidate: 60 } } // Cache for 1 minute
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      return data.map(
        (flight: any): FlightInfo => ({
          icao24: flight.icao24,
          firstSeen: flight.firstSeen,
          lastSeen: flight.lastSeen,
          callsign: flight.callsign?.trim() || null,
          departureAirport: flight.estDepartureAirport,
          arrivalAirport: flight.estArrivalAirport,
        })
      )
    } catch (error) {
      console.error("Error fetching airport departures:", error)
      throw error
    }
  }
}

export const openskyApi = new OpenskyService()
