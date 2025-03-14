/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  // MapPin,
  // Phone,
  // Instagram,
  Clock,
  ChevronLeft,
  // Check,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Seller } from "@/types";

interface SellerDetailsProps {
  id: string;
}

const SellerDetails: React.FC<SellerDetailsProps> = () => {
  // const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // State for selected services and payment
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  // Calculate total amount based on selected services
  const totalAmount = selectedServices.reduce((total, serviceId) => {
    const service = mockSeller.services.find((s) => s.id === serviceId);
    return total + (service ? service.price : 0);
  }, 0);

  // Toggle service selection
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  // Handle booking
  const handleBooking = () => {
    if (selectedServices.length === 0) return;
    setShowPayment(true);
  };

  // Handle payment
  const handlePayment = () => {
    // In a real app, this would process payment and create a service request
    console.log("Processing payment for services:", selectedServices);
    console.log("Total amount:", totalAmount);

    // Navigate to success page or buyer dashboard
    navigate("/buyer/dashboard");
  };

  // Go back to previous page
  const handleBack = () => {
    navigate(-1);
  };

  // Mock data for a single seller
  const mockSeller: Seller = {
    id: "1",
    name: "Sophia Reynolds",
    email: "sophia@example.com",
    username: "sophiarey",
    role: "seller" as any,
    profilePictures: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    ],
    services: [
      {
        id: "s1",
        sellerId: "1",
        title: "Personal Shopping",
        description:
          "I will help you find the perfect outfits for any occasion. This includes personalized recommendations based on your style, body type, and preferences. I can accompany you to stores or provide online recommendations.",
        price: 150,
        isAvailable: true,
        createdAt: "2023-01-15T10:00:00Z",
        updatedAt: "2023-01-15T10:00:00Z",
      },
      {
        id: "s2",
        sellerId: "1",
        title: "Style Consultation",
        description:
          "Get professional advice on your style. I will analyze your current wardrobe, identify your style profile, and provide recommendations to enhance your personal style. Includes color analysis and seasonal recommendations.",
        price: 120,
        isAvailable: true,
        createdAt: "2023-01-15T10:00:00Z",
        updatedAt: "2023-01-15T10:00:00Z",
      },
      {
        id: "s3",
        sellerId: "1",
        title: "Wardrobe Organization",
        description:
          "I will help you organize your wardrobe for maximum efficiency and style. Includes decluttering, categorizing, and creating outfit combinations from your existing pieces.",
        price: 200,
        isAvailable: true,
        createdAt: "2023-01-15T10:00:00Z",
        updatedAt: "2023-01-15T10:00:00Z",
      },
    ],
    contactDetails: {
      phoneNumber: "+1234567890",
      instagram: "sophiastyle",
    },
    verified: true,
    rating: 4.8,
    reviews: [
      {
        id: "r1",
        buyerId: "b1",
        sellerId: "1",
        serviceId: "s1",
        rating: 5,
        comment:
          "Sophia was amazing! She helped me find the perfect outfit for my interview.",
        createdAt: "2023-03-01T14:30:00Z",
      },
      {
        id: "r2",
        buyerId: "b2",
        sellerId: "1",
        serviceId: "s2",
        rating: 5,
        comment:
          "The style consultation was so helpful. I learned a lot about what colors and styles work best for me.",
        createdAt: "2023-02-15T11:20:00Z",
      },
      {
        id: "r3",
        buyerId: "b3",
        sellerId: "1",
        serviceId: "s1",
        rating: 4,
        comment: "Great service! Would recommend to friends.",
        createdAt: "2023-02-10T16:45:00Z",
      },
    ],
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  };

  return (
    <div>
      {/* Back Button */}
      <Button variant="ghost" className="mb-4" onClick={handleBack}>
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to sellers
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Images and Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Carousel */}
          <Card className="overflow-hidden">
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              className="h-[400px]"
            >
              {mockSeller.profilePictures.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${mockSeller.name} profile ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Card>

          {/* Seller Information */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold mr-2">
                      {mockSeller.name}
                    </h1>
                    {mockSeller.verified && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    <Star
                      size={16}
                      className="text-yellow-400 mr-1"
                      fill="currentColor"
                    />
                    <span className="text-sm font-medium mr-1">
                      {mockSeller.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({mockSeller.reviews.length} reviews)
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Heart size={18} className="text-gray-600" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 size={18} className="text-gray-600" />
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      Professional stylist with 5+ years of experience helping
                      clients discover their personal style and build confidence
                      through fashion. Specializing in personal shopping, style
                      consultation, and wardrobe organization.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Availability</h3>
                    <div className="flex items-center text-muted-foreground">
                      <Clock size={16} className="mr-2" />
                      <span>Usually responds within 24 hours</span>
                    </div>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <Calendar size={16} className="mr-2" />
                      <span>Available Monday-Saturday</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-4">
                  {mockSeller.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 pb-4 last:border-0"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className="text-yellow-400 mr-0.5"
                                fill={
                                  i < review.rating ? "currentColor" : "none"
                                }
                              />
                            ))}
                          </div>
                          <span className="ml-2 font-medium text-sm">
                            Buyer
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Services and Booking */}
        <div className="space-y-6">
          {/* Services Card */}
          <Card className="sticky top-6">
            <CardContent className="p-6">
              {!showPayment ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">
                    Available Services
                  </h2>

                  <div className="space-y-4 mb-6">
                    {mockSeller.services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-start space-x-3 border-b border-gray-100 pb-4 last:border-0"
                      >
                        <Checkbox
                          id={service.id}
                          checked={selectedServices.includes(service.id)}
                          onCheckedChange={() => toggleService(service.id)}
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={service.id}
                            className="font-medium cursor-pointer flex justify-between"
                          >
                            <span>{service.title}</span>
                            <span>${service.price.toFixed(2)}</span>
                          </label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedServices.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    disabled={selectedServices.length === 0}
                    onClick={handleBooking}
                  >
                    Book Services
                  </Button>

                  <div className="flex justify-center mt-4">
                    <Button variant="outline" className="text-sm">
                      <MessageSquare size={16} className="mr-2" />
                      Message Seller
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">Payment</h2>

                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-medium mb-2">Selected Services</h3>
                    {selectedServices.map((serviceId) => {
                      const service = mockSeller.services.find(
                        (s) => s.id === serviceId
                      );
                      return service ? (
                        <div
                          key={serviceId}
                          className="flex justify-between text-sm py-1"
                        >
                          <span>{service.title}</span>
                          <span>${service.price.toFixed(2)}</span>
                        </div>
                      ) : null;
                    })}
                    <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    After payment, you will gain access to the seller's contact
                    details and can coordinate directly to schedule your
                    service.
                  </p>

                  <div className="space-y-3">
                    <Button className="w-full" onClick={handlePayment}>
                      Pay Now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowPayment(false)}
                    >
                      Back to Services
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
