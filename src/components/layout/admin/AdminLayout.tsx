import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  CreditCard,
  Users,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { UserRole } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation links
  const navLinks = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: <ClipboardList size={20} />,
      label: "Requests",
      href: "/admin/requests",
    },
    {
      icon: <CreditCard size={20} />,
      label: "Payments",
      href: "/admin/payments",
    },
    {
      icon: <Users size={20} />,
      label: "Users",
      href: "/admin/users",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      href: "/admin/settings",
    },
  ];

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar - Desktop */}
        <div className="w-64 bg-gray-900 text-white hidden md:flex flex-col">
          <div className="p-6 border-b border-gray-800 flex items-center">
            <h1 className="text-xl font-semibold">Companion Admin</h1>
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
                          : "text-gray-300 hover:bg-gray-800"
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
          <div className="p-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
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
            "fixed inset-y-0 left-0 w-64 bg-gray-900 text-white z-40 transform transition-transform duration-200 ease-in-out md:hidden",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Companion Admin</h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={20} />
            </Button>
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
                          : "text-gray-300 hover:bg-gray-800"
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
          <div className="p-4 border-t border-gray-800">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
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
              <h2 className="text-xl font-semibold hidden sm:block">
                {navLinks.find((link) => link.href === location.pathname)
                  ?.label || "Dashboard"}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                  3
                </Badge>
              </Button>

              {/* Admin Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-3 cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user?.profilePictures?.[0]}
                        alt={user?.name}
                      />
                      <AvatarFallback>
                        {user?.name?.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium">Demo User</p>
                      <p className="text-xs text-muted-foreground">
                        Administrator
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="font-medium">Demo User</p>
                      <p className="text-xs text-muted-foreground">
                        Administrator
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/admin/settings"
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

export default AdminLayout;
