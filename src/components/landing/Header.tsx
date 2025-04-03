import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Brain, User, Settings } from "lucide-react";
import { useAuth } from "../../../supabase/auth";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="font-bold text-xl flex items-center text-black"
          >
            <Brain className="h-6 w-6 mr-2 text-black" />
            Study Yugank
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          {/* Authentication temporarily disabled */}
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                className="text-gray-700 hover:text-black"
              >
                Dashboard
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
