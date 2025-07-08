import { NextResponse } from "next/server"
import { list } from "@vercel/blob"

// GET - Fetch configuration (last serial number)
export async function GET() {
  try {
    const { blobs } = await list({
      prefix: "config/last-sr-no.json",
    })

    if (blobs.length === 0) {
      // No config found, return default
      return NextResponse.json({ lastSrNo: 0 })
    }

    const response = await fetch(blobs[0].url)
    const config = await response.json()

    return NextResponse.json(config)
  } catch (error) {
    console.error("Error fetching config:", error)
    return NextResponse.json({ lastSrNo: 0 })
  }
}
