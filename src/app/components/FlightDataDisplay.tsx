// app/components/FlightDataDisplay.tsx
"use client"

import { AircraftState, FlightInfo } from "@/lib/types/opensky"

type FlightDataDisplayProps = {
  data: AircraftState | FlightInfo[] | null
}

export function FlightDataDisplay({ data }: FlightDataDisplayProps) {
  if (!data) return null

  return (
    <div className="p-4 text-gray-600 bg-white rounded shadow">
      <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
