"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { JobOrderForm } from "@/components/job-order-form"
import { JobOrderPreviewModal } from "@/components/job-order-preview-modal"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, LogOut, Eye, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"

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

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [jobOrderData, setJobOrderData] = useState<JobOrderData>({
    srNo: 1,
    date: new Date().toLocaleDateString("en-GB"),
    salePerson: "",
    enteredBy: "",
    client: "",
    item: "",
    production: "",
    materialUsed: "",
    designer: "",
    artWorkProvided: "",
    invoiceNo: "",
    lpoNo: "",
    deliveryDate: "",
    doNo: "",
  })

  const [savedOrders, setSavedOrders] = useState<JobOrderData[]>([])
  const [activeTab, setActiveTab] = useState("form")
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewData, setPreviewData] = useState<JobOrderData | null>(null)
  const [isViewingMode, setIsViewingMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      loadJobOrders()
    }
  }, [])

  const loadJobOrders = async () => {
    setIsLoading(true)
    try {
      // Load job orders
      const ordersResponse = await fetch("/api/job-orders")
      const ordersData = await ordersResponse.json()
      setSavedOrders(ordersData.jobOrders || [])

      // Load last serial number
      const configResponse = await fetch("/api/config")
      const configData = await configResponse.json()
      setJobOrderData((prev) => ({ ...prev, srNo: (configData.lastSrNo || 0) + 1 }))
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem("isAuthenticated", "true")
    loadJobOrders()
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAuthenticated")
  }

  const handleSaveOrder = async (data: JobOrderData) => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/job-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to save job order")
      }

      // Reload job orders to get updated list
      await loadJobOrders()

      // Update serial number for next order
      setJobOrderData((prev) => ({
        ...prev,
        srNo: data.srNo + 1,
        date: new Date().toLocaleDateString("en-GB"),
        salePerson: "",
        enteredBy: "",
        client: "",
        item: "",
        production: "",
        materialUsed: "",
        designer: "",
        artWorkProvided: "",
        invoiceNo: "",
        lpoNo: "",
        deliveryDate: "",
        doNo: "",
      }))

      alert(`Job Order ${data.srNo} saved successfully!`)
      setShowPreviewModal(false)
      setIsViewingMode(false)
    } catch (error) {
      console.error("Error saving job order:", error)
      alert("Error saving job order. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteOrder = async (order: JobOrderData) => {
    if (!confirm(`Are you sure you want to delete Job Order #${order.srNo}?`)) {
      return
    }

    try {
      const response = await fetch(`/api/job-orders?id=${order.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete job order")
      }

      // Reload job orders
      await loadJobOrders()
      alert(`Job Order #${order.srNo} deleted successfully!`)
    } catch (error) {
      console.error("Error deleting job order:", error)
      alert("Error deleting job order. Please try again.")
    }
  }

  const handlePreview = () => {
    setPreviewData(jobOrderData)
    setIsViewingMode(false)
    setShowPreviewModal(true)
  }

  const handleViewSavedOrder = (order: JobOrderData) => {
    setPreviewData(order)
    setIsViewingMode(true)
    setShowPreviewModal(true)
  }

  const handleCloseModal = () => {
    setShowPreviewModal(false)
    setPreviewData(null)
    setIsViewingMode(false)
  }

  const resetForm = () => {
    setJobOrderData((prev) => ({
      ...prev,
      date: new Date().toLocaleDateString("en-GB"),
      salePerson: "",
      enteredBy: "",
      client: "",
      item: "",
      production: "",
      materialUsed: "",
      designer: "",
      artWorkProvided: "",
      invoiceNo: "",
      lpoNo: "",
      deliveryDate: "",
      doNo: "",
    }))
  }

  // Filter orders based on search query
  const filteredOrders = savedOrders.filter((order) => {
    if (!searchQuery.trim()) return true

    const query = searchQuery.toLowerCase().trim()
    const srNoString = order.srNo.toString()

    // Search by serial number (exact match or partial match)
    return srNoString.includes(query) || srNoString.padStart(6, "0").includes(query)
  })

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Order Management System</h1>
            <p className="text-gray-600">Lineart Printing, Advertising & Trading WLL</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Job Order
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Order History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Job Order Form</CardTitle>
                <div className="flex gap-2">
                  <Button onClick={resetForm} variant="outline">
                    Reset Form
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <JobOrderForm
                  data={jobOrderData}
                  onChange={setJobOrderData}
                  onSave={handleSaveOrder}
                  onPreview={handlePreview}
                  isSaving={isSaving}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Saved Job Orders ({filteredOrders.length} of {savedOrders.length})
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by Sr. No..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {searchQuery && (
                    <Button variant="outline" onClick={() => setSearchQuery("")} className="flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading job orders...
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="text-center py-8">
                    {searchQuery ? (
                      <div>
                        <p className="text-gray-500 mb-2">No job orders found matching "{searchQuery}"</p>
                        <Button variant="outline" onClick={() => setSearchQuery("")}>
                          Clear search
                        </Button>
                      </div>
                    ) : (
                      <p className="text-gray-500">No job orders saved yet.</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredOrders.map((order) => (
                      <div
                        key={order.id || order.srNo}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <span className="font-semibold">#{order.srNo}</span>
                          <span className="mx-2">-</span>
                          <span>{order.client}</span>
                          <span className="mx-2">-</span>
                          <span className="text-gray-500">{order.date}</span>
                          {order.createdAt && (
                            <>
                              <span className="mx-2">-</span>
                              <span className="text-xs text-gray-400">
                                {new Date(order.createdAt).toLocaleString()}
                              </span>
                            </>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewSavedOrder(order)}
                            className="flex items-center gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteOrder(order)}
                            className="flex items-center gap-2"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Preview Modal */}
        <JobOrderPreviewModal
          isOpen={showPreviewModal}
          onClose={handleCloseModal}
          data={previewData || jobOrderData}
          onSave={handleSaveOrder}
          isViewingMode={isViewingMode}
          isSaving={isSaving}
        />
      </div>
    </div>
  )
}
