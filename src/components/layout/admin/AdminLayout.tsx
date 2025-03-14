import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  CreditCard,
  Users,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";

import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { UserRole } from "@/types";

const AdminLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

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
    // Redirect to landing page after logout
    window.location.href = "/";
  };

  return (
    <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-semibold">Companion Admin</h1>
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
          <div className="px-6 py-4 mt-auto border-t border-gray-800 absolute bottom-0 w-full">
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
          <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
            <h2 className="text-xl font-semibold">
              {navLinks.find((link) => link.href === location.pathname)
                ?.label || "Dashboard"}
            </h2>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Admin Profile */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.profilePictures?.[0]}
                    alt={user?.name}
                  />
                  <AvatarFallback>
                    {user?.name?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
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
