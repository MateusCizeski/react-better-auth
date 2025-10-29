import { ModeToggle } from "@/components/ui/mode-toggle";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
        Better Auth
      </Link>

      <nav className="flex items-center space-x-4">
        <Link
          to="/login"
          className="text-gray-700 dark:text-gray-200 hover:underline"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-gray-700 dark:text-gray-200 hover:underline"
        >
          Register
        </Link>

        <ModeToggle />
      </nav>
    </header>
  );
}
