"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Eye, Loader2 } from "lucide-react"
import type { JobOrderData } from "@/app/page"

interface JobOrderFormProps {
  data: JobOrderData
  onChange: (data: JobOrderData) => void
  onSave: (data: JobOrderData) => void
  onPreview: () => void
  isSaving?: boolean
}

export function JobOrderForm({ data, onChange, onSave, onPreview, isSaving = false }: JobOrderFormProps) {
  const handleInputChange = (field: keyof JobOrderData, value: string | number) => {
    onChange({ ...data, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <Label htmlFor="date" className="text-sm font-medium">
            Date
          </Label>
          <Input
            id="date"
            type="text"
            value={data.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="mt-1"
            disabled={isSaving}
          />
        </div>

        <div>
          <Label htmlFor="srNo" className="text-sm font-medium">
            Sr. No.
          </Label>
          <Input
            id="srNo"
            type="number"
            value={data.srNo}
            onChange={(e) => handleInputChange("srNo", Number.parseInt(e.target.value) || 1)}
            className="mt-1"
            readOnly
            disabled={isSaving}
          />
        </div>

        <div>
          <Label htmlFor="salePerson" className="text-sm font-medium">
            Sale Person
          </Label>
          <Input
            id="salePerson"
            type="text"
            value={data.salePerson}
            onChange={(e) => handleInputChange("salePerson", e.target.value)}
            className="mt-1"
            disabled={isSaving}
          />
        </div>

        <div>
          <Label htmlFor="enteredBy" className="text-sm font-medium">
            Entered By
          </Label>
          <Input
            id="enteredBy"
            type="text"
            value={data.enteredBy}
            onChange={(e) => handleInputChange("enteredBy", e.target.value)}
            className="mt-1"
            disabled={isSaving}
          />
        </div>

        <div>
          <Label htmlFor="client" className="text-sm font-medium">
            Client
          </Label>
          <Input
            id="client"
            type="text"
            value={data.client}
            onChange={(e) => handleInputChange("client", e.target.value)}
            className="mt-1"
            required
            disabled={isSaving}
          />
        </div>
      </div>

      {/* Job Details Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border p-2 rounded">Job Details</h3>

        <div className="space-y-4">
          <div>
            <Label htmlFor="item" className="text-sm font-medium">
              Item
            </Label>
            <Textarea
              id="item"
              value={data.item}
              onChange={(e) => handleInputChange("item", e.target.value)}
              className="mt-1 min-h-[120px]"
              placeholder="Enter item details..."
              required
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="production" className="text-sm font-medium">
              Production
            </Label>
            <Textarea
              id="production"
              value={data.production}
              onChange={(e) => handleInputChange("production", e.target.value)}
              className="mt-1 min-h-[120px]"
              placeholder="Enter production details..."
              disabled={isSaving}
            />
          </div>

          <div>
            <Label htmlFor="materialUsed" className="text-sm font-medium">
              Material Used
            </Label>
            <Textarea
              id="materialUsed"
              value={data.materialUsed}
              onChange={(e) => handleInputChange("materialUsed", e.target.value)}
              className="mt-1 min-h-[120px]"
              placeholder="Enter material details..."
              disabled={isSaving}
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="designer" className="text-sm font-medium">
              Designer
            </Label>
            <Input
              id="designer"
              type="text"
              value={data.designer}
              onChange={(e) => handleInputChange("designer", e.target.value)}
              className="mt-1"
              disabled={isSaving}
            />
          </div>

          <div>
            <Label htmlFor="lpoNo" className="text-sm font-medium">
              LPO NO.
            </Label>
            <Input
              id="lpoNo"
              type="text"
              value={data.lpoNo}
              onChange={(e) => handleInputChange("lpoNo", e.target.value)}
              className="mt-1"
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="artWorkProvided" className="text-sm font-medium">
              Art Work Provided
            </Label>
            <Input
              id="artWorkProvided"
              type="text"
              value={data.artWorkProvided}
              onChange={(e) => handleInputChange("artWorkProvided", e.target.value)}
              className="mt-1"
              disabled={isSaving}
            />
          </div>

          <div>
            <Label htmlFor="deliveryDate" className="text-sm font-medium">
              Delivery Date
            </Label>
            <Input
              id="deliveryDate"
              type="date"
              value={data.deliveryDate}
              onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
              className="mt-1"
              disabled={isSaving}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="invoiceNo" className="text-sm font-medium">
              Invoice No.
            </Label>
            <Input
              id="invoiceNo"
              type="text"
              value={data.invoiceNo}
              onChange={(e) => handleInputChange("invoiceNo", e.target.value)}
              className="mt-1"
              disabled={isSaving}
            />
          </div>

          <div>
            <Label htmlFor="doNo" className="text-sm font-medium">
              DO No.
            </Label>
            <Input
              id="doNo"
              type="text"
              value={data.doNo}
              onChange={(e) => handleInputChange("doNo", e.target.value)}
              className="mt-1"
              disabled={isSaving}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <Button
          type="button"
          onClick={onPreview}
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
          disabled={isSaving}
        >
          <Eye className="h-4 w-4" />
          Preview
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2" disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Job Order"
          )}
        </Button>
      </div>
    </form>
  )
}
