"use client"

import type React from "react"

import { Upload, Download, FileText, CheckCircle, AlertCircle, Trash2 } from "lucide-react"
import { useState, useRef } from "react"

interface ImportedData {
  type: "points" | "routes" | "employees"
  count: number
  timestamp: string
  status: "success" | "error"
  message: string
}

export default function XMLTools() {
  const [exportType, setExportType] = useState("all")
  const [importedFiles, setImportedFiles] = useState<ImportedData[]>([])
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const sampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<waste_management>
  <collection_points>
    <point id="1">
      <name>Point A1</name>
      <zone>Zone A</zone>
      <type>Plastic</type>
      <location>48.8566, 2.3522</location>
      <fill_level>85</fill_level>
      <status>Active</status>
    </point>
    <point id="2">
      <name>Point A2</name>
      <zone>Zone A</zone>
      <type>Organic</type>
      <location>48.8606, 2.3376</location>
      <fill_level>45</fill_level>
      <status>Active</status>
    </point>
  </collection_points>
  <routes>
    <route id="1">
      <name>Route A-1</name>
      <zone>Zone A</zone>
      <distance>24.5</distance>
      <points>12</points>
      <collected>2450</collected>
      <co2_emissions>8.2</co2_emissions>
      <status>Completed</status>
    </route>
  </routes>
  <employees>
    <employee id="1">
      <name>John Smith</name>
      <zone>Zone A</zone>
      <skill>Driver</skill>
      <availability>Available</availability>
      <phone>+1-555-0101</phone>
      <email>john.smith@wastehub.com</email>
    </employee>
  </employees>
</waste_management>`

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      processFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files[0]) {
      processFile(files[0])
    }
  }

  const processFile = (file: File) => {
    if (!file.name.endsWith(".xml")) {
      alert("Please upload an XML file")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(content, "text/xml")

        if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
          throw new Error("Invalid XML format")
        }

        // Count imported items
        const pointsCount = xmlDoc.getElementsByTagName("point").length
        const routesCount = xmlDoc.getElementsByTagName("route").length
        const employeesCount = xmlDoc.getElementsByTagName("employee").length
        const totalCount = pointsCount + routesCount + employeesCount

        const importData: ImportedData = {
          type: pointsCount > 0 ? "points" : routesCount > 0 ? "routes" : "employees",
          count: totalCount,
          timestamp: new Date().toLocaleString(),
          status: "success",
          message: `Successfully imported ${totalCount} items (${pointsCount} points, ${routesCount} routes, ${employeesCount} employees)`,
        }

        setImportedFiles([importData, ...importedFiles])
      } catch (error) {
        const importData: ImportedData = {
          type: "points",
          count: 0,
          timestamp: new Date().toLocaleString(),
          status: "error",
          message: `Error: ${error instanceof Error ? error.message : "Failed to parse XML"}`,
        }
        setImportedFiles([importData, ...importedFiles])
      }
    }
    reader.readAsText(file)
  }

  const handleExport = () => {
    let xmlContent = sampleXML

    // Generate XML based on export type
    if (exportType === "points") {
      xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<waste_management>
  <collection_points>
    <point id="1">
      <name>Point A1</name>
      <zone>Zone A</zone>
      <type>Plastic</type>
      <location>48.8566, 2.3522</location>
      <fill_level>85</fill_level>
      <status>Active</status>
    </point>
    <point id="2">
      <name>Point A2</name>
      <zone>Zone A</zone>
      <type>Organic</type>
      <location>48.8606, 2.3376</location>
      <fill_level>45</fill_level>
      <status>Active</status>
    </point>
    <point id="3">
      <name>Point B1</name>
      <zone>Zone B</zone>
      <type>Glass</type>
      <location>48.8530, 2.3499</location>
      <fill_level>95</fill_level>
      <status>Critical</status>
    </point>
  </collection_points>
</waste_management>`
    } else if (exportType === "routes") {
      xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<waste_management>
  <routes>
    <route id="1">
      <name>Route A-1</name>
      <zone>Zone A</zone>
      <distance>24.5</distance>
      <points>12</points>
      <collected>2450</collected>
      <co2_emissions>8.2</co2_emissions>
      <status>Completed</status>
      <assigned_to>John Smith</assigned_to>
    </route>
    <route id="2">
      <name>Route B-1</name>
      <zone>Zone B</zone>
      <distance>18.3</distance>
      <points>9</points>
      <collected>1890</collected>
      <co2_emissions>6.1</co2_emissions>
      <status>In Progress</status>
      <assigned_to>Maria Garcia</assigned_to>
    </route>
  </routes>
</waste_management>`
    } else if (exportType === "employees") {
      xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<waste_management>
  <employees>
    <employee id="1">
      <name>John Smith</name>
      <zone>Zone A</zone>
      <skill>Driver</skill>
      <availability>Available</availability>
      <phone>+1-555-0101</phone>
      <email>john.smith@wastehub.com</email>
      <routes_completed>3</routes_completed>
    </employee>
    <employee id="2">
      <name>Maria Garcia</name>
      <zone>Zone B</zone>
      <skill>Operator</skill>
      <availability>On Route</availability>
      <phone>+1-555-0102</phone>
      <email>maria.garcia@wastehub.com</email>
      <routes_completed>2</routes_completed>
    </employee>
    <employee id="3">
      <name>Ahmed Hassan</name>
      <zone>Zone C</zone>
      <skill>Driver</skill>
      <availability>Available</availability>
      <phone>+1-555-0103</phone>
      <email>ahmed.hassan@wastehub.com</email>
      <routes_completed>4</routes_completed>
    </employee>
  </employees>
</waste_management>`
    }

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/xml;charset=utf-8," + encodeURIComponent(xmlContent))
    element.setAttribute("download", `waste_management_${exportType}_${new Date().toISOString().split("T")[0]}.xml`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const clearHistory = () => {
    setImportedFiles([])
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text mb-2">XML Tools</h1>
        <p className="text-text-secondary">Import and export data for system interoperability</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Import Section */}
        <div className="card">
          <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Import Data
          </h2>
          <div className="space-y-4">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary"
              }`}
            >
              <input ref={fileInputRef} type="file" accept=".xml" onChange={handleFileInput} className="hidden" />
              <FileText className="w-12 h-12 text-text-secondary/50 mx-auto mb-3" />
              <p className="text-text-secondary font-medium">Drag and drop XML file</p>
              <p className="text-sm text-text-secondary/50 mt-2">or click to browse</p>
            </div>

            <div className="p-4 bg-surface-light rounded-lg">
              <p className="text-sm font-medium text-text mb-3">Supported data types:</p>
              <ul className="text-sm text-text-secondary space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Collection Points
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Routes & Assignments
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Employee Data
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="card">
          <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Data
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-2">Export Type</label>
              <select
                value={exportType}
                onChange={(e) => setExportType(e.target.value)}
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Data</option>
                <option value="points">Collection Points</option>
                <option value="routes">Route Reports</option>
                <option value="employees">Employee Data</option>
              </select>
            </div>
            <button onClick={handleExport} className="btn-primary w-full flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Export as XML
            </button>
            <p className="text-xs text-text-secondary">
              Exports current data in XML format compatible with municipal systems and third-party integrations
            </p>
          </div>
        </div>
      </div>

      {/* Import History */}
      {importedFiles.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text">Import History</h2>
            <button
              onClick={clearHistory}
              className="text-sm text-text-secondary hover:text-text transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
          <div className="space-y-3">
            {importedFiles.map((file, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${
                  file.status === "success" ? "bg-success/5 border-success/20" : "bg-danger/5 border-danger/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  {file.status === "success" ? (
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text">{file.message}</p>
                    <p className="text-xs text-text-secondary mt-1">{file.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample XML Format */}
      <div className="card">
        <h2 className="text-lg font-bold text-text mb-4">Sample XML Format</h2>
        <div className="bg-surface-light rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
          <pre className="text-xs text-text-secondary font-mono whitespace-pre-wrap break-words">{sampleXML}</pre>
        </div>
      </div>

      {/* XML Schema Documentation */}
      <div className="card">
        <h2 className="text-lg font-bold text-text mb-4">XML Schema Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface-light rounded-lg">
            <h3 className="font-bold text-text mb-2">Collection Points</h3>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• id: Unique identifier</li>
              <li>• name: Point name</li>
              <li>• zone: Zone assignment</li>
              <li>• type: Waste type</li>
              <li>• location: GPS coordinates</li>
              <li>• fill_level: 0-100%</li>
              <li>• status: Active/Inactive</li>
            </ul>
          </div>

          <div className="p-4 bg-surface-light rounded-lg">
            <h3 className="font-bold text-text mb-2">Routes</h3>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• id: Unique identifier</li>
              <li>• name: Route name</li>
              <li>• zone: Zone assignment</li>
              <li>• distance: Distance in km</li>
              <li>• points: Collection points</li>
              <li>• collected: Waste collected</li>
              <li>• co2_emissions: CO₂ in kg</li>
            </ul>
          </div>

          <div className="p-4 bg-surface-light rounded-lg">
            <h3 className="font-bold text-text mb-2">Employees</h3>
            <ul className="text-xs text-text-secondary space-y-1">
              <li>• id: Unique identifier</li>
              <li>• name: Employee name</li>
              <li>• zone: Zone assignment</li>
              <li>• skill: Job skill</li>
              <li>• availability: Status</li>
              <li>• phone: Contact number</li>
              <li>• email: Email address</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
