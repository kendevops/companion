import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { Steps, Step } from "@/components/ui/steps";
import OnboardingService from "@/services/onboarding-service";
import { Loader2 } from "lucide-react";
import ProtectedRoutes from "@/components/shared/ProtectedRoute";
import { UserRole } from "@/types";

const OnboardingLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { onboardingRequired, user } = useAuthStore();

  // Determine current step based on URL
  const getCurrentStep = () => {
    const path = location.pathname;
    if (path.includes("/profile")) return 1;
    if (path.includes("/services")) return 2;
    return 1;
  };

  const currentStep = getCurrentStep();

  useEffect(() => {
    // If onboarding is not required or user is not a seller, redirect to appropriate dashboard
    console.log("Onboarding Required test:", onboardingRequired);
    if (!onboardingRequired || (user?.role && user.role !== "SELLER")) {
      if (user?.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (user?.role === "BUYER") {
        navigate("/buyer/dashboard");
      } else if (user?.role === "SELLER" && !onboardingRequired) {
        navigate("/seller/dashboard");
      }
      return;
    }

    // Check onboarding status from backend
    const checkOnboardingStatus = async () => {
      try {
        const response = await OnboardingService.getOnboardingStatus();
        const { nextStep, onboardingCompleted } = response.data;
        console.log("Onboarding Status:", response.data);

        // If onboarding is completed, redirect to dashboard
        if (onboardingCompleted) {
          navigate("/seller/dashboard");
          return;
        }

        // Redirect to the appropriate step if not already there
        if (nextStep === "profile" && !location.pathname.includes("/profile")) {
          navigate("/onboarding/profile");
        } else if (
          nextStep === "services" &&
          !location.pathname.includes("/services")
        ) {
          navigate("/onboarding/services");
        }
      } catch (error) {
        console.error("Failed to fetch onboarding status", error);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [onboardingRequired, user, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <ProtectedRoutes allowedRoles={[UserRole.SELLER]}>
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        {/* Progress Steps */}
        <div className="max-w-md mx-auto mb-8">
          <Steps value={currentStep} className="mb-10">
            <Step value={1}>Profile Setup</Step>
            <Step value={2}>Service Setup</Step>
          </Steps>
        </div>

        {/* Content */}
        <Outlet />
      </div>
      </div>
    </ProtectedRoutes>
  );
};

export default OnboardingLayout;
