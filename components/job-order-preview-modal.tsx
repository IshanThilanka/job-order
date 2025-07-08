"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { JobOrderPreview } from "@/components/job-order-preview"
import { Printer, Save, X, Loader2 } from "lucide-react"
import type { JobOrderData } from "@/app/page"

interface JobOrderPreviewModalProps {
  isOpen: boolean
  onClose: () => void
  data: JobOrderData
  onSave: (data: JobOrderData) => void
  isViewingMode?: boolean
  isSaving?: boolean
}

export function JobOrderPreviewModal({
  isOpen,
  onClose,
  data,
  onSave,
  isViewingMode = false,
  isSaving = false,
}: JobOrderPreviewModalProps) {
  const handlePrint = async () => {
    // Convert logo to base64 for embedding in print document
    const getLogoBase64 = async (): Promise<string> => {
      try {
        const response = await fetch("/images/lineart-logo.png")
        const blob = await response.blob()
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.readAsDataURL(blob)
        })
      } catch (error) {
        console.error("Error loading logo:", error)
        return ""
      }
    }

    const logoBase64 = await getLogoBase64()

    // Create a new window for printing
    const printWindow = window.open("", "_blank", "width=800,height=600")

    if (printWindow) {
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Job Order ${data.srNo}</title>
            <style>
              @page {
                size: A4;
                margin: 0.5in;
              }
              
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: Arial, sans-serif;
                background: white;
                color: black;
                line-height: 1.4;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              .job-order-container {
                width: 100%;
                max-width: none;
                margin: 0;
                padding: 0;
              }
              
              .header-section {
                border: 2px solid black;
                margin-bottom: 16px;
              }
              
              .company-header {
                text-align: center;
                padding: 12px;
                border-bottom: 1px solid black;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 16px;
              }
              
              .company-header img {
                width: 100px;
                height: 50px;
                object-fit: contain;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              .company-header h1 {
                font-size: 18px;
                font-weight: bold;
                margin: 0;
              }
              
              .job-order-title {
                text-align: center;
                padding: 8px;
                background: #f3f4f6;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              .job-order-title h2 {
                font-size: 16px;
                font-weight: 600;
                margin: 0;
              }
              
              .main-grid {
                border: 2px solid black;
              }
              
              .top-row {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                border-bottom: 1px solid black;
              }
              
              .grid-cell {
                padding: 8px;
                border-right: 1px solid black;
                min-height: 60px;
              }
              
              .grid-cell:last-child {
                border-right: none;
              }
              
              .cell-label {
                font-size: 10px;
                font-weight: bold;
                margin-bottom: 4px;
              }
              
              .cell-content {
                font-size: 12px;
              }
              
              .sr-no-content {
                border: 1px solid black;
                text-align: center;
                padding: 4px 8px;
                font-weight: bold;
                font-size: 14px;
              }
              
              .job-details-header {
                padding: 8px;
                border-bottom: 1px solid black;
                text-align: center;
                font-size: 12px;
                font-weight: bold;
              }
              
              .item-section {
                border-bottom: 1px solid black;
              }
              
              .item-header {
                padding: 8px;
                font-size: 10px;
                font-weight: bold;
                border-bottom: 1px solid black;
              }
              
              .item-content {
                padding: 8px;
                min-height: 60px;
                font-size: 12px;
                white-space: pre-wrap;
              }
              
              .production-material-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                border-bottom: 1px solid black;
              }
              
              .production-section {
                border-right: 1px solid black;
              }
              
              .section-header {
                padding: 8px;
                font-size: 10px;
                font-weight: bold;
                border-bottom: 1px solid black;
              }
              
              .section-content {
                padding: 8px;
                min-height: 80px;
                font-size: 12px;
                white-space: pre-wrap;
              }
              
              .bottom-section {
                display: grid;
                grid-template-columns: 1fr 1fr 2fr;
              }
              
              .bottom-column {
                border-right: 1px solid black;
              }
              
              .bottom-column:last-child {
                border-right: none;
              }
              
              .bottom-row {
                border-bottom: 1px solid black;
              }
              
              .bottom-row:last-child {
                border-bottom: none;
              }
              
              .bottom-cell-header {
                padding: 8px;
                font-size: 10px;
                font-weight: bold;
                border-bottom: 1px solid #d1d5db;
              }
              
              .bottom-cell-content {
                padding: 8px;
                font-size: 12px;
                min-height: 40px;
              }
            </style>
          </head>
          <body>
            <div class="job-order-container">
              <!-- Header -->
              <div class="header-section">
                <div class="company-header">
                  ${logoBase64 ? `<img src="${logoBase64}" alt="Lineart Logo" />` : ""}
                  <h1>Lineart Printing, Advertising & Trading WLL</h1>
                </div>
                <div class="job-order-title">
                  <h2>Job Order</h2>
                </div>
              </div>

              <!-- Main Grid -->
              <div class="main-grid">
                <!-- Top Row -->
                <div class="top-row">
                  <div class="grid-cell">
                    <div class="cell-label">Date</div>
                    <div class="cell-content">${data.date}</div>
                  </div>
                  <div class="grid-cell">
                    <div class="cell-label">Sr. No.</div>
                    <div class="sr-no-content">${data.srNo.toString().padStart(6, "0")}</div>
                  </div>
                  <div class="grid-cell">
                    <div class="cell-label">Sale person</div>
                    <div class="cell-content">${data.salePerson}</div>
                  </div>
                  <div class="grid-cell">
                    <div class="cell-label">Entered by</div>
                    <div class="cell-content">${data.enteredBy}</div>
                  </div>
                  <div class="grid-cell">
                    <div class="cell-label">Client</div>
                    <div class="cell-content">${data.client}</div>
                  </div>
                </div>

                <!-- Job Details Header -->
                <div class="job-details-header">Job Details</div>

                <!-- Item Section -->
                <div class="item-section">
                  <div class="item-header">Item</div>
                  <div class="item-content">${data.item}</div>
                </div>

                <!-- Production and Material Used -->
                <div class="production-material-row">
                  <div class="production-section">
                    <div class="section-header">Production</div>
                    <div class="section-content">${data.production}</div>
                  </div>
                  <div>
                    <div class="section-header">Material Used</div>
                    <div class="section-content">${data.materialUsed}</div>
                  </div>
                </div>

                <!-- Bottom Section -->
                <div class="bottom-section">
                  <div class="bottom-column">
                    <div class="bottom-row">
                      <div class="bottom-cell-header">Designer</div>
                      <div class="bottom-cell-content">${data.designer}</div>
                    </div>
                    <div class="bottom-row">
                      <div class="bottom-cell-header">LPO NO.</div>
                      <div class="bottom-cell-content">${data.lpoNo}</div>
                    </div>
                  </div>
                  <div class="bottom-column">
                    <div class="bottom-row">
                      <div class="bottom-cell-header">Art work provided</div>
                      <div class="bottom-cell-content">${data.artWorkProvided}</div>
                    </div>
                    <div class="bottom-row">
                      <div class="bottom-cell-header">Delivery Date</div>
                      <div class="bottom-cell-content">${data.deliveryDate}</div>
                    </div>
                  </div>
                  <div class="bottom-column">
                    <div class="bottom-row">
                      <div class="bottom-cell-header">Invoice No.</div>
                      <div class="bottom-cell-content">${data.invoiceNo}</div>
                    </div>
                    <div class="bottom-row">
                      <div class="bottom-cell-header">DO No.</div>
                      <div class="bottom-cell-content">${data.doNo}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `

      printWindow.document.write(printContent)
      printWindow.document.close()

      // Wait for content to load, then print and close
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 500)
      }
    }
  }

  const handleSave = () => {
    onSave(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="print:hidden">
          <DialogTitle className="flex items-center justify-between">
            <span>{isViewingMode ? `Job Order #${data.srNo}` : "Job Order Preview"}</span>
            <div className="flex gap-2">
              <Button onClick={handlePrint} variant="outline" size="sm" disabled={isSaving}>
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              {!isViewingMode && (
                <Button onClick={handleSave} size="sm" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save & Close
                    </>
                  )}
                </Button>
              )}
              <Button onClick={onClose} variant="ghost" size="sm" disabled={isSaving}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="modal-job-order-preview">
          <JobOrderPreview data={data} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
