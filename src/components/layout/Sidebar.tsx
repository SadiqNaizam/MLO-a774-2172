import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils'; // For conditional classes
import {
  LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, ChevronLeft, ChevronRight, Dot
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  subItems?: NavItem[]; // For nested navigation
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings,
    subItems: [
        { href: '/settings/profile', label: 'Profile', icon: Dot },
        { href: '/settings/billing', label: 'Billing', icon: Dot },
    ]
  },
];

interface SidebarProps {
  isInitiallyCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isInitiallyCollapsed = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(isInitiallyCollapsed);
  const location = useLocation();

  console.log("Rendering Sidebar, collapsed state:", isCollapsed);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    console.log("Sidebar toggled, new state:", !isCollapsed);
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16 hover:w-60 group" : "w-60" // Expand on hover when collapsed
      )}
    >
      {/* Logo or placeholder when collapsed */}
      <div className="flex h-16 items-center justify-center border-b px-4 shrink-0">
        <Link to="/" className={cn("flex items-center gap-2 font-semibold", isCollapsed && "group-hover:hidden")}>
          {/* <img src="/logo-mini.svg" alt="Mini Logo" className="h-6 w-6" /> */}
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className={cn(isCollapsed && "hidden")}>My App</span>
        </Link>
         <Link to="/" className={cn("hidden items-center gap-2 font-semibold", isCollapsed && "group-hover:flex")}>
          {/* <img src="/logo-mini.svg" alt="Mini Logo" className="h-6 w-6" /> */}
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className={cn(isCollapsed && "hidden", isCollapsed && "group-hover:inline")}>My App</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {navItems.map((item) => (
            <React.Fragment key={item.href}>
              <Link to={item.href}>
                <Button
                  variant={location.pathname.startsWith(item.href) ? 'secondary' : 'ghost'}
                  className={cn(
                    "w-full justify-start gap-2",
                    isCollapsed && "justify-center group-hover:justify-start"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span className={cn(isCollapsed && "hidden group-hover:inline")}>{item.label}</span>
                </Button>
              </Link>
              {item.subItems && !isCollapsed && location.pathname.startsWith(item.href) && (
                 <div className="ml-6 grid gap-1">
                    {item.subItems.map(subItem => (
                         <Link key={subItem.href} to={subItem.href}>
                            <Button
                                variant={location.pathname === subItem.href ? 'secondary' : 'ghost'}
                                size="sm"
                                className="w-full justify-start gap-2"
                            >
                                 <subItem.icon className="h-3 w-3 shrink-0" />
                                <span>{subItem.label}</span>
                            </Button>
                         </Link>
                    ))}
                 </div>
              )}
              {item.subItems && isCollapsed && location.pathname.startsWith(item.href) && (
                 <div className={cn("ml-6 grid gap-1 hidden group-hover:grid")}>
                    {item.subItems.map(subItem => (
                         <Link key={subItem.href} to={subItem.href}>
                            <Button
                                variant={location.pathname === subItem.href ? 'secondary' : 'ghost'}
                                size="sm"
                                className="w-full justify-start gap-2"
                            >
                                 <subItem.icon className="h-3 w-3 shrink-0" />
                                <span>{subItem.label}</span>
                            </Button>
                         </Link>
                    ))}
                 </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </ScrollArea>

      {/* Collapse Toggle Button */}
      <div className="mt-auto border-t p-2">
        <Button variant="outline" size="icon" className="w-full" onClick={toggleSidebar} aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
    </aside>
  );
};
export default Sidebar;