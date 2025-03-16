import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Briefcase,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { UserRole } from "@/types";

const SellerLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

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
    // Redirect to landing page after logout
    window.location.href = "/";
  };

  return (
    <ProtectedRoute allowedRoles={[UserRole.SELLER]}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-800">Companion</h1>
          </div>

          {/* User Profile */}
          <div className="flex items-center px-6 py-3 border-b border-gray-200">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.profilePictures?.[0]} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-medium text-sm">{user?.name}</p>
              <p className="text-xs text-muted-foreground">Seller</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 px-4">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#3170F3] text-white"
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
          <div className="px-6 py-4 mt-auto border-t border-gray-200 absolute bottom-0 w-full">
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
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="bg-white shadow-sm h-16 flex items-center px-6">
            <h2 className="text-xl font-semibold">
              {navLinks.find((link) => link.href === location.pathname)
                ?.label || "Dashboard"}
            </h2>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SellerLayout;
