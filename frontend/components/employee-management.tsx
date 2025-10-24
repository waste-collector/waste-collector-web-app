"use client"

import type React from "react"

import { Plus, Edit2, Trash2, Route as MapRoute, X, Users } from "lucide-react"
import { useState } from "react"

interface Employee {
  id: number
  name: string
  zone: string
  skill: string
  availability: "Available" | "On Route" | "Off Duty"
  routes: number
  phone?: string
  email?: string
}

interface Route {
  id: number
  name: string
  zone: string
  distance: string
  points: number
  status: "Planned" | "In Progress" | "Completed"
  co2: string
  collected: string
  assignedTo?: string
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Smith",
      zone: "Zone A",
      skill: "Driver",
      availability: "Available",
      routes: 3,
      phone: "+1-555-0101",
      email: "john.smith@wastehub.com",
    },
    {
      id: 2,
      name: "Maria Garcia",
      zone: "Zone B",
      skill: "Operator",
      availability: "On Route",
      routes: 2,
      phone: "+1-555-0102",
      email: "maria.garcia@wastehub.com",
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      zone: "Zone C",
      skill: "Driver",
      availability: "Available",
      routes: 4,
      phone: "+1-555-0103",
      email: "ahmed.hassan@wastehub.com",
    },
  ])

  const [routes, setRoutes] = useState<Route[]>([
    {
      id: 1,
      name: "Route A-1",
      zone: "Zone A",
      distance: "24.5 km",
      points: 12,
      status: "Completed",
      co2: "8.2 kg",
      collected: "2,450 kg",
      assignedTo: "John Smith",
    },
    {
      id: 2,
      name: "Route B-1",
      zone: "Zone B",
      distance: "18.3 km",
      points: 9,
      status: "In Progress",
      co2: "6.1 kg",
      collected: "1,890 kg",
      assignedTo: "Maria Garcia",
    },
  ])

  const [showEmployeeForm, setShowEmployeeForm] = useState(false)
  const [showRouteForm, setShowRouteForm] = useState(false)
  const [editingEmployeeId, setEditingEmployeeId] = useState<number | null>(null)
  const [editingRouteId, setEditingRouteId] = useState<number | null>(null)

  const [employeeFormData, setEmployeeFormData] = useState({
    name: "",
    zone: "",
    skill: "",
    availability: "Available" as const,
    phone: "",
    email: "",
  })

  const [routeFormData, setRouteFormData] = useState({
    name: "",
    zone: "",
    distance: "",
    points: 0,
    status: "Planned" as const,
    co2: "",
    collected: "",
    assignedTo: "",
  })

  // Employee handlers
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingEmployeeId) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployeeId ? { ...emp, ...employeeFormData, routes: emp.routes } : emp,
        ),
      )
      setEditingEmployeeId(null)
    } else {
      const newEmployee: Employee = {
        ...employeeFormData,
        id: Math.max(...employees.map((e) => e.id), 0) + 1,
        routes: 0,
      }
      setEmployees([...employees, newEmployee])
    }
    resetEmployeeForm()
  }

  const handleEditEmployee = (employee: Employee) => {
    setEmployeeFormData({
      name: employee.name,
      zone: employee.zone,
      skill: employee.skill,
      availability: employee.availability,
      phone: employee.phone || "",
      email: employee.email || "",
    })
    setEditingEmployeeId(employee.id)
    setShowEmployeeForm(true)
  }

  const handleDeleteEmployee = (id: number) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id))
    }
  }

  const resetEmployeeForm = () => {
    setEmployeeFormData({
      name: "",
      zone: "",
      skill: "",
      availability: "Available",
      phone: "",
      email: "",
    })
    setShowEmployeeForm(false)
  }

  // Route handlers
  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingRouteId) {
      setRoutes(routes.map((route) => (route.id === editingRouteId ? { ...route, ...routeFormData } : route)))
      setEditingRouteId(null)
    } else {
      const newRoute: Route = {
        ...routeFormData,
        id: Math.max(...routes.map((r) => r.id), 0) + 1,
      }
      setRoutes([...routes, newRoute])
    }
    resetRouteForm()
  }

  const handleEditRoute = (route: Route) => {
    setRouteFormData({
      name: route.name,
      zone: route.zone,
      distance: route.distance,
      points: route.points,
      status: route.status,
      co2: route.co2,
      collected: route.collected,
      assignedTo: route.assignedTo || "",
    })
    setEditingRouteId(route.id)
    setShowRouteForm(true)
  }

  const handleDeleteRoute = (id: number) => {
    if (confirm("Are you sure you want to delete this route?")) {
      setRoutes(routes.filter((route) => route.id !== id))
    }
  }

  const resetRouteForm = () => {
    setRouteFormData({
      name: "",
      zone: "",
      distance: "",
      points: 0,
      status: "Planned",
      co2: "",
      collected: "",
      assignedTo: "",
    })
    setShowRouteForm(false)
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text mb-2">Employees & Routes</h1>
        <p className="text-text-secondary">Manage workforce and optimize collection routes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employees Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text">Employees</h2>
            <button onClick={() => setShowEmployeeForm(true)} className="btn-primary flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add Employee
            </button>
          </div>

          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-text-secondary font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium">Zone</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-text-secondary font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-b border-border hover:bg-surface-light">
                    <td className="py-3 px-4 text-text font-medium">{emp.name}</td>
                    <td className="py-3 px-4 text-text-secondary">{emp.zone}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`badge ${
                          emp.availability === "Available"
                            ? "badge-success"
                            : emp.availability === "On Route"
                              ? "badge-warning"
                              : "badge-danger"
                        }`}
                      >
                        {emp.availability}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditEmployee(emp)}
                          className="p-2 hover:bg-surface-light rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-text-secondary" />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(emp.id)}
                          className="p-2 hover:bg-surface-light rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-danger" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Routes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text">Active Routes</h2>
            <button onClick={() => setShowRouteForm(true)} className="btn-primary flex items-center gap-2 text-sm">
              <MapRoute className="w-4 h-4" />
              Plan Route
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {routes.map((route) => (
              <div key={route.id} className="card">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-text">{route.name}</h3>
                    <p className="text-sm text-text-secondary">{route.zone}</p>
                  </div>
                  <span
                    className={`badge ${
                      route.status === "Completed"
                        ? "badge-success"
                        : route.status === "In Progress"
                          ? "badge-warning"
                          : "badge-danger"
                    }`}
                  >
                    {route.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                  <div>
                    <p className="text-text-secondary">Distance</p>
                    <p className="font-medium text-text">{route.distance}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Points</p>
                    <p className="font-medium text-text">{route.points}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">CO₂ Emissions</p>
                    <p className="font-medium text-text">{route.co2}</p>
                  </div>
                  <div>
                    <p className="text-text-secondary">Collected</p>
                    <p className="font-medium text-text">{route.collected}</p>
                  </div>
                </div>
                {route.assignedTo && (
                  <div className="mb-3 p-2 bg-primary/10 rounded-lg">
                    <p className="text-xs text-text-secondary">Assigned to</p>
                    <p className="text-sm font-medium text-text">{route.assignedTo}</p>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditRoute(route)}
                    className="flex-1 p-2 hover:bg-surface-light rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteRoute(route.id)}
                    className="flex-1 p-2 hover:bg-surface-light rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4 text-danger" />
                    <span className="text-sm">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Form Modal */}
      {showEmployeeForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-surface">
              <h2 className="text-xl font-bold text-text flex items-center gap-2">
                <Users className="w-5 h-5" />
                {editingEmployeeId ? "Edit Employee" : "Add Employee"}
              </h2>
              <button onClick={resetEmployeeForm} className="p-1 hover:bg-surface-light rounded-lg transition-colors">
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={employeeFormData.name}
                  onChange={(e) => setEmployeeFormData({ ...employeeFormData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., John Smith"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Zone</label>
                <input
                  type="text"
                  required
                  value={employeeFormData.zone}
                  onChange={(e) => setEmployeeFormData({ ...employeeFormData, zone: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Zone A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Skill</label>
                <select
                  required
                  value={employeeFormData.skill}
                  onChange={(e) => setEmployeeFormData({ ...employeeFormData, skill: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select skill</option>
                  <option value="Driver">Driver</option>
                  <option value="Operator">Operator</option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Technician">Technician</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Availability</label>
                <select
                  value={employeeFormData.availability}
                  onChange={(e) =>
                    setEmployeeFormData({
                      ...employeeFormData,
                      availability: e.target.value as any,
                    })
                  }
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Available">Available</option>
                  <option value="On Route">On Route</option>
                  <option value="Off Duty">Off Duty</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Phone</label>
                <input
                  type="tel"
                  value={employeeFormData.phone}
                  onChange={(e) => setEmployeeFormData({ ...employeeFormData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+1-555-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Email</label>
                <input
                  type="email"
                  value={employeeFormData.email}
                  onChange={(e) => setEmployeeFormData({ ...employeeFormData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="employee@wastehub.com"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetEmployeeForm}
                  className="flex-1 px-4 py-2 bg-surface-light hover:bg-border text-text rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  {editingEmployeeId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Route Form Modal */}
      {showRouteForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-surface">
              <h2 className="text-xl font-bold text-text flex items-center gap-2">
                <MapRoute className="w-5 h-5" />
                {editingRouteId ? "Edit Route" : "Plan Route"}
              </h2>
              <button onClick={resetRouteForm} className="p-1 hover:bg-surface-light rounded-lg transition-colors">
                <X className="w-5 h-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleAddRoute} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">Route Name</label>
                <input
                  type="text"
                  required
                  value={routeFormData.name}
                  onChange={(e) => setRouteFormData({ ...routeFormData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Route A-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Zone</label>
                <input
                  type="text"
                  required
                  value={routeFormData.zone}
                  onChange={(e) => setRouteFormData({ ...routeFormData, zone: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Zone A"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Distance (km)</label>
                <input
                  type="text"
                  required
                  value={routeFormData.distance}
                  onChange={(e) => setRouteFormData({ ...routeFormData, distance: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 24.5 km"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Collection Points</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={routeFormData.points}
                  onChange={(e) => setRouteFormData({ ...routeFormData, points: Number.parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Status</label>
                <select
                  value={routeFormData.status}
                  onChange={(e) => setRouteFormData({ ...routeFormData, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">CO₂ Emissions</label>
                <input
                  type="text"
                  required
                  value={routeFormData.co2}
                  onChange={(e) => setRouteFormData({ ...routeFormData, co2: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 8.2 kg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Waste Collected</label>
                <input
                  type="text"
                  required
                  value={routeFormData.collected}
                  onChange={(e) => setRouteFormData({ ...routeFormData, collected: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 2,450 kg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">Assign to Employee</label>
                <select
                  value={routeFormData.assignedTo}
                  onChange={(e) => setRouteFormData({ ...routeFormData, assignedTo: e.target.value })}
                  className="w-full px-3 py-2 bg-surface-light border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select employee</option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.name}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetRouteForm}
                  className="flex-1 px-4 py-2 bg-surface-light hover:bg-border text-text rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  {editingRouteId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
