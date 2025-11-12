import { ModeToggle } from "@/components/ui/mode-toggle"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"

export function Header() {
  const user = useSelector((state: RootState) => state.user)

  const handleLogout = () => {
    console.log("Logging out...")
  }

  return (
    <header className="flex justify-between items-center p-4 border-b border-border bg-background backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        to="/"
        className="text-xl font-bold text-foreground hover:opacity-80 transition-opacity"
      >
        Better Auth
      </Link>

      <nav className="flex items-center space-x-4">
        <ModeToggle />

        {user.isAuthenticated && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary/40">
                <Avatar>
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 dark:text-red-400"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  )
}
