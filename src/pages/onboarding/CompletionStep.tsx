import React from 'react';
import { CheckCircle, Star, Users, Briefcase } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useOnboardingStore } from '@/store/onboarding-store';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CompletionStepProps {
  onComplete: () => void;
  onPrev: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({
  onComplete,
  onPrev,
}) => {
  const {
    profileData,
    selectedServices,
    predefinedServices,
    completeOnboarding,
    isLoading,
    error,
    clearError,
  } = useOnboardingStore();

  // Get selected service details
  const selectedServiceDetails = predefinedServices.filter((service) =>
    selectedServices.includes(service.id)
  );

  // Handle completion
  const handleComplete = async () => {
    clearError();
    const success = await completeOnboarding();
    if (success) {
      onComplete();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Almost Ready!</h2>
        <p className="text-muted-foreground">
          Review your profile and complete your seller onboarding
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Profile Summary */}
      <div className="space-y-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Your Profile
            </h3>

            <div className="space-y-4">
              {/* Profile Pictures */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Profile Pictures
                </p>
                <div className="flex gap-2">
                  {profileData.profilePictures
                    .slice(0, 3)
                    .map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Profile ${index + 1}`}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ))}
                  {profileData.profilePictures.length > 3 && (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-muted-foreground">
                      +{profileData.profilePictures.length - 3}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Bio
                </p>
                <p className="text-sm line-clamp-3">{profileData.bio}</p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p className="text-sm">{profileData.phoneNumber}</p>
                </div>
                {profileData.instagram && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Instagram
                    </p>
                    <p className="text-sm">{profileData.instagram}</p>
                  </div>
                )}
                {profileData.wechat && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      WeChat
                    </p>
                    <p className="text-sm">{profileData.wechat}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Summary */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Your Services ({selectedServiceDetails.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedServiceDetails.map((service) => (
                <div
                  key={service.id}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <h4 className="font-medium text-sm mb-1">{service.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {service.category}
                    </span>
                    <span className="text-sm font-medium">
                      ${service.basePrice}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Star className="mr-2 h-5 w-5" />
              What Happens Next?
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-blue rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Access Your Dashboard</p>
                  <p className="text-xs text-muted-foreground">
                    Manage your services, view requests, and track earnings
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-blue rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Customize Your Services</p>
                  <p className="text-xs text-muted-foreground">
                    Edit prices, descriptions, and add new services anytime
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-blue rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">
                    Start Receiving Requests
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Buyers can now discover and book your services
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-brand-blue rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium">Build Your Reputation</p>
                  <p className="text-xs text-muted-foreground">
                    Complete orders and earn reviews to grow your business
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrev} disabled={isLoading}>
          Back to Services
        </Button>

        <Button
          onClick={handleComplete}
          disabled={isLoading}
          className="bg-brand-blue hover:bg-brand-blue/90"
        >
          {isLoading ? "Completing Setup..." : "Complete Onboarding"}
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;