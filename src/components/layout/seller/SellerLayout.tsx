import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Briefcase,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
  // ChevronDown,
  Bell,
} from "lucide-react";

import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { UserRole } from "@/types";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const SellerLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation links
  const navLinks = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/seller/dashboard",
    },
    {
      icon: <User size={20} />,
      label: "Profile",
      href: "/seller/profile",
    },
    {
      icon: <Calendar size={20} />,
      label: "Bookings",
      href: "/seller/bookings",
    },
    {
      icon: <Briefcase size={20} />,
      label: "Services",
      href: "/seller/services",
    },
    {
      icon: <DollarSign size={20} />,
      label: "Earnings",
      href: "/seller/earnings",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Messages",
      href: "/seller/messages",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      href: "/seller/settings",
    },
  ];

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Desktop */}
        <div className="w-64 bg-white shadow-md hidden md:flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-semibold text-gray-800">Companion</h1>
          </div>

          {/* User Profile */}
          <div className="flex items-center px-6 py-4 border-b border-gray-100">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.profilePictures?.[0]} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-medium text-sm">Demo User</p>
              <p className="text-xs text-muted-foreground">Seller</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-brand-blue text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-3">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-100">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Mobile sidebar - overlay when open */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar - Mobile */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-64 bg-white shadow-md z-40 transform transition-transform duration-200 ease-in-out md:hidden",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Companion</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={20} />
            </Button>
          </div>

          {/* User Profile - Mobile */}
          <div className="flex items-center px-6 py-4 border-b border-gray-100">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.profilePictures?.[0]} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-medium text-sm">Demo User</p>
              <p className="text-xs text-muted-foreground">Seller</p>
            </div>
          </div>

          {/* Navigation Links - Mobile */}
          <nav className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-brand-blue text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout Button - Mobile */}
          <div className="p-4 border-t border-gray-100">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-red-500 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">
            {/* Mobile Menu Button */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={20} />
              </Button>
              <h2 className="text-xl font-semibold">
                {navLinks.find((link) => link.href === location.pathname)
                  ?.label || "Dashboard"}
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  2
                </Badge>
              </Button>

              {/* Mobile Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage
                      src={user?.profilePictures?.[0]}
                      alt={user?.name}
                    />
                    <AvatarFallback>
                      {user?.name?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium">Demo User</p>
                      <p className="text-xs text-muted-foreground">Seller</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/seller/profile"
                      className="cursor-pointer w-full"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/seller/settings"
                      className="cursor-pointer w-full"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SellerLayout;
