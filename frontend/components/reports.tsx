"use client"

import { Download, BarChart3, TrendingUp, Calendar } from "lucide-react"
import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function Reports() {
  const [dateRange, setDateRange] = useState("month")

  const reportData = [
    {
      period: "Today",
      collected: "12,450 kg",
      routes: 8,
      vehicles: 12,
      co2: "42.3 kg",
      efficiency: "94%",
    },
    {
      period: "This Week",
      collected: "87,320 kg",
      routes: 56,
      vehicles: 12,
      co2: "296.8 kg",
      efficiency: "91%",
    },
    {
      period: "This Month",
      collected: "378,950 kg",
      routes: 248,
      vehicles: 12,
      co2: "1,287.4 kg",
      efficiency: "89%",
    },
  ]

  const dailyCollectionData = [
    { day: "Mon", collected: 12450, target: 15000 },
    { day: "Tue", collected: 14200, target: 15000 },
    { day: "Wed", collected: 13800, target: 15000 },
    { day: "Thu", collected: 15600, target: 15000 },
    { day: "Fri", collected: 16200, target: 15000 },
    { day: "Sat", collected: 14900, target: 15000 },
    { day: "Sun", collected: 13170, target: 15000 },
  ]

  const wasteTypeData = [
    { name: "Plastic", value: 35, amount: "34,560 kg" },
    { name: "Organic", value: 29, amount: "28,920 kg" },
    { name: "Glass", value: 22, amount: "22,340 kg" },
    { name: "Metal", value: 14, amount: "14,130 kg" },
  ]

  const zonePerformanceData = [
    { zone: "Zone A", collected: 95000, efficiency: 94 },
    { zone: "Zone B", collected: 87000, efficiency: 91 },
    { zone: "Zone C", collected: 78000, efficiency: 88 },
    { zone: "Zone D", collected: 65000, efficiency: 85 },
    { zone: "Zone E", collected: 53950, efficiency: 82 },
  ]

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"]

  const handleExportReport = () => {
    const reportContent = `
Waste Management Report - ${new Date().toLocaleDateString()}
================================================

Period: ${dateRange}

Summary:
- Total Collected: 378,950 kg
- Routes Completed: 248
- Vehicles Used: 12
- CO₂ Emissions: 1,287.4 kg
- Efficiency: 89%

Waste Type Distribution:
- Plastic: 34,560 kg (35%)
- Organic: 28,920 kg (29%)
- Glass: 22,340 kg (22%)
- Metal: 14,130 kg (14%)

Performance Metrics:
- Route Efficiency: 94%
- On-Time Completion: 98%
- Vehicle Utilization: 87%
- Employee Productivity: 91%
    `
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(reportContent))
    element.setAttribute("download", `waste-report-${new Date().toISOString().split("T")[0]}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">Reports & Analytics</h1>
          <p className="text-text-secondary">Performance metrics and collection statistics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-surface-light rounded-lg p-2">
            <Calendar className="w-4 h-4 text-text-secondary" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-text text-sm focus:outline-none"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <button onClick={handleExportReport} className="btn-primary flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportData.map((report, idx) => (
          <div key={idx} className="card">
            <h3 className="text-lg font-bold text-text mb-4">{report.period}</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-text-secondary">Total Collected</p>
                <p className="text-2xl font-bold text-primary">{report.collected}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-text-secondary">Routes</p>
                  <p className="font-bold text-text">{report.routes}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Vehicles</p>
                  <p className="font-bold text-text">{report.vehicles}</p>
                </div>
                <div>
                  <p className="text-text-secondary">CO₂ Emissions</p>
                  <p className="font-bold text-text">{report.co2}</p>
                </div>
                <div>
                  <p className="text-text-secondary">Efficiency</p>
                  <p className="font-bold text-success">{report.efficiency}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Collection Trend */}
        <div className="card">
          <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Daily Collection Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyCollectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis stroke="var(--color-text-secondary)" />
              <YAxis stroke="var(--color-text-secondary)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  color: "var(--color-text)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="collected"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981" }}
                name="Collected (kg)"
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#f59e0b" }}
                name="Target (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Waste Type Distribution */}
        <div className="card">
          <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Waste Type Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={wasteTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {wasteTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  color: "var(--color-text)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Zone Performance and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zone Performance */}
        <div className="card">
          <h2 className="text-xl font-bold text-text mb-4">Zone Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={zonePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis stroke="var(--color-text-secondary)" />
              <YAxis stroke="var(--color-text-secondary)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  color: "var(--color-text)",
                }}
              />
              <Legend />
              <Bar dataKey="collected" fill="#10b981" name="Collected (kg)" />
              <Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="card">
          <h2 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Performance Metrics
          </h2>
          <div className="space-y-4">
            {[
              { metric: "Route Efficiency", value: "94%", trend: "+2%" },
              { metric: "On-Time Completion", value: "98%", trend: "+1%" },
              { metric: "Vehicle Utilization", value: "87%", trend: "+3%" },
              { metric: "Employee Productivity", value: "91%", trend: "+2%" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-surface-light rounded-lg">
                <p className="text-text font-medium">{item.metric}</p>
                <div className="text-right">
                  <p className="font-bold text-text">{item.value}</p>
                  <p className="text-xs text-success">{item.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Waste Type Breakdown Table */}
      <div className="card">
        <h2 className="text-xl font-bold text-text mb-4">Waste Type Breakdown</h2>
        <div className="space-y-3">
          {wasteTypeData.map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-text font-medium">{item.name}</p>
                <p className="text-text-secondary text-sm">{item.amount}</p>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: COLORS[idx % COLORS.length],
                  }}
                />
              </div>
              <p className="text-xs text-text-secondary mt-1">{item.value}% of total</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
