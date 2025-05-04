/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  MapPin,
  Phone,
  Instagram,
  Clock,
  ChevronLeft,
  Check,
  Calendar,
  MessageSquare,
  Loader2,
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
import UsersService from "@/services/users-service";
import PurchasesService from "@/services/purchases-service";
import PaymentsService from "@/services/payments-service";
import API_URL from "@/services/api-config";
import { toast } from "sonner";

const SellerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [seller, setSeller] = useState<any>(null);

  // State for selected services and payment
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch seller details
  useEffect(() => {
    const fetchSellerDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await UsersService.getSellerDetails(id);
        setSeller(response.data);
      } catch (err: any) {
        console.error("Error fetching seller details:", err);
        setError(err.message || "Failed to load seller details");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerDetails();
  }, [id]);

  // Calculate total amount based on selected services
  const totalAmount = selectedServices.reduce((total, serviceId) => {
    const service = seller?.services.find((s: any) => s.id === serviceId);
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
  const handlePayment = async () => {
    if (!id || selectedServices.length === 0) return;

    setSubmitting(true);
    try {
      // Create purchase
      const purchaseResponse = await PurchasesService.createPurchase({
        sellerId: id,
        serviceIds: selectedServices,
      });

      // Process payment
      const paymentResponse = await PaymentsService.createPayment({
        purchaseId: purchaseResponse.data.id,
        paymentMethod: "credit_card",
      });

      toast.success("Payment successful!");

      // Navigate to buyer dashboard
      navigate("/buyer/dashboard");
    } catch (err) {
      toast.error("Payment failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Go back to previous page
  const handleBack = () => {
    navigate(-1);
  };

  // Format image URLs
  const getImageUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) {
      return url;
    }
    return `${API_URL}${url}`;
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
        <span className="ml-2 text-lg">Loading seller details...</span>
      </div>
    );
  }

  // Show error state
  if (error || !seller) {
    return (
      <div className="p-6 bg-red-50 rounded-lg text-center">
        <p className="text-red-600 mb-4">{error || "Seller not found"}</p>
        <Button onClick={() => navigate("/buyer/dashboard")}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

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
              {seller.profilePictures && seller.profilePictures.length > 0 ? (
                seller.profilePictures.map((image: string, index: number) => (
                  <SwiperSlide key={index}>
                    <img
                      src={getImageUrl(image)}
                      alt={`${seller.user.name} profile ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="h-full w-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No profile images</span>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </Card>

          {/* Seller Information */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center">
                    <h1 className="text-2xl font-bold mr-2">
                      {seller.user.name}
                    </h1>
                    {seller.verified && (
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
                      {seller.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({seller.reviews.length} reviews)
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
                      {seller.bio ||
                        "Professional service provider offering high-quality services to clients."}
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
                  {seller.reviews.length > 0 ? (
                    seller.reviews.map((review: any) => (
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
                              {review.buyer.user.name}
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
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No reviews yet.
                    </p>
                  )}
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
                    {seller.services.map((service: any) => (
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
                      const service = seller.services.find(
                        (s: any) => s.id === serviceId
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
                    <Button
                      className="w-full"
                      onClick={handlePayment}
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Pay Now"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setShowPayment(false)}
                      disabled={submitting}
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
