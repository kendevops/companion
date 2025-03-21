import React, { useState } from "react";
import {
  X,
  Upload,
  //   Plus,
  //   Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Service } from "@/types";

// Available service categories
const serviceCategories = [
  "Dining & Food",
  "Entertainment",
  "Travel & Experiences",
  "Fashion & Style",
  "Education & Skills",
  "Health & Wellness",
  "Creative & Arts",
  "Business & Career",
  "Other",
];

interface AddServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (serviceData: Partial<Service>) => void;
  initialData?: Partial<Service>;
  isEditing?: boolean;
}

const AddServiceForm: React.FC<AddServiceFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  isEditing = false,
}) => {
  // Form state
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [category, setCategory] = useState(
    initialData?.category || serviceCategories[0]
  );
  const [isAvailable, setIsAvailable] = useState(
    initialData?.isAvailable !== false
  );
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>(
    (initialData?.images as string[]) || []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const newImages: File[] = [];
    const newPreviewUrls: string[] = [];

    // Limit to max 5 images total
    const totalImages = imagePreviewUrls.length + fileList.length;
    if (totalImages > 5) {
      setErrors({
        ...errors,
        images: "You can upload a maximum of 5 images",
      });
      return;
    }

    // Process each file
    Array.from(fileList).forEach((file) => {
      // Check file type
      if (!file.type.startsWith("image/")) {
        setErrors({
          ...errors,
          images: "Only image files are allowed",
        });
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          images: "Image size should not exceed 5MB",
        });
        return;
      }

      newImages.push(file);
      newPreviewUrls.push(URL.createObjectURL(file));
    });

    setImages([...images, ...newImages]);
    setImagePreviewUrls([...imagePreviewUrls, ...newPreviewUrls]);

    // Clear image error if present
    if (errors.images) {
      const { ...restErrors } = errors;
      setErrors(restErrors);
    }
  };

  // Remove an image
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    const newPreviewUrls = [...imagePreviewUrls];

    // If it's an existing image (from initialData)
    if (index < (initialData?.images?.length || 0)) {
      newPreviewUrls.splice(index, 1);
    } else {
      // If it's a newly added image
      const adjustedIndex = index - (initialData?.images?.length || 0);
      newImages.splice(adjustedIndex, 1);
      newPreviewUrls.splice(index, 1);

      // Revoke the object URL to avoid memory leaks
      URL.revokeObjectURL(newPreviewUrls[index]);
    }

    setImages(newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Service title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Service description is required";
    }

    if (!price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Prepare service data
    const serviceData: Partial<Service> = {
      title,
      description,
      price: parseFloat(price),
      category,
      isAvailable,
      id: initialData?.id, // Include ID only if editing
      // images will be handled separately in a real app with file uploads
    };

    // In a real app, you would upload the images here and get URLs back

    onSave(serviceData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Service" : "Add New Service"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your service details below."
              : "Fill in the details below to create a new service offering."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Service Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dinner Date, City Tour, etc."
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Service Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your service in detail..."
              className={`min-h-[120px] ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <Input
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="text"
                placeholder="0.00"
                className={`pl-8 ${errors.price ? "border-red-500" : ""}`}
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          {/* Service Images */}
          <div className="space-y-2">
            <Label>Service Images (Max 5)</Label>

            {/* Image Preview */}
            {imagePreviewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {imagePreviewUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Service image ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Image Upload Button */}
            {imagePreviewUrls.length < 5 && (
              <div className="mt-2">
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>
            )}

            {errors.images && (
              <p className="text-red-500 text-sm">{errors.images}</p>
            )}
          </div>

          {/* Availability Switch */}
          <div className="flex items-center space-x-2">
            <Switch
              id="availability"
              checked={isAvailable}
              onCheckedChange={setIsAvailable}
            />
            <Label htmlFor="availability">
              Make this service available immediately
            </Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : isEditing
                ? "Update Service"
                : "Create Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceForm;
