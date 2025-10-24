"use client"
import StatCard from "./stat-card"
import NotificationPanel from "./notification-panel"

export default function Dashboard() {
  const stats = [
    {
      title: "Active Collection Points",
      value: "248",
      change: "+12%",
      icon: "trash",
      color: "primary",
    },
    {
      title: "Vehicles in Route",
      value: "34",
      change: "+5%",
      icon: "truck",
      color: "info",
    },
    {
      title: "Active Employees",
      value: "156",
      change: "+8%",
      icon: "users",
      color: "success",
    },
    {
      title: "Alerts Today",
      value: "12",
      change: "-3%",
      icon: "alert",
      color: "warning",
    },
  ]

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-text mb-2">Dashboard</h1>
        <p className="text-text-secondary">Real-time overview of your waste management operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="text-xl font-bold text-text mb-4">Collection Activity</h2>
          <div className="space-y-4">
            {[
              { zone: "Zone A", collected: "2,450 kg", status: "completed" },
              { zone: "Zone B", collected: "1,890 kg", status: "in-progress" },
              { zone: "Zone C", collected: "3,120 kg", status: "completed" },
              { zone: "Zone D", collected: "1,560 kg", status: "pending" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-surface-light rounded-lg">
                <div>
                  <p className="font-medium text-text">{item.zone}</p>
                  <p className="text-sm text-text-secondary">{item.collected}</p>
                </div>
                <span
                  className={`badge ${
                    item.status === "completed"
                      ? "badge-success"
                      : item.status === "in-progress"
                        ? "badge-warning"
                        : "badge-danger"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <NotificationPanel />
      </div>
    </div>
  )
}
