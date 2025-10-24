"use client"

import { useEffect, useRef, useState } from "react"
import { AlertCircle, CheckCircle, Maximize2, ZoomIn, ZoomOut } from "lucide-react"

interface CollectionPoint {
  id: number
  name: string
  zone: string
  fill: number
  status: "normal" | "warning" | "critical"
  lat: number
  lng: number
}

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [selectedPoint, setSelectedPoint] = useState<CollectionPoint | null>(null)
  const [mapReady, setMapReady] = useState(false)

  const collectionPoints: CollectionPoint[] = [
    { id: 1, name: "Point A1", zone: "Zone A", fill: 85, status: "warning", lat: 48.8566, lng: 2.3522 },
    { id: 2, name: "Point A2", zone: "Zone A", fill: 45, status: "normal", lat: 48.8606, lng: 2.3376 },
    { id: 3, name: "Point B1", zone: "Zone B", fill: 95, status: "critical", lat: 48.853, lng: 2.3499 },
    { id: 4, name: "Point B2", zone: "Zone B", fill: 30, status: "normal", lat: 48.8584, lng: 2.2945 },
    { id: 5, name: "Point C1", zone: "Zone C", fill: 60, status: "normal", lat: 48.8693, lng: 2.3412 },
  ]

  useEffect(() => {
    if (!mapContainer.current) return

    // Dynamically load Leaflet CSS and JS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"
    script.onload = () => {
      const L = (window as any).L

      // Initialize map centered on Paris
      map.current = L.map(mapContainer.current).setView([48.8566, 2.3522], 13)

      // Add tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map.current)

      // Add markers for each collection point
      collectionPoints.forEach((point) => {
        const markerColor = point.status === "critical" ? "#ef4444" : point.status === "warning" ? "#f59e0b" : "#10b981"

        const markerHtml = `
          <div style="
            background-color: ${markerColor};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            cursor: pointer;
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3" fill="white"></circle>
            </svg>
          </div>
        `

        const customIcon = L.divIcon({
          html: markerHtml,
          iconSize: [32, 32],
          className: "custom-marker",
        })

        const marker = L.marker([point.lat, point.lng], { icon: customIcon }).addTo(map.current)

        marker.on("click", () => {
          setSelectedPoint(point)
        })

        // Bind popup
        marker.bindPopup(`
          <div style="font-family: system-ui; font-size: 14px;">
            <strong>${point.name}</strong><br/>
            Zone: ${point.zone}<br/>
            Fill: ${point.fill}%<br/>
            Status: ${point.status}
          </div>
        `)
      })

      setMapReady(true)
    }
    document.body.appendChild(script)

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  const handleZoomIn = () => {
    if (map.current) map.current.zoomIn()
  }

  const handleZoomOut = () => {
    if (map.current) map.current.zoomOut()
  }

  const handleFitBounds = () => {
    if (map.current && collectionPoints.length > 0) {
      const bounds = collectionPoints.map((p) => [p.lat, p.lng])
      const L = (window as any).L
      map.current.fitBounds(L.latLngBounds(bounds), { padding: [50, 50] })
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-2">Interactive Map</h1>
        <p className="text-text-secondary">Real-time visualization of collection points and fill levels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Container */}
        <div className="lg:col-span-2 relative">
          <div ref={mapContainer} className="card h-96 rounded-lg overflow-hidden" />

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button
              onClick={handleZoomIn}
              className="bg-white hover:bg-surface-light p-2 rounded-lg shadow-lg transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-5 h-5 text-text" />
            </button>
            <button
              onClick={handleZoomOut}
              className="bg-white hover:bg-surface-light p-2 rounded-lg shadow-lg transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-5 h-5 text-text" />
            </button>
            <button
              onClick={handleFitBounds}
              className="bg-white hover:bg-surface-light p-2 rounded-lg shadow-lg transition-colors"
              title="Fit all points"
            >
              <Maximize2 className="w-5 h-5 text-text" />
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 z-10">
            <h3 className="font-semibold text-text mb-3 text-sm">Status Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-success" />
                <span className="text-xs text-text">Normal (0-70%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-warning" />
                <span className="text-xs text-text">Warning (71-90%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-danger" />
                <span className="text-xs text-text">Critical (91-100%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar with Collection Points */}
        <div className="space-y-4">
          <div className="card">
            <h2 className="text-lg font-bold text-text mb-4">Collection Points</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {collectionPoints.map((point) => (
                <div
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`p-3 rounded-lg transition-colors cursor-pointer ${
                    selectedPoint?.id === point.id
                      ? "bg-primary/20 border border-primary"
                      : "bg-surface-light hover:bg-border"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-text text-sm">{point.name}</p>
                      <p className="text-xs text-text-secondary">{point.zone}</p>
                    </div>
                    {point.status === "critical" ? (
                      <AlertCircle className="w-4 h-4 text-danger" />
                    ) : point.status === "warning" ? (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <div className="w-full bg-surface rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        point.fill > 90 ? "bg-danger" : point.fill > 70 ? "bg-warning" : "bg-success"
                      }`}
                      style={{ width: `${point.fill}%` }}
                    />
                  </div>
                  <p className="text-xs text-text-secondary mt-2">{point.fill}% full</p>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Point Details */}
          {selectedPoint && (
            <div className="card bg-primary/5 border border-primary/20">
              <h3 className="font-bold text-text mb-3">Point Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-text-secondary">Name</p>
                  <p className="text-text font-medium">{selectedPoint.name}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Zone</p>
                  <p className="text-text font-medium">{selectedPoint.zone}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Fill Level</p>
                  <p className="text-text font-medium">{selectedPoint.fill}%</p>
                </div>
                <div>
                  <p className="text-text-secondary">Status</p>
                  <p
                    className={`font-medium capitalize ${
                      selectedPoint.status === "critical"
                        ? "text-danger"
                        : selectedPoint.status === "warning"
                          ? "text-warning"
                          : "text-success"
                    }`}
                  >
                    {selectedPoint.status}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary">Coordinates</p>
                  <p className="text-text font-mono text-xs">
                    {selectedPoint.lat.toFixed(4)}, {selectedPoint.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
