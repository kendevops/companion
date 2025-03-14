import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  CreditCard,
  Heart,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { UserRole } from "@/types";

const BuyerLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  // Navigation links
  const navLinks = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/buyer/dashboard",
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Services",
      href: "/buyer/services",
    },
    {
      icon: <Users size={20} />,
      label: "Sellers",
      href: "/buyer/sellers",
    },
    {
      icon: <CreditCard size={20} />,
      label: "Purchases",
      href: "/buyer/purchases",
    },
    {
      icon: <Heart size={20} />,
      label: "Favorites",
      href: "/buyer/favorites",
    },
    {
      icon: <MessageSquare size={20} />,
      label: "Messages",
      href: "/buyer/messages",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      href: "/buyer/settings",
    },
  ];

  // Handle logout
  const handleLogout = () => {
    logout();
    // Redirect to landing page after logout
    window.location.href = "/";
  };

  return (
    <ProtectedRoute allowedRoles={[UserRole.BUYER]}>
      <div className="flex h-screen bg-gray-50">
        {/* Top Navigation */}
        <div className="w-full fixed top-0 bg-white shadow-sm z-10 h-16">
          <div className="container mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-semibold text-gray-800">
                Companion
              </h1>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6">
                {navLinks.slice(0, 4).map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`flex items-center py-5 border-b-2 ${
                        isActive
                          ? "border-brand-blue text-brand-blue"
                          : "border-transparent text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <span className="mr-2">{link.icon}</span>
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
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

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Heart size={20} className="text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageSquare size={20} className="text-gray-600" />
              </Button>

              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.profilePictures?.[0]}
                  alt={user?.name}
                />
                <AvatarFallback>
                  {user?.name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full pt-16 pb-16">
          <main className="container mx-auto px-4 py-6">
            <Outlet />
          </main>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 h-16 flex items-center justify-around">
          {navLinks.slice(0, 5).map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex flex-col items-center justify-center h-full w-full ${
                  isActive ? "text-brand-blue" : "text-gray-600"
                }`}
              >
                <span>{link.icon}</span>
                <span className="text-xs mt-1">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BuyerLayout;
