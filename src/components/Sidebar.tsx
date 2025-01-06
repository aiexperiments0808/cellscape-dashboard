import { 
  LayoutDashboard, 
  ScrollText, 
  Settings, 
  Beaker, 
  BookOpen, 
  HelpCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: ScrollText, label: "Event Log" },
    { icon: Settings, label: "Settings" },
    { icon: Beaker, label: "Experiments" },
    { icon: BookOpen, label: "Knowledge Base" },
    { icon: HelpCircle, label: "Help" },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 bottom-0 left-0 w-64 bg-incubator-bg border-r border-incubator-accent1/20 transform transition-transform duration-200 ease-in-out z-50",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors",
                item.active
                  ? "bg-incubator-accent1/20 text-incubator-accent1"
                  : "text-incubator-text/60 hover:bg-incubator-accent1/10 hover:text-incubator-accent1"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};