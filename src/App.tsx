import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
// @/components/ui/sonner

// Auth pages
import LoginPage from "@/pages/auth/Login";
import RegisterPage from "@/pages/auth/Register";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import ResetPasswordPage from "@/pages/auth/ResetPassword";
// import ForgotPasswordPage from "@/pages/auth/forgot-password";

// Main layouts for different roles
import AdminLayout from "@/components/layout/admin/AdminLayout";
import SellerLayout from "@/components/layout/seller/SellerLayout";
import BuyerLayout from "@/components/layout/buyer/BuyerLayout";

// Main pages for each role
import LandingPage from "@/pages/Landing";
import AdminDashboard from "@/pages/admin/Dashboard";
import SellerDashboard from "@/pages/seller/Dashboard";
import BuyerDashboard from "@/pages/buyer/Dashboard";
import SellerDetail from "./pages/buyer/SellerDetails";
import BuyerServices from "./pages/buyer/Service";
import SellerBookings from "./pages/seller/Bookings";
import AccountSettings from "@/pages/Settings";
import SellerServices from "./pages/seller/SellerServices";
import SellerProfile from "./pages/seller/SellerProfile";
import OnboardingPage from "@/pages/seller/Onboarding";
import ProtectedRoutes from "./components/shared/ProtectedRoute";
import { UserRole } from "./types";


// Create a client for React Query
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Admin Routes - Protected */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="requests" element={<div>Service Requests</div>} />
            <Route path="payments" element={<div>Payments</div>} />
            <Route path="users" element={<div>Users</div>} />
          </Route>

          {/* Seller Routes - Protected */}
          <Route path="/seller" element={<SellerLayout />}>
            <Route
              index
              element={<Navigate to="/seller/dashboard" replace />}
            />
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="profile" element={<SellerProfile />} />
            <Route path="bookings" element={<SellerBookings />} />
            <Route path="services" element={<SellerServices />} />
            <Route path="earnings" element={<div>Earnings</div>} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={[UserRole.SELLER]} children={undefined} />}>
            {/* Onboarding route - accessible to sellers but outside main layout */}
            <Route path="/seller/onboarding" element={<OnboardingPage />} />
          </Route>



          <Route path="/buyer" element={<BuyerLayout />}>
            <Route index element={<Navigate to="/buyer/dashboard" replace />} />
            <Route path="dashboard" element={<BuyerDashboard />} />
            <Route path="services" element={<BuyerServices />} />
            <Route path="sellers/:id" element={<SellerDetail />} />
            <Route path="purchases" element={<div>My Purchases</div>} />
            <Route path="favorites" element={<div>My Favorites</div>} />
            <Route path="messages" element={<div>Messages</div>} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>

          {/* Catch-all redirect to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
};

export default App;
