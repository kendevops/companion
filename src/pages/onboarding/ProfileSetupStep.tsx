import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, X, User, Phone, Instagram, MessageCircle } from "lucide-react";

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
import { useOnboardingStore } from "@/store/onboarding-store";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UploadsService from "@/services/uploads-service";

// Form schema
const profileSchema = z.object({
  bio: z
    .string()
    .min(50, "Bio must be at least 50 characters")
    .max(500, "Bio must be less than 500 characters"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  instagram: z.string().optional(),
  wechat: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileSetupStepProps {
  onNext: () => void;
}

const ProfileSetupStep: React.FC<ProfileSetupStepProps> = ({ onNext }) => {
  const {
    profileData,
    updateProfileData,
    updateProfile,
    isLoading,
    error,
    clearError,
  } = useOnboardingStore();

  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: profileData.bio,
      phoneNumber: profileData.phoneNumber,
      instagram: profileData.instagram,
      wechat: profileData.wechat,
    },
  });

  // Handle image upload
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploadingImages(true);
    const uploadedImages: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const response = await UploadsService.uploadProfilePicture(file);
        uploadedImages.push(response.data.fileUrl);
      }

      updateProfileData({
        profilePictures: [...profileData.profilePictures, ...uploadedImages],
      });
    } catch (error) {
      console.error("Failed to upload images:", error);
    } finally {
      setUploadingImages(false);
    }
  };

  // Remove image
  const removeImage = async (imageUrl: string) => {
    try {
      await UploadsService.removeProfilePicture(imageUrl);
      updateProfileData({
        profilePictures: profileData.profilePictures.filter(
          (img) => img !== imageUrl
        ),
      });
    } catch (error) {
      console.error("Failed to remove image:", error);
    }
  };

  // Handle form submission
  const onSubmit = async (data: ProfileFormData) => {
    clearError();

    // Validate images
    if (profileData.profilePictures.length === 0) {
      form.setError("root", {
        message: "Please upload at least one profile picture",
      });
      return;
    }

    // Update store with form data
    updateProfileData(data);

    // Submit to API
    const success = await updateProfile();
    if (success) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Set Up Your Profile</h2>
        <p className="text-muted-foreground">
          Tell potential clients about yourself and add your contact information
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Profile Pictures */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center">
              <User className="mr-2 h-5 w-5" />
              Profile Pictures
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profileData.profilePictures.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={UploadsService.getFileUrl(image)}
                    alt={`Profile ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(image)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              {profileData.profilePictures.length < 4 && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImages}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-brand-blue transition-colors"
                >
                  <Upload className="h-6 w-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    {uploadingImages ? "Uploading..." : "Add Photo"}
                  </span>
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            <p className="text-sm text-muted-foreground">
              Upload 1-4 profile pictures to help clients get to know you
              better.
            </p>

            {form.formState.errors.root && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">About You</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell potential clients about your experience, skills, and what makes you unique..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <p className="text-sm text-muted-foreground">
                  {field.value?.length || 0}/500 characters (minimum 50)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center">
                    <Instagram className="mr-2 h-4 w-4" />
                    Instagram (Optional)
                  </FormLabel>
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
                  <FormLabel className="flex items-center">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WeChat (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Your WeChat ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              disabled={isLoading || uploadingImages}
              className="bg-brand-blue hover:bg-brand-blue/90"
            >
              {isLoading ? "Saving..." : "Next: Select Services"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSetupStep;
