"use client"

import type { JobOrderData } from "@/app/page"
import Image from "next/image"

interface JobOrderPreviewProps {
  data: JobOrderData
}

export function JobOrderPreview({ data }: JobOrderPreviewProps) {
  return (
    <div className="bg-white p-8 border border-gray-300 max-w-4xl mx-auto print:p-0 print:border-0 print:max-w-none print:shadow-none">
      {/* Header */}
      <div className="border-2 border-black mb-4 print:mb-2">
        <div className="text-center py-3 border-b border-black">
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/images/lineart-logo.png"
              alt="Lineart Logo"
              width={120}
              height={60}
              className="print:w-[100px] print:h-[50px]"
              priority
            />
            <h1 className="text-xl font-bold print:text-lg">Lineart Printing, Advertising & Trading WLL</h1>
          </div>
        </div>
        <div className="text-center py-2 bg-gray-100 print:bg-white">
          <h2 className="text-lg font-semibold print:text-base">Job Order</h2>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="border-2 border-black">
        {/* Top Row */}
        <div className="grid grid-cols-5 border-b border-black">
          <div className="border-r border-black p-2 print:p-1">
            <div className="text-xs font-semibold">Date</div>
            <div className="text-sm mt-1 print:text-xs print:mt-0.5">{data.date}</div>
          </div>
          <div className="border-r border-black p-2 print:p-1">
            <div className="text-xs font-semibold p-1 mb-1 print:p-0.5 print:mb-0.5">Sr. No.</div>
            <div className="border text-center py-1 px-2 font-bold text-lg print:text-base print:py-0.5 print:px-1">
              {data.srNo.toString().padStart(6, "0")}
            </div>
          </div>
          <div className="border-r border-black p-2 print:p-1">
            <div className="text-xs font-semibold">Sale person</div>
            <div className="text-sm mt-1 print:text-xs print:mt-0.5">{data.salePerson}</div>
          </div>
          <div className="border-r border-black p-2 print:p-1">
            <div className="text-xs font-semibold">Entered by</div>
            <div className="text-sm mt-1 print:text-xs print:mt-0.5">{data.enteredBy}</div>
          </div>
          <div className="p-2 print:p-1">
            <div className="text-xs font-semibold">Client</div>
            <div className="text-sm mt-1 print:text-xs print:mt-0.5">{data.client}</div>
          </div>
        </div>

        {/* Job Details Header */}
        <div className="p-2 border-b border-black text-center print:p-1">
          <div className="text-sm font-semibold print:text-xs">Job Details</div>
        </div>

        {/* Item Row */}
        <div className="border-b border-black">
          <div className="p-2 text-xs font-semibold border-b border-black print:p-1">Item</div>
          <div className="p-2 min-h-[80px] text-sm whitespace-pre-wrap print:p-1 print:min-h-[60px] print:text-xs">
            {data.item}
          </div>
        </div>

        {/* Production and Material Used Row */}
        <div className="grid grid-cols-2 border-b border-black">
          <div className="border-r border-black">
            <div className="p-2 text-xs font-semibold border-b border-black print:p-1">Production</div>
            <div className="p-2 min-h-[120px] text-sm whitespace-pre-wrap print:p-1 print:min-h-[80px] print:text-xs">
              {data.production}
            </div>
          </div>
          <div>
            <div className="p-2 text-xs font-semibold border-b border-black print:p-1">Material Used</div>
            <div className="p-2 min-h-[120px] text-sm whitespace-pre-wrap print:p-1 print:min-h-[80px] print:text-xs">
              {data.materialUsed}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-4">
          {/* Left Column */}
          <div className="border-r border-black">
            <div className="border-b border-black">
              <div className="p-2 text-xs font-semibold border-b border-gray-300 print:p-1">Designer</div>
              <div className="p-2 text-sm print:p-1 print:text-xs">{data.designer}</div>
            </div>
            <div>
              <div className="p-2 text-xs font-semibold border-b border-gray-300 print:p-1">LPO NO.</div>
              <div className="p-2 text-sm print:p-1 print:text-xs">{data.lpoNo}</div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="border-r border-black">
            <div className="border-b border-black">
              <div className="p-2 text-xs font-semibold border-b border-gray-300 print:p-1">Art work provided</div>
              <div className="p-2 text-sm print:p-1 print:text-xs">{data.artWorkProvided}</div>
            </div>
            <div>
              <div className="p-2 text-xs font-semibold border-b border-gray-300 print:p-1">Delivery Date</div>
              <div className="p-2 text-sm print:p-1 print:text-xs">{data.deliveryDate}</div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-2">
            <div className="border-b border-black">
              <div className="p-2 text-xs font-semibold border-b border-gray-300 print:p-1">Invoice No.</div>
              <div className="p-2 text-sm print:p-1 print:text-xs">{data.invoiceNo}</div>
            </div>
            <div>
              <div className="p-2 text-xs font-semibold border-b border-gray-300 print:p-1">DO No.</div>
              <div className="p-2 text-sm print:p-1 print:text-xs">{data.doNo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
