/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, UploadCloud, X, ChevronRight } from "lucide-react";

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
// import { useAuthStore } from "@/store/auth-store";
import OnboardingService from "@/services/onboarding-service";
import UploadsService from "@/services/uploads-service";
import { toast } from "sonner";

// Define the form schema with Zod
const profileFormSchema = z.object({
  bio: z.string().min(10, { message: "Bio must be at least 10 characters" }),
  phoneNumber: z.string().min(5, { message: "Phone number is required" }),
  instagram: z.string().optional(),
  wechat: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profilePictures, setProfilePictures] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Initialize the form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      bio: "",
      phoneNumber: "",
      instagram: "",
      wechat: "",
    },
  });

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const file = files[0];

      // Upload the image
      const response = await UploadsService.uploadProfilePicture(file);

      // Add the image URL to the list
      if (response.data && response.data.url) {
        setProfilePictures([...profilePictures, response.data.url]);
      }
    } catch (err: any) {
      toast.error("Failed to upload image. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  // Remove an image
  const handleRemoveImage = (index: number) => {
    setProfilePictures(profilePictures.filter((_, i) => i !== index));
  };

  // Handle form submission
  const onSubmit = async (data: ProfileFormValues) => {
    if (profilePictures.length === 0) {
      toast.error("Please upload at least one profile picture");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Submit the profile data
      await OnboardingService.updateSellerProfile({
        bio: data.bio,
        profilePictures,
        contactDetails: {
          phoneNumber: data.phoneNumber,
          instagram: data.instagram,
          wechat: data.wechat,
        },
      });

      toast.success("Profile saved successfully!");

      // Navigate to services setup
      navigate("/onboarding/services");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Set Up Your Seller Profile</h1>
        <p className="text-muted-foreground">
          Let's create your seller profile so buyers can learn more about you
          and your services.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Pictures Upload Section */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Pictures</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Upload at least one profile picture. This helps build trust with
              potential buyers.
            </p>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="profilePicture"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            <label
              htmlFor="profilePicture"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              {uploading ? (
                <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
              ) : (
                <UploadCloud className="h-10 w-10 text-muted-foreground" />
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                {uploading ? "Uploading..." : "Click to upload an image"}
              </p>
            </label>
          </div>

          {/* Image Preview */}
          {profilePictures.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Uploaded Images</h3>
              <div className="grid grid-cols-2 gap-4">
                {profilePictures.map((url, index) => (
                  <div
                    key={index}
                    className="relative rounded-md overflow-hidden h-40"
                  >
                    <img
                      src={url}
                      alt={`Profile ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Information Form */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell buyers about yourself, your skills, and your experiences..."
                        className="resize-none min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="@yourusername" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wechat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WeChat (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="WeChat ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-blue/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Profile...
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
