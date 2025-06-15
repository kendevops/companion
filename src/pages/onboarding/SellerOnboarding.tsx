import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, User, Briefcase, Star } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useAuthStore } from "@/store/auth-store";
import ProfileSetupStep from "./ProfileSetupStep";
import ServiceSelectionStep from "./ServiceSelectionStep";
import CompletionStep from "./CompletionStep";

const SellerOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { currentStep, nextStep, prevStep, resetStore, fetchOnboardingStatus } =
    useOnboardingStore();

  // Check onboarding status on mount
  useEffect(() => {
    fetchOnboardingStatus();
  }, [fetchOnboardingStatus]);

  // Progress calculation
  const progress = (currentStep / 3) * 100;

  // Step configuration
  const steps = [
    {
      number: 1,
      title: "Profile Setup",
      description: "Add your photos and contact info",
      icon: User,
    },
    {
      number: 2,
      title: "Select Services",
      description: "Choose what you want to offer",
      icon: Briefcase,
    },
    {
      number: 3,
      title: "Complete Setup",
      description: "Review and finish",
      icon: Star,
    },
  ];

  // Handle completion
  const handleComplete = () => {
    resetStore();
    navigate("/seller/dashboard");
  };

  // Handle step navigation
  const handleNext = () => {
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                Welcome to Companion, {user.name}!
              </h1>
              <p className="text-muted-foreground">
                Let's set up your seller profile to start receiving bookings
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of 3
            </div>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="mb-6" />

          {/* Step Indicators */}
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;

              return (
                <div
                  key={step.number}
                  className={`flex items-center gap-3 ${
                    step.number < steps.length ? "flex-1" : ""
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted
                        ? "bg-brand-blue border-brand-blue text-white"
                        : isCurrent
                        ? "border-brand-blue text-brand-blue bg-blue-50"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        isCompleted || isCurrent
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`text-xs ${
                        isCompleted || isCurrent
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {step.number < steps.length && (
                    <div
                      className={`h-px flex-1 ml-4 ${
                        isCompleted ? "bg-brand-blue" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {currentStep === 1 && <ProfileSetupStep onNext={handleNext} />}

        {currentStep === 2 && (
          <ServiceSelectionStep onNext={handleNext} onPrev={handlePrev} />
        )}

        {currentStep === 3 && (
          <CompletionStep onComplete={handleComplete} onPrev={handlePrev} />
        )}
      </div>
    </div>
  );
};

export default SellerOnboarding;
