"use client"

import { RefreshCw, Home, BarChart3, Building2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface DashboardHeaderProps {
  onSync?: () => void
}

export function DashboardHeader({ onSync }: DashboardHeaderProps) {
  const [isSyncing, setIsSyncing] = useState(false)
  const pathname = usePathname()

  const handleSync = async () => {
    setIsSyncing(true)
    if (onSync) {
      await onSync()
    }
    // Simulate sync delay
    setTimeout(() => setIsSyncing(false), 1500)
  }

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/properties", label: "Properties", icon: Building2 },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/property-details", label: "Public View", icon: FileText },
  ]

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#284E4C]">
              <span className="text-lg font-bold text-white">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Flex Living Reviews Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage and monitor property reviews</p>
            </div>
          </div>
          <Button
            onClick={handleSync}
            disabled={isSyncing}
            className="bg-[#284E4C] text-white hover:bg-[#1f3d3b] transition-all duration-300"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
            {isSyncing ? "Syncing..." : "Sync Reviews"}
          </Button>
        </div>

        <nav className="flex gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={
                    isActive
                      ? "bg-[#284E4C] text-white hover:bg-[#1f3d3b]"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
