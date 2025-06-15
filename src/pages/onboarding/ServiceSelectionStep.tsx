import React, { useEffect, useState } from "react";
import { Check, Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboardingStore } from "@/store/onboarding-store";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingError from "@/components/shared/LoadingError";

interface ServiceSelectionStepProps {
  onNext: () => void;
  onPrev: () => void;
}

const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  onNext,
  onPrev,
}) => {
  const {
    predefinedServices,
    selectedServices,
    toggleService,
    createServices,
    fetchPredefinedServices,
    isLoading,
    error,
    clearError,
  } = useOnboardingStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loadingServices, setLoadingServices] = useState(true);

  // Fetch predefined services on mount
  useEffect(() => {
    const loadServices = async () => {
      setLoadingServices(true);
      await fetchPredefinedServices();
      setLoadingServices(false);
    };

    loadServices();
  }, [fetchPredefinedServices]);

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(predefinedServices.map((s) => s.category))),
  ];

  // Filter services based on search and category
  const filteredServices = predefinedServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Group services by category
  const servicesByCategory = filteredServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof predefinedServices>);

  // Handle next step
  const handleNext = async () => {
    clearError();

    if (selectedServices.length < 3) {
      return;
    }

    const success = await createServices();
    if (success) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Choose Your Services</h2>
        <p className="text-muted-foreground">
          Select at least 3 services you'd like to offer. You can customize them
          later.
        </p>
        <div className="mt-4">
          <Badge
            variant={selectedServices.length >= 3 ? "default" : "destructive"}
          >
            {selectedServices.length}/3 minimum selected
          </Badge>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {selectedServices.length < 3 && (
        <Alert className="mb-6">
          <AlertDescription>
            Please select at least 3 services to continue. You can add more
            services later from your dashboard.
          </AlertDescription>
        </Alert>
      )}

      <LoadingError
        loading={loadingServices}
        error={
          loadingServices
            ? null
            : predefinedServices.length === 0
            ? "No services available"
            : null
        }
        loadingMessage="Loading available services..."
      >
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Services by Category */}
        <div className="space-y-8">
          {Object.entries(servicesByCategory).map(([category, services]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(services as typeof predefinedServices).map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <Card
                      key={service.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        isSelected ? "ring-2 ring-brand-blue bg-blue-50" : ""
                      }`}
                      onClick={() => toggleService(service.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">
                            {service.name}
                          </h4>
                          {isSelected && (
                            <div className="bg-brand-blue text-white rounded-full p-1">
                              <Check size={12} />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-xs">
                            Starting at ${service.basePrice}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No services found matching your criteria.
            </p>
          </div>
        )}
      </LoadingError>

      {/* Navigation */}
      <div className="flex justify-between pt-8 border-t">
        <Button variant="outline" onClick={onPrev} disabled={isLoading}>
          Back to Profile
        </Button>

        <Button
          onClick={handleNext}
          disabled={selectedServices.length < 3 || isLoading}
          className="bg-brand-blue hover:bg-brand-blue/90"
        >
          {isLoading ? "Creating Services..." : "Next: Complete Setup"}
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelectionStep;
