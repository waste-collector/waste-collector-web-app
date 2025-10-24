"use client"

import { useState } from "react"
import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"
import MapView from "@/components/map-view"
import CollectionPoints from "@/components/collection-points"
import EmployeeManagement from "@/components/employee-management"
import Reports from "@/components/reports"
import XMLTools from "@/components/xml-tools"

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "map" && <MapView />}
        {activeTab === "collection-points" && <CollectionPoints />}
        {activeTab === "employees" && <EmployeeManagement />}
        {activeTab === "reports" && <Reports />}
        {activeTab === "xml" && <XMLTools />}
      </main>
    </div>
  )
}
