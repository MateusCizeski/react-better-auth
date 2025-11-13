import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, toggleTheme } = useTheme();

  const hoverClasses =
    theme === "light"
      ? "hover:bg-gray-800 hover:text-white"
      : "hover:bg-gray-100 hover:text-gray-900";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={`transition-colors ${hoverClasses} focus:outline-none focus:ring-0`}
    >
      {theme === "light" ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
