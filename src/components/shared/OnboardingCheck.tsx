import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import { UserRole } from "@/types";
import OnboardingService from "@/services/onboarding-service";
import { Loader2 } from "lucide-react";

interface OnboardingCheckProps {
  children: React.ReactNode;
}

/**
 * Component that checks if a seller has completed onboarding
 * and redirects to onboarding if needed
 */
const OnboardingCheck: React.FC<OnboardingCheckProps> = ({ children }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      // Only check for sellers
      if (!user || user.role !== UserRole.SELLER) {
        setIsChecking(false);
        setOnboardingComplete(true);
        return;
      }

      // Skip check if already on onboarding page
      if (location.pathname === "/seller/onboarding") {
        setIsChecking(false);
        setOnboardingComplete(true);
        return;
      }

      try {
        const status = await OnboardingService.getOnboardingStatus();

        if (!status.completed) {
          // Redirect to onboarding
          navigate("/seller/onboarding");
          return;
        }

        setOnboardingComplete(true);
      } catch (error) {
        console.error("Error checking onboarding status:", error);
        // If there's an error, assume onboarding is needed
        navigate("/seller/onboarding");
      } finally {
        setIsChecking(false);
      }
    };

    checkOnboardingStatus();
  }, [user, navigate, location.pathname]);

  // Show loading while checking
  if (isChecking) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
        <span className="ml-2 text-lg">Checking setup status...</span>
      </div>
    );
  }

  // Show children if onboarding is complete
  if (onboardingComplete) {
    return <>{children}</>;
  }

  // This should not happen if the redirect works correctly
  return null;
};

export default OnboardingCheck;
