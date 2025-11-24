import { useState } from "react";
import { Home, Grid, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menu = [
    { label: "Dashboard", icon: Home, path: "/dashboard" },
    { label: "Modules", icon: Grid, path: "/modules" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside
      className={clsx(
        "h-full border-r border-border bg-background transition-all",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <button
        className="p-2 w-full text-center border-b"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "➡" : "⬅"}
      </button>

      <nav className="p-2 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={clsx(
              "flex items-center gap-3 p-2 rounded-md hover:bg-muted transition",
              location.pathname === item.path && "bg-muted font-medium"
            )}
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
