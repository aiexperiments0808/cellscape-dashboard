import { useState } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useState(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  });

  return (
    <header className="h-16 bg-incubator-bg border-b border-incubator-accent1/20 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-incubator-accent1 hover:text-incubator-accent2"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold text-incubator-accent1">
          Cell Culture Monitor
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <span className="text-incubator-text/80">
          {currentTime.toLocaleTimeString()}
        </span>
        <div className="flex items-center gap-2 text-incubator-text/80">
          <User className="h-4 w-4" />
          <span>Default User</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-incubator-accent2 hover:text-incubator-accent2/80"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};