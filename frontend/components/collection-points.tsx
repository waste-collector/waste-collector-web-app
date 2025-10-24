"use client"

import type React from "react"

import { Plus, Edit2, Trash2, Search, X } from "lucide-react"
import { useState } from "react"

interface CollectionPoint {
  id: number
  name: string
  zone: string
  type: string
  fill: number
  status: "Active" | "Inactive" | "Critical"
  location: string
}

export default function CollectionPoints() {
  const [points, setPoints] = useState<CollectionPoint[]>([
    {
      id: 1,
      name: "Point A1",
      zone: "Zone A",
      type: "Plastic",
      fill: 85,
      status: "Active",
      location: "48.8566, 2.3522",
    },
    {
      id: 2,
      name: "Point A2",
      zone: "Zone A",
      type: "Organic",
      fill: 45,
      status: "Active",
      location: "48.8606, 2.3376",
    },
    {
      id: 3,
      name: "Point B1",
      zone: "Zone B",
      type: "Glass",
      fill: 95,
      status: "Critical",
      location: "48.8530, 2.3499",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterZone, setFilterZone] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const [formData, setFormData] = useState({
    name: "",
    zone: "",
    type: "",
    fill: 0,
    status: "Active" as const,
    location: "",
  })

  // Get unique zones for filter
  const zones = Array.from(new Set(points.map((p) => p.zone)))

  // Filter and search logic
  const filteredPoints = points.filter((point) => {
    const matchesSearch =
      point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      point.zone.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesZone = filterZone === "all" || point.zone === filterZone
    const matchesStatus = filterStatus === "all" || point.status === filterStatus
    return matchesSearch && matchesZone && matchesStatus
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      // Update existing point
      setPoints(points.map((p) => (p.id === editingId ? { ...formData, id: p.id } : p)))
      setEditingId(null)
    } else {
      // Add new point
      const newPoint: CollectionPoint = {
        ...formData,
        id: Math.max(...points.map((p) => p.id), 0) + 1,
      }
      setPoints([...points, newPoint])
    }

    // Reset form
    setFormData({
      name: "",
      zone: "",
      type: "",
      fill: 0,
      status: "Active",
      location: "",
    })
    setShowForm(false)
  }

  const handleEdit = (point: CollectionPoint) => {
    setFormData(point)
    setEditingId(point.id)
    setShowForm(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this collection point?")) {
      setPoints(points.filter((p) => p.id !== id))
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: "",
      zone: "",
      type: "",
      fill: 0,
      status: "Active",
      location: "",
    })
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Collection Points</h1>
          <p className="text-text-secondary">Manage all waste collection locations</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Point
        </button>
      </div>

      <div className="card space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search by name or zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-light border border-border rounded-lg text-text placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
            className="px-4 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Zones</option>
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <p className="text-sm text-text-secondary">
          Showing {filteredPoints.length} of {points.length} collection points
        </p>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Name</th>
              <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Zone</th>
              <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Type</th>
              <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Fill Level</th>
              <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Status</th>
              <th className="text-left py-3 px-4 text-text-secondary text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPoints.length > 0 ? (
              filteredPoints.map((point) => (
                <tr key={point.id} className="border-b border-border hover:bg-surface-light transition-colors">
                  <td className="py-3 px-4 text-text font-medium">{point.name}</td>
                  <td className="py-3 px-4 text-text-secondary">{point.zone}</td>
                  <td className="py-3 px-4 text-text-secondary">{point.type}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-surface rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            point.fill > 90 ? "bg-danger" : point.fill > 70 ? "bg-warning" : "bg-success"
                          }`}
                          style={{ width: `${point.fill}%` }}
                        />
                      </div>
                      <span className="text-sm text-text-secondary">{point.fill}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`badge ${
                        point.status === "Critical"
                          ? "badge-danger"
                          : point.status === "Active"
                            ? "badge-success"
                            : "badge-warning"
                      }`}
                    >
                      {point.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(point)}
                        className="p-2 hover:bg-surface-light rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-text-secondary" />
                      </button>
                      <button
                        onClick={() => handleDelete(point.id)}
                        className="p-2 hover:bg-surface-light rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-danger" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 px-4 text-center">
                  <p className="text-text-secondary">No collection points found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-surface">
              <h2 className="text-xl font-bold text-text">
                {editingId ? "Edit Collection Point" : "Add Collection Point"}
              </h2>
              <button onClick={handleCloseForm} className="p-1 hover:bg-surface-light rounded-lg transition-colors">
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Point A1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Zone</label>
                <input
                  type="text"
                  required
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Zone A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Type</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select type</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Organic">Organic</option>
                  <option value="Glass">Glass</option>
                  <option value="Metal">Metal</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Fill Level (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  required
                  value={formData.fill}
                  onChange={(e) => setFormData({ ...formData, fill: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Location (Coordinates)</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 48.8566, 2.3522"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 px-4 py-2 bg-surface-light hover:bg-border text-text rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  {editingId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
