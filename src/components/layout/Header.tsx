import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Search, Bell, Settings, LogOut, Sun, Moon } from 'lucide-react'; // Added Sun/Moon for potential theme toggle
// import { useTheme } from 'next-themes'; // Assuming next-themes for theme toggling, if implemented

interface HeaderProps {
  userName?: string;
  userAvatarUrl?: string;
  onSearch?: (searchTerm: string) => void;
}

const Header: React.FC<HeaderProps> = ({ userName = "User", userAvatarUrl, onSearch }) => {
  console.log("Rendering Header");
  // const { theme, setTheme } = useTheme(); // Example for theme toggle

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(event.target.value);
    }
    console.log("Search term:", event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchTerm = formData.get('search') as string;
    if (onSearch) {
      onSearch(searchTerm);
    }
    console.log("Search submitted:", searchTerm);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 md:px-8">
      {/* Logo/Brand - Placeholder, can be an Image or Text */}
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold md:text-base whitespace-nowrap">
        {/* <img src="/logo.svg" alt="Logo" className="h-6 w-6" /> Replace with actual logo */}
        <span className="font-bold">Dashboard</span>
      </Link>

      {/* Spacer to push search and profile to the right, or use justify-between on parent */}
      <div className="flex-1"></div>

      {/* Search Input - Centered or on the left of profile */}
      <form onSubmit={handleSearchSubmit} className="relative ml-auto flex-1 sm:flex-initial max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          name="search"
          placeholder="Search..."
          className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
          onChange={handleSearchChange}
        />
      </form>

      {/* Theme Toggle Example (optional) */}
      {/*
      <Button variant="outline" size="icon" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      */}

      {/* Notification Bell Example (optional) */}
      <Button variant="outline" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
        </span>
        <span className="sr-only">Notifications</span>
      </Button>

      {/* User Avatar and Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userAvatarUrl || `https://avatar.vercel.sh/${userName.replace(/\s+/g, '')}.png`} alt={userName} />
              <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          {/* Add more items like Profile, Billing etc. */}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
            {/* Add onClick handler for logout */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};
export default Header;