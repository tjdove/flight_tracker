// app/components/FlightTracker.tsx
"use client"

import { useState } from "react"
import { FlightDataDisplay } from "./FlightDataDisplay"
import { AircraftState, FlightInfo } from "@/lib/types/opensky"

export function FlightTracker() {
  const [flightData, setFlightData] = useState<
    AircraftState | FlightInfo[] | null
  >(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchFlightState = async (icao24: string) => {
    try {
      setLoading(true)
      // const response = await fetch(`/api/flights?action=state&param1=${icao24}`)
      const response = await fetch(`https://opensky-network.org/api/states/all`)
      console.log("Response:  " + response)
      if (!response.ok) throw new Error("Failed to fetch flight state")
      const data = await response.json()
      setFlightData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  // const fetchAirportArrivals = async (airport: string) => {
  //   const now = Math.floor(Date.now() / 1000)
  //   const dayAgo = now - 24 * 60 * 60

  //   try {
  //     setLoading(true)
  //     const response = await fetch(
  //       `/api/flights?action=arrivals&param1=${airport}&param2=${dayAgo}&param3=${now}`
  //     )
  //     if (!response.ok) throw new Error("Failed to fetch airport arrivals")
  //     const data = await response.json()
  //     console.log("Data:  " + data)
  //     setFlightData(data)
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "An error occurred")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Flight Tracker</h1>
      <div className="space-x-4 mb-4">
        <h2 className="text-lg font-semibold">Track Flight</h2>
        <input
          type="text"
          placeholder="Enter ICAO24"
          className="px-4 py-2 text-gray-600 border rounded"
          // onChange={(e) => setFlightData(e.target.value)}
        />
        <button
          onClick={() => fetchFlightState(flightData as string)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Track Flight
        </button>

        {/* <input
          type="text"
          placeholder="Enter Airport Code"
          className="px-4 py-2 text-gray-600 border rounded"
          // onChange={(e) => setFlightData(e.target.value)}
        />
        <button
          onClick={() => fetchAirportArrivals(flightData as string)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get Arrivals
        </button>
        <button
          onClick={() => fetchFlightState("abc123")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          GitHub Copilot Pro Track Flight
        </button>
        <button
          onClick={() => fetchAirportArrivals("KJFK")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Get JFK Arrivals
        </button>
        */}
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <FlightDataDisplay data={flightData} />
    </div>
  )
}
