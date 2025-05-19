/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  PlusCircle,
  Trash2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import OnboardingService from "@/services/onboarding-service";
import { toast } from "sonner";

// Define the form schema with Zod
const serviceSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().min(1, { message: "Price must be at least 1" }),
  isAvailable: z.boolean().default(true),
});

const servicesFormSchema = z.object({
  services: z
    .array(serviceSchema)
    .min(3, { message: "Please add at least 3 services" }),
});

type ServicesFormValues = z.infer<typeof servicesFormSchema>;

const ServicesSetup: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<ServicesFormValues>({
    resolver: zodResolver(servicesFormSchema),
    defaultValues: {
      services: [
        { title: "", description: "", price: 0, isAvailable: true },
        { title: "", description: "", price: 0, isAvailable: true },
        { title: "", description: "", price: 0, isAvailable: true },
      ],
    },
  });

  // Set up field array for dynamic services
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "services",
  });

  // Handle form submission
  const onSubmit = async (data: ServicesFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      // Submit the services data
      await OnboardingService.addSellerServices(data);

      toast.success("Services saved successfully!");

      // Mark onboarding as complete
      await OnboardingService.completeOnboarding(true);

      // Update the auth store to mark onboarding as complete
      // This would be handled by your state management

      // Navigate to dashboard
      navigate("/seller/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save services");
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to profile setup
  const handleBack = () => {
    navigate("/onboarding/profile");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Add Your Services</h1>
        <p className="text-muted-foreground">
          Add at least 3 services that you offer to potential clients.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Services List */}
          <div className="space-y-6">
            {fields.map((field, index) => (
              <Card key={field.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gray-50 px-4 py-2 flex justify-between items-center">
                    <h3 className="font-medium">Service #{index + 1}</h3>
                    {index >= 3 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    ) : (
                      <div className="text-xs text-muted-foreground">
                        Required
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-4">
                    <FormField
                      control={form.control}
                      name={`services.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Personal Shopping"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`services.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your service in detail..."
                              className="resize-none min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name={`services.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (USD)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`services.${index}.isAvailable`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-end space-x-2 space-y-0">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="flex-1 pt-2">
                              Available for booking
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Service Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              append({
                title: "",
                description: "",
                price: 0,
                isAvailable: true,
              })
            }
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Another Service
          </Button>

          {/* Form Errors */}
          {form.formState.errors.services?.message && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.services.message}
            </p>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className="flex-1"
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button
              type="submit"
              className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  Complete Setup <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ServicesSetup;
