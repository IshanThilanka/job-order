import { type NextRequest, NextResponse } from "next/server"
import { put, list, del } from "@vercel/blob"

export interface JobOrderData {
  srNo: number
  date: string
  salePerson: string
  enteredBy: string
  client: string
  item: string
  production: string
  materialUsed: string
  designer: string
  artWorkProvided: string
  invoiceNo: string
  lpoNo: string
  deliveryDate: string
  doNo: string
  createdAt?: string
  id?: string
}

// GET - Fetch all job orders
export async function GET() {
  try {
    const { blobs } = await list({
      prefix: "job-orders/",
    })

    const jobOrders: JobOrderData[] = []

    for (const blob of blobs) {
      try {
        const response = await fetch(blob.url)
        const data = await response.json()
        jobOrders.push(data)
      } catch (error) {
        console.error(`Error fetching blob ${blob.pathname}:`, error)
      }
    }

    // Sort by creation time (newest first), then by serial number
    jobOrders.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return b.srNo - a.srNo
    })

    return NextResponse.json({ jobOrders })
  } catch (error) {
    console.error("Error fetching job orders:", error)
    return NextResponse.json({ error: "Failed to fetch job orders" }, { status: 500 })
  }
}

// POST - Save a new job order
export async function POST(request: NextRequest) {
  try {
    const jobOrder: JobOrderData = await request.json()

    // Add timestamp and unique ID to the job order
    const timestamp = new Date().toISOString()
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const jobOrderWithMetadata = {
      ...jobOrder,
      createdAt: timestamp,
      id: uniqueId,
    }

    // Create unique filename using timestamp and random ID to avoid conflicts
    const filename = `job-orders/job-order-${jobOrder.srNo}-${uniqueId}.json`

    // Save job order to Vercel Blob with unique filename
    const blob = await put(filename, JSON.stringify(jobOrderWithMetadata), {
      access: "public",
      contentType: "application/json",
    })

    // Update last serial number (this can be overwritten as it's just tracking the counter)
    await put("config/last-sr-no.json", JSON.stringify({ lastSrNo: jobOrder.srNo }), {
      access: "public",
      contentType: "application/json",
      allowOverwrite: true,
    })

    return NextResponse.json({ success: true, url: blob.url, id: uniqueId })
  } catch (error) {
    console.error("Error saving job order:", error)
    return NextResponse.json({ error: "Failed to save job order" }, { status: 500 })
  }
}

// DELETE - Delete a job order
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Job order ID is required" }, { status: 400 })
    }

    // Find the blob with the matching ID
    const { blobs } = await list({
      prefix: "job-orders/",
    })

    const blobToDelete = blobs.find((blob) => blob.pathname.includes(id))

    if (!blobToDelete) {
      return NextResponse.json({ error: "Job order not found" }, { status: 404 })
    }

    await del(blobToDelete.pathname)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting job order:", error)
    return NextResponse.json({ error: "Failed to delete job order" }, { status: 500 })
  }
}
