import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  Star,
  ShoppingBag,
  Check,
  ChevronDown,
  X,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Service } from "@/types";

// Mock data for services
const mockServices: (Service & {
  sellerName: string;
  sellerRating: number;
  sellerVerified: boolean;
})[] = [
  {
    id: "s1",
    sellerId: "seller1",
    sellerName: "Sophia Reynolds",
    sellerRating: 4.8,
    sellerVerified: true,
    title: "Personal Shopping",
    description:
      "I will help you find the perfect outfits for any occasion. This includes personalized recommendations based on your style, body type, and preferences.",
    price: 150,
    isAvailable: true,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "s2",
    sellerId: "seller1",
    sellerName: "Sophia Reynolds",
    sellerRating: 4.8,
    sellerVerified: true,
    title: "Style Consultation",
    description:
      "Get professional advice on your style. I will analyze your current wardrobe and provide personalized recommendations.",
    price: 120,
    isAvailable: true,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "s3",
    sellerId: "seller1",
    sellerName: "Sophia Reynolds",
    sellerRating: 4.8,
    sellerVerified: true,
    title: "Wardrobe Organization",
    description:
      "I will help you organize your wardrobe for maximum efficiency and style. Includes decluttering and organization tips.",
    price: 200,
    isAvailable: true,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "s4",
    sellerId: "seller2",
    sellerName: "Marcus Chen",
    sellerRating: 4.6,
    sellerVerified: true,
    title: "City Tour Guide",
    description:
      "Explore the hidden gems of the city with a local guide. Personalized tours based on your interests.",
    price: 200,
    isAvailable: true,
    createdAt: "2023-02-10T10:00:00Z",
    updatedAt: "2023-02-10T10:00:00Z",
  },
  {
    id: "s5",
    sellerId: "seller2",
    sellerName: "Marcus Chen",
    sellerRating: 4.6,
    sellerVerified: true,
    title: "Photography Session",
    description:
      "Professional photography during your tour. Capture your memories with high-quality photos.",
    price: 300,
    isAvailable: true,
    createdAt: "2023-02-10T10:00:00Z",
    updatedAt: "2023-02-10T10:00:00Z",
  },
  {
    id: "s6",
    sellerId: "seller3",
    sellerName: "Elena Kim",
    sellerRating: 4.9,
    sellerVerified: false,
    title: "Language Tutoring",
    description:
      "Learn Korean from a native speaker. Personalized lessons for all levels.",
    price: 50,
    isAvailable: true,
    createdAt: "2023-03-01T10:00:00Z",
    updatedAt: "2023-03-01T10:00:00Z",
  },
  {
    id: "s7",
    sellerId: "seller4",
    sellerName: "James Wilson",
    sellerRating: 4.7,
    sellerVerified: true,
    title: "Personal Training",
    description:
      "Personalized workout plans and training sessions. Achieve your fitness goals faster.",
    price: 80,
    isAvailable: true,
    createdAt: "2023-03-15T10:00:00Z",
    updatedAt: "2023-03-15T10:00:00Z",
  },
  {
    id: "s8",
    sellerId: "seller4",
    sellerName: "James Wilson",
    sellerRating: 4.7,
    sellerVerified: true,
    title: "Nutrition Coaching",
    description:
      "Custom meal plans to reach your fitness goals. Includes grocery lists and recipe suggestions.",
    price: 120,
    isAvailable: true,
    createdAt: "2023-03-15T10:00:00Z",
    updatedAt: "2023-03-15T10:00:00Z",
  },
  {
    id: "s9",
    sellerId: "seller5",
    sellerName: "Maria Rodriguez",
    sellerRating: 4.9,
    sellerVerified: true,
    title: "Interior Design Consultation",
    description:
      "Get expert advice on decorating your space. Virtual consultations available.",
    price: 180,
    isAvailable: true,
    createdAt: "2023-04-05T10:00:00Z",
    updatedAt: "2023-04-05T10:00:00Z",
  },
  {
    id: "s10",
    sellerId: "seller6",
    sellerName: "David Park",
    sellerRating: 4.5,
    sellerVerified: false,
    title: "Music Production Lessons",
    description:
      "Learn how to produce music from an industry professional. All genres welcome.",
    price: 90,
    isAvailable: true,
    createdAt: "2023-04-20T10:00:00Z",
    updatedAt: "2023-04-20T10:00:00Z",
  },
];

// Categories for filtering
const categories = [
  "All Categories",
  "Video Call",
  "Resturant Date",
  "Education & Skills",
  "Fitness & Health",
  "Home & Lifestyle",
  "Art & Music",
];

// Category mapping for demonstration
const serviceCategoryMap: Record<string, string> = {
  s1: "Fashion & Style",
  s2: "Fashion & Style",
  s3: "Fashion & Style",
  s4: "Travel & Experiences",
  s5: "Travel & Experiences",
  s6: "Education & Skills",
  s7: "Fitness & Health",
  s8: "Fitness & Health",
  s9: "Home & Lifestyle",
  s10: "Art & Music",
};

const BuyerServices: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortOption, setSortOption] = useState("recommended");
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 400]);
  const [minRating, setMinRating] = useState<number>(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  // Filter services based on all criteria
  const filteredServices = mockServices.filter((service) => {
    // Search filter
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.sellerName.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === "All Categories" ||
      serviceCategoryMap[service.id] === selectedCategory;

    // Price filter
    const matchesPrice =
      service.price >= priceRange[0] && service.price <= priceRange[1];

    // Rating filter
    const matchesRating = service.sellerRating >= minRating;

    // Verified filter
    const matchesVerified = !verifiedOnly || service.sellerVerified;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesRating &&
      matchesVerified
    );
  });

  // Sort services based on selected option
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.sellerRating - a.sellerRating;
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0; // Default sorting (recommended)
    }
  });

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [
    searchQuery,
    selectedCategory,
    sortOption,
    priceRange,
    minRating,
    verifiedOnly,
  ]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSortOption("recommended");
    setPriceRange([0, 400]);
    setMinRating(0);
    setVerifiedOnly(false);
  };

  // Navigate to service detail
  const handleServiceClick = (serviceId: string, sellerId: string) => {
    navigate(`/buyer/sellers/${sellerId}?service=${serviceId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse Services</h1>
        <p className="text-muted-foreground">
          Find the perfect service for your needs from our verified providers
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services, keywords, or providers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-3">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:flex hidden">
                <Filter size={18} className="mr-2" /> Filters
              </Button>
            </SheetTrigger>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden flex">
                <SlidersHorizontal size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[340px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filter Services</SheetTitle>
                <SheetDescription>
                  Refine your search to find the perfect service
                </SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-8">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className={`px-3 py-2 rounded-md cursor-pointer ${
                          selectedCategory === category
                            ? "bg-brand-blue text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 400]}
                      max={400}
                      step={10}
                      value={priceRange}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <div className="bg-gray-100 px-3 py-1 rounded-md">
                        ${priceRange[0]}
                      </div>
                      <div className="bg-gray-100 px-3 py-1 rounded-md">
                        ${priceRange[1]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Minimum Rating</h3>
                  <div className="flex space-x-4">
                    {[0, 3, 3.5, 4, 4.5].map((rating) => (
                      <div
                        key={rating}
                        className={`flex items-center justify-center px-3 py-2 rounded-md cursor-pointer ${
                          minRating === rating
                            ? "bg-brand-blue text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setMinRating(rating)}
                      >
                        {rating > 0 ? (
                          <div className="flex items-center">
                            <span className="mr-1">{rating}</span>
                            <Star
                              size={14}
                              className={
                                minRating === rating
                                  ? "text-white"
                                  : "text-yellow-400"
                              }
                              fill="currentColor"
                            />
                          </div>
                        ) : (
                          "Any"
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={verifiedOnly}
                    onCheckedChange={(checked) =>
                      setVerifiedOnly(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="verified"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Verified providers only
                  </label>
                </div>
              </div>

              <SheetFooter className="flex-col sm:flex-row gap-3">
                <Button variant="outline" onClick={handleResetFilters}>
                  Reset Filters
                </Button>
                <SheetClose asChild>
                  <Button type="submit">Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== "All Categories" ||
        priceRange[0] > 0 ||
        priceRange[1] < 400 ||
        minRating > 0 ||
        verifiedOnly ||
        searchQuery) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-sm font-medium text-muted-foreground">
            Active filters:
          </span>

          {selectedCategory !== "All Categories" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedCategory}
              <button onClick={() => setSelectedCategory("All Categories")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {(priceRange[0] > 0 || priceRange[1] < 400) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              ${priceRange[0]} - ${priceRange[1]}
              <button onClick={() => setPriceRange([0, 400])}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {minRating > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {minRating}+{" "}
              <Star size={10} className="text-yellow-400" fill="currentColor" />
              <button onClick={() => setMinRating(0)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {verifiedOnly && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Verified only
              <button onClick={() => setVerifiedOnly(false)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              "{searchQuery}"
              <button onClick={() => setSearchQuery("")}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleResetFilters}
            className="ml-auto"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Mobile Category Pills */}
      <div className="lg:hidden flex items-center space-x-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center">
              {selectedCategory}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-2">
            <div className="space-y-1">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`px-3 py-2 rounded-md cursor-pointer ${
                    selectedCategory === category
                      ? "bg-brand-blue text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            <span className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading services...
            </span>
          ) : (
            `Showing ${sortedServices.length} service${
              sortedServices.length !== 1 ? "s" : ""
            }`
          )}
        </p>
      </div>

      {/* Service Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg h-[300px] animate-pulse"
            ></div>
          ))}
        </div>
      ) : (
        <>
          {sortedServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedServices.map((service) => (
                <Card
                  key={service.id}
                  className="h-full hover:shadow-md transition-shadow cursor-pointer overflow-hidden flex flex-col"
                  onClick={() =>
                    handleServiceClick(service.id, service.sellerId)
                  }
                >
                  {/* Mock Image Placeholder */}
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-200 flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>

                  <CardHeader className="pb-3 flex-grow">
                    <div className="flex justify-between mb-2">
                      <Badge variant="outline">
                        {serviceCategoryMap[service.id]}
                      </Badge>

                      {service.sellerVerified && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          <Check size={12} className="mr-1" /> Verified
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-3">
                    <div className="text-xl font-semibold">
                      ${service.price.toFixed(2)}
                    </div>
                  </CardContent>

                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center mr-2">
                          <span className="text-xs font-medium">
                            {service.sellerName.charAt(0)}
                          </span>
                        </div>
                        <div className="text-sm">{service.sellerName}</div>
                      </div>
                      <div className="flex items-center">
                        <Star
                          size={14}
                          className="text-yellow-400 mr-1"
                          fill="currentColor"
                        />
                        <span className="text-sm">
                          {service.sellerRating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No services found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any services matching your criteria. Try
                adjusting your filters or search for something else.
              </p>
              <Button onClick={handleResetFilters} className="mt-4">
                Reset Filters
              </Button>
            </div>
          )}
        </>
      )}

      {/* Load More Button - Would connect to pagination in real implementation */}
      {sortedServices.length > 0 && sortedServices.length % 8 === 0 && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" size="lg">
            Load More Services
          </Button>
        </div>
      )}
    </div>
  );
};

export default BuyerServices;
