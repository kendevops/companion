import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

// Auth pages
import LoginPage from "@/pages/auth/Login";
import RegisterPage from "@/pages/auth/register";
// import ForgotPasswordPage from "@/pages/auth/forgot-password";

// Main layouts for different roles
// import AdminLayout from "@/components/layout/admin/AdminLayout";
// import SellerLayout from "@/components/layout/seller/SellerLayout";
// import BuyerLayout from "@/components/layout/buyer/BuyerLayout";

// Main pages for each role
import LandingPage from "@/pages/landing";
// import AdminDashboard from "@/pages/admin/dashboard";
// import SellerDashboard from "@/pages/seller/dashboard";
// import BuyerDashboard from "@/pages/buyer/dashboard";

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
          {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}

          {/* Admin Routes - Protected */}
          {/* <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="requests" element={<div>Service Requests</div>} />
            <Route path="payments" element={<div>Payments</div>} />
            <Route path="users" element={<div>Users</div>} />
          </Route> */}

          {/* Seller Routes - Protected */}
          {/* <Route path="/seller" element={<SellerLayout />}>
            <Route
              index
              element={<Navigate to="/seller/dashboard" replace />}
            />
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="profile" element={<div>Seller Profile</div>} />
            <Route path="services" element={<div>Services</div>} />
            <Route path="earnings" element={<div>Earnings</div>} />
          </Route> */}

          {/* Buyer Routes - Protected */}
          {/* <Route path="/buyer" element={<BuyerLayout />}>
            <Route index element={<Navigate to="/buyer/dashboard" replace />} />
            <Route path="dashboard" element={<BuyerDashboard />} />
            <Route path="services" element={<div>Browse Services</div>} />
            <Route path="sellers" element={<div>Browse Sellers</div>} />
            <Route path="purchases" element={<div>My Purchases</div>} />
          </Route> */}

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
