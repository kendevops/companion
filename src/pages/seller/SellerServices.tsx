import React, { useState } from "react";
import { PlusCircle, Edit, Trash, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  // DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Service } from "@/types";

// Mock services data
const mockServices: Service[] = [
  {
    id: "s1",
    sellerId: "seller1",
    title: "Personal Shopping",
    description: "I will help you find the perfect outfits for any occasion.",
    price: 150,
    isAvailable: true,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
    category: "",
  },
  {
    id: "s2",
    sellerId: "seller1",
    title: "Style Consultation",
    description: "Get professional advice on your style.",
    price: 120,
    isAvailable: true,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "s3",
    sellerId: "seller1",
    title: "Wardrobe Organization",
    description:
      "I will help you organize your wardrobe for maximum efficiency.",
    price: 200,
    isAvailable: false,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
];

interface ServiceFormData {
  title: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

const initialFormData: ServiceFormData = {
  title: "",
  description: "",
  price: 0,
  isAvailable: true,
};

const SellerServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  // Handle switch toggle for availability
  const handleAvailabilityChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isAvailable: checked,
    }));
  };

  // Open dialog for creating a new service
  const handleOpenNewServiceDialog = () => {
    setFormData(initialFormData);
    setEditingServiceId(null);
    setIsDialogOpen(true);
  };

  // Open dialog for editing an existing service
  const handleEditService = (service: Service) => {
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      isAvailable: service.isAvailable,
    });
    setEditingServiceId(service.id);
    setIsDialogOpen(true);
  };

  // Delete a service
  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter((service) => service.id !== serviceId));
    toast("Service deleted", {
      // title: "Service deleted",
      description: "The service has been successfully deleted.",
    });
  };

  // Toggle service availability
  const handleToggleAvailability = (serviceId: string) => {
    setServices(
      services.map((service) =>
        service.id === serviceId
          ? { ...service, isAvailable: !service.isAvailable }
          : service
      )
    );

    const service = services.find((s) => s.id === serviceId);
    const newStatus = service ? !service.isAvailable : false;

    toast(`Service ${newStatus ? "activated" : "deactivated"}`, {
      // title: `Service ${newStatus ? "activated" : "deactivated"}`,
      description: `The service is now ${
        newStatus ? "available" : "unavailable"
      } to buyers.`,
    });
  };

  // Save service (create or update)
  const handleSaveService = () => {
    // Validate form data
    if (!formData.title.trim()) {
      toast(`Validation error`,{
        // variant: "destructive",
        // title: "Validation error",
        description: "Service title is required.",
      });
      return;
    }

    if (formData.price <= 0) {
      toast(`Validation error`, {
        // variant: "destructive",
        // title: "Validation error",
        description: "Price must be greater than zero.",
      });
      return;
    }

    if (editingServiceId) {
      // Update existing service
      setServices(
        services.map((service) =>
          service.id === editingServiceId
            ? {
                ...service,
                ...formData,
                updatedAt: new Date().toISOString(),
              }
            : service
        )
      );

      toast("Service updated", {
        // title: "Service updated",
        description: "Your service has been successfully updated.",
      });
    } else {
      // Create new service
      const newService: Service = {
        id: `s${Date.now()}`,
        sellerId: "seller1", // Would come from auth context in real app
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setServices([...services, newService]);

      toast("Service created", {
        // title: "Service created",
        description: "Your new service has been successfully created.",
      });
    }

    // Close dialog and reset form
    setIsDialogOpen(false);
    setFormData(initialFormData);
    setEditingServiceId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button onClick={handleOpenNewServiceDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card
            key={service.id}
            className={!service.isAvailable ? "opacity-70" : undefined}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle>{service.title}</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEditService(service)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the service and remove it from your profile.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteService(service.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <CardDescription className="line-clamp-2 mt-1.5">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold">
                ${service.price.toFixed(2)}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id={`availability-${service.id}`}
                  checked={service.isAvailable}
                  onCheckedChange={() => handleToggleAvailability(service.id)}
                />
                <Label
                  htmlFor={`availability-${service.id}`}
                  className="text-sm"
                >
                  {service.isAvailable ? "Available" : "Unavailable"}
                </Label>
              </div>
              <div className="text-xs text-muted-foreground">
                Created {new Date(service.createdAt).toLocaleDateString()}
              </div>
            </CardFooter>
          </Card>
        ))}

        {/* Empty State */}
        {services.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center bg-gray-50 p-10 rounded-lg">
            <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No services found</h3>
            <p className="text-muted-foreground text-center mt-1 mb-4">
              You haven't created any services yet. Add your first service to
              start receiving requests.
            </p>
            <Button onClick={handleOpenNewServiceDialog}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Service
            </Button>
          </div>
        )}
      </div>

      {/* Create/Edit Service Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingServiceId ? "Edit Service" : "Create New Service"}
            </DialogTitle>
            <DialogDescription>
              {editingServiceId
                ? "Update your service details below."
                : "Add a new service to offer to potential buyers."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Personal Shopping"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your service in detail..."
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[120px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.price || ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isAvailable"
                checked={formData.isAvailable}
                onCheckedChange={handleAvailabilityChange}
              />
              <Label htmlFor="isAvailable">
                Make this service available immediately
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveService}>
              {editingServiceId ? "Update Service" : "Create Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerServices;
