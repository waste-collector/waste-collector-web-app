"use client"

import type React from "react"

import { AlertCircle, CheckCircle, Info } from "lucide-react"

export default function NotificationPanel() {
  const notifications = [
    {
      type: "alert",
      title: "Container Full",
      message: "Point #45 in Zone B is at 95% capacity",
      time: "5 min ago",
    },
    {
      type: "warning",
      title: "Route Delay",
      message: "Vehicle #12 is 15 minutes behind schedule",
      time: "12 min ago",
    },
    {
      type: "info",
      title: "Maintenance Due",
      message: "Vehicle #8 requires scheduled maintenance",
      time: "1 hour ago",
    },
    {
      type: "success",
      title: "Route Completed",
      message: "Zone A collection completed successfully",
      time: "2 hours ago",
    },
  ]

  const iconMap: Record<string, React.ReactNode> = {
    alert: <AlertCircle className="w-5 h-5 text-danger" />,
    warning: <AlertCircle className="w-5 h-5 text-warning" />,
    info: <Info className="w-5 h-5 text-info" />,
    success: <CheckCircle className="w-5 h-5 text-success" />,
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-text mb-4">Recent Alerts</h2>
      <div className="space-y-3">
        {notifications.map((notif, idx) => (
          <div key={idx} className="flex gap-3 p-3 bg-surface-light rounded-lg">
            <div className="flex-shrink-0 mt-1">{iconMap[notif.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-text text-sm">{notif.title}</p>
              <p className="text-xs text-text-secondary mt-1">{notif.message}</p>
              <p className="text-xs text-text-secondary/50 mt-2">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
