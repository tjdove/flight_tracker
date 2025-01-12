// app/api/flights/route.ts
import { NextRequest, NextResponse } from "next/server"
import { openskyApi } from "@/lib/services/openskyApi"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get("action")
  const param1 = searchParams.get("param1")
  const param2 = searchParams.get("param2")
  const param3 = searchParams.get("param3")

  if (!action || !param1) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    )
  }

  try {
    let result

    switch (action) {
      case "state":
        result = await openskyApi.getAircraftState(param1)
        break
      case "arrivals":
        if (!param2 || !param3) {
          throw new Error("Missing timestamp parameters")
        }
        result = await openskyApi.getAirportArrivals(
          param1,
          parseInt(param2),
          parseInt(param3)
        )
        break
      case "departures":
        if (!param2 || !param3) {
          throw new Error("Missing timestamp parameters")
        }
        result = await openskyApi.getAirportDepartures(
          param1,
          parseInt(param2),
          parseInt(param3)
        )
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    )
  }
}
