import { useState, useEffect } from "react";
import {
  PlusCircle,
  Edit,
  Trash,
  X,
  //   Check,
  AlertTriangle,
  Search,
  //   Filter,
  Clock,
  BarChart4,
  Briefcase,
  Calendar,
  DollarSign,
  CheckCircle,
  Eye,
  Upload,
} from "lucide-react";
import { toast } from "sonner";

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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Service } from "@/types";

// Mock data for services
const mockServices = [
  {
    id: "s1",
    sellerId: "seller1",
    title: "Dinner Date",
    description: "Enjoy a nice dinner with me at a restaurant of your choice.",
    price: 150,
    isAvailable: true,
    category: "Dining & Food",
    images: [
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    ],
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "s2",
    sellerId: "seller1",
    title: "Style Consultation",
    description: "Get professional advice on your style.",
    price: 120,
    isAvailable: true,
    category: "Fashion & Style",
    images: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    ],
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "s3",
    sellerId: "seller1",
    title: "City Tour Guide",
    description: "I will help you explore the city with local insights.",
    price: 200,
    isAvailable: false,
    category: "Travel & Experiences",
    images: [
      "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    ],
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
];

// Service categories
const serviceCategories = [
  "All Categories",
  "Dining & Food",
  "Entertainment",
  "Travel & Experiences",
  "Fashion & Style",
  "Education & Skills",
  "Health & Wellness",
  "Other",
];

// Analytics data
const serviceAnalytics = [
  {
    id: "s1",
    title: "Dinner Date",
    views: 185,
    bookings: 23,
    revenue: 3450,
    completionRate: 96,
  },
  {
    id: "s2",
    title: "Style Consultation",
    views: 142,
    bookings: 18,
    revenue: 2160,
    completionRate: 94,
  },
  {
    id: "s3",
    title: "City Tour Guide",
    views: 98,
    bookings: 12,
    revenue: 2400,
    completionRate: 92,
  },
];

const SellerServices = () => {
  const [services, setServices] = useState<typeof mockServices>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<
    (typeof mockServices)[0] | null
  >(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formCategory, setFormCategory] = useState(serviceCategories[1]);
  const [formIsAvailable, setFormIsAvailable] = useState(true);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // Load services on mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setServices(mockServices);
      setIsLoading(false);
    }, 500);
  }, []);

  // Filter services
  const filteredServices = services.filter((service) => {
    // Search filter
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      categoryFilter === "All Categories" ||
      service.category === categoryFilter;

    // Availability filter
    const matchesAvailability =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && service.isAvailable) ||
      (availabilityFilter === "unavailable" && !service.isAvailable);

    return matchesSearch && matchesCategory && matchesAvailability;
  });

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All Categories");
    setAvailabilityFilter("all");
  };

  // Open add service modal
  const handleAddService = () => {
    setEditingService(null);
    setFormTitle("");
    setFormDescription("");
    setFormPrice("");
    setFormCategory(serviceCategories[1]);
    setFormIsAvailable(true);
    setIsAddServiceModalOpen(true);
  };

  // Open edit service modal
  const handleEditService = (service: (typeof mockServices)[0]) => {
    setEditingService(service);
    setFormTitle(service.title);
    setFormDescription(service.description);
    setFormPrice(service.price.toString());
    setFormCategory(service.category);
    setFormIsAvailable(service.isAvailable);
    setIsAddServiceModalOpen(true);
  };

  // Save service
  const handleSaveService = () => {
    // Basic validation
    if (!formTitle.trim() || !formDescription.trim() || !formPrice.trim()) {
      toast("Error", {
        description: "Please fill out all required fields",
      });
      return;
    }

    const serviceData = {
      id: editingService ? editingService.id : `s${Date.now()}`,
      sellerId: "seller1",
      title: formTitle,
      description: formDescription,
      price: parseFloat(formPrice),
      category: formCategory,
      isAvailable: formIsAvailable,
      images: editingService?.images || [],
      createdAt: editingService?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingService) {
      // Update existing service
      setServices(
        services.map((service) =>
          service.id === editingService.id ? serviceData : service
        )
      );

      toast("Service updated", {
        description: "Your service has been successfully updated.",
      });
    } else {
      // Create new service
      setServices([...services, serviceData]);

      toast("Service created", {
        description: "Your service has been successfully created.",
      });
    }

    setIsAddServiceModalOpen(false);
  };

  // Delete service
  const handleDeleteService = (serviceId: string) => {
    setServices(services.filter((service) => service.id !== serviceId));

    toast("Service deleted", {
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
      description: `The service is now ${
        newStatus ? "available" : "unavailable"
      } to buyers.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button onClick={handleAddService}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Service
        </Button>
      </div>

      <Tabs defaultValue="services" className="space-y-6">
        <TabsList>
          <TabsTrigger value="services" className="flex items-center">
            <Briefcase className="h-4 w-4 mr-2" /> Services
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart4 className="h-4 w-4 mr-2" /> Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Availability Filter */}
              <Select
                value={availabilityFilter}
                onValueChange={setAvailabilityFilter}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>

              {/* Reset Filters */}
              <Button
                variant="outline"
                onClick={handleResetFilters}
                disabled={
                  searchQuery === "" &&
                  categoryFilter === "All Categories" &&
                  availabilityFilter === "all"
                }
              >
                <X className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg h-[300px] animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              {/* Service Cards */}
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <Card
                      key={service.id}
                      className={
                        !service.isAvailable ? "opacity-70" : undefined
                      }
                    >
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-gray-100">
                        {service.images && service.images[0] ? (
                          <img
                            src={service.images[0]}
                            alt={service.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">No image</span>
                          </div>
                        )}
                      </div>

                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{service.title}</CardTitle>
                            <Badge variant="outline" className="mt-2">
                              {service.category}
                            </Badge>
                          </div>
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
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the service and remove it
                                    from your profile.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteService(service.id)
                                    }
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
                            onCheckedChange={() =>
                              handleToggleAvailability(service.id)
                            }
                          />
                          <Label
                            htmlFor={`availability-${service.id}`}
                            className="text-sm"
                          >
                            {service.isAvailable ? "Available" : "Unavailable"}
                          </Label>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(service.createdAt).toLocaleDateString()}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="col-span-full flex flex-col items-center justify-center bg-gray-50 p-10 rounded-lg">
                  <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No services found</h3>
                  <p className="text-muted-foreground text-center mt-1 mb-4">
                    {searchQuery ||
                    categoryFilter !== "All Categories" ||
                    availabilityFilter !== "all"
                      ? "No services match your current filters. Try adjusting your search criteria."
                      : "You haven't created any services yet. Add your first service to start receiving requests."}
                  </p>
                  {searchQuery ||
                  categoryFilter !== "All Categories" ||
                  availabilityFilter !== "all" ? (
                    <Button variant="outline" onClick={handleResetFilters}>
                      Clear Filters
                    </Button>
                  ) : (
                    <Button onClick={handleAddService}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Your First
                      Service
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Views
                      </p>
                      <h3 className="text-2xl font-bold mt-1">425</h3>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Bookings
                      </p>
                      <h3 className="text-2xl font-bold mt-1">53</h3>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Revenue
                      </p>
                      <h3 className="text-2xl font-bold mt-1">$8,010</h3>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Completion Rate
                      </p>
                      <h3 className="text-2xl font-bold mt-1">94%</h3>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Service Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Service Performance</CardTitle>
                <CardDescription>
                  Individual performance metrics for each of your services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Service</th>
                        <th className="text-right py-3 px-4">Views</th>
                        <th className="text-right py-3 px-4">Bookings</th>
                        <th className="text-right py-3 px-4">Revenue</th>
                        <th className="text-right py-3 px-4">Completion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceAnalytics.map((service) => (
                        <tr key={service.id} className="border-b">
                          <td className="py-3 px-4 font-medium">
                            {service.title}
                          </td>
                          <td className="text-right py-3 px-4">
                            {service.views}
                          </td>
                          <td className="text-right py-3 px-4">
                            {service.bookings}
                          </td>
                          <td className="text-right py-3 px-4">
                            ${service.revenue}
                          </td>
                          <td className="text-right py-3 px-4">
                            {service.completionRate}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Service Modal */}
      <Dialog
        open={isAddServiceModalOpen}
        onOpenChange={setIsAddServiceModalOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
            <DialogDescription>
              {editingService
                ? "Update your service details below."
                : "Fill in the details below to create a new service."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Service Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Service Title</Label>
              <Input
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Dinner Date, City Tour, etc."
              />
            </div>

            {/* Service Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formCategory} onValueChange={setFormCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.slice(1).map((cat) => (
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
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Describe your service in detail..."
                className="min-h-[120px]"
              />
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
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  type="text"
                  placeholder="0.00"
                  className="pl-8"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Service Images</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>

            {/* Availability Switch */}
            <div className="flex items-center space-x-2">
              <Switch
                id="availability"
                checked={formIsAvailable}
                onCheckedChange={setFormIsAvailable}
              />
              <Label htmlFor="availability">
                Make this service available immediately
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddServiceModalOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveService}>
              {editingService ? "Update Service" : "Create Service"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerServices;
