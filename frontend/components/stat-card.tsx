"use client"

import type React from "react"

import { Trash2, Truck, Users, AlertCircle, TrendingUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: string
  color: string
}

export default function StatCard({ title, value, change, icon, color }: StatCardProps) {
  const iconMap: Record<string, React.ReactNode> = {
    trash: <Trash2 className="w-8 h-8" />,
    truck: <Truck className="w-8 h-8" />,
    users: <Users className="w-8 h-8" />,
    alert: <AlertCircle className="w-8 h-8" />,
  }

  const colorMap: Record<string, string> = {
    primary: "bg-primary/20 text-primary",
    info: "bg-info/20 text-info",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>{iconMap[icon]}</div>
        <span className="text-sm font-medium text-success flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          {change}
        </span>
      </div>
      <p className="text-text-secondary text-sm mb-1">{title}</p>
      <p className="text-3xl font-bold text-text">{value}</p>
    </div>
  )
}
