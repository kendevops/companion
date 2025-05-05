import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserRole } from "@/types";
import { useAuthStore, isAuthenticated, hasRole } from "@/store/auth-store";
import { Loader2 } from "lucide-react";

interface ProtectedRoutesProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ allowedRoles }) => {
  const location = useLocation();
  const { isLoading, user } = useAuthStore();

  // If still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  // Check if user is authenticated
  const authenticated = isAuthenticated();
  if (!authenticated) {
    // Redirect to login page, but save the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has the required role
  const hasRequiredRole = allowedRoles.some((role) => hasRole(role));
  if (!hasRequiredRole) {
    // Redirect based on user's role
    if (user?.role === UserRole.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user?.role === UserRole.SELLER) {
      return <Navigate to="/seller/dashboard" replace />;
    } else if (user?.role === UserRole.BUYER) {
      return <Navigate to="/buyer/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  // If they are authenticated and have the right role, render the protected routes
  return <Outlet />;
};

export default ProtectedRoutes;
