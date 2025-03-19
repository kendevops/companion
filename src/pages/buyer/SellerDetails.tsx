// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Star,
//   Heart,
//   Share2,
//   // MapPin,
//   // Phone,
//   // Instagram,
//   Clock,
//   ChevronLeft,
//   // Check,
//   Calendar,
//   MessageSquare,
// } from "lucide-react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination } from "swiper/modules";
// // import "swiper/css";
// // import "swiper/css/pagination";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Seller } from "@/types";

// interface SellerDetailsProps {
//   id: string;
// }

// const SellerDetails: React.FC<SellerDetailsProps> = () => {
//   // const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   // State for selected services and payment
//   const [selectedServices, setSelectedServices] = useState<string[]>([]);
//   const [showPayment, setShowPayment] = useState(false);

//   // Calculate total amount based on selected services
//   const totalAmount = selectedServices.reduce((total, serviceId) => {
//     const service = mockSeller.services.find((s) => s.id === serviceId);
//     return total + (service ? service.price : 0);
//   }, 0);

//   // Toggle service selection
//   const toggleService = (serviceId: string) => {
//     setSelectedServices((prev) =>
//       prev.includes(serviceId)
//         ? prev.filter((id) => id !== serviceId)
//         : [...prev, serviceId]
//     );
//   };

//   // Handle booking
//   const handleBooking = () => {
//     if (selectedServices.length === 0) return;
//     setShowPayment(true);
//   };

//   // Handle payment
//   const handlePayment = () => {
//     // In a real app, this would process payment and create a service request
//     console.log("Processing payment for services:", selectedServices);
//     console.log("Total amount:", totalAmount);

//     // Navigate to success page or buyer dashboard
//     navigate("/buyer/dashboard");
//   };

//   // Go back to previous page
//   const handleBack = () => {
//     navigate(-1);
//   };

//   // Mock data for a single seller
//   const mockSeller: Seller = {
//     id: "1",
//     name: "Sophia Reynolds",
//     email: "sophia@example.com",
//     username: "sophiarey",
//     role: "seller" as any,
//     profilePictures: [
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9",
//       "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
//     ],
//     services: [
//       {
//         id: "s1",
//         sellerId: "1",
//         title: "Personal Shopping",
//         description:
//           "I will help you find the perfect outfits for any occasion. This includes personalized recommendations based on your style, body type, and preferences. I can accompany you to stores or provide online recommendations.",
//         price: 150,
//         isAvailable: true,
//         createdAt: "2023-01-15T10:00:00Z",
//         updatedAt: "2023-01-15T10:00:00Z",
//       },
//       {
//         id: "s2",
//         sellerId: "1",
//         title: "Style Consultation",
//         description:
//           "Get professional advice on your style. I will analyze your current wardrobe, identify your style profile, and provide recommendations to enhance your personal style. Includes color analysis and seasonal recommendations.",
//         price: 120,
//         isAvailable: true,
//         createdAt: "2023-01-15T10:00:00Z",
//         updatedAt: "2023-01-15T10:00:00Z",
//       },
//       {
//         id: "s3",
//         sellerId: "1",
//         title: "Wardrobe Organization",
//         description:
//           "I will help you organize your wardrobe for maximum efficiency and style. Includes decluttering, categorizing, and creating outfit combinations from your existing pieces.",
//         price: 200,
//         isAvailable: true,
//         createdAt: "2023-01-15T10:00:00Z",
//         updatedAt: "2023-01-15T10:00:00Z",
//       },
//     ],
//     contactDetails: {
//       phoneNumber: "+1234567890",
//       instagram: "sophiastyle",
//     },
//     verified: true,
//     rating: 4.8,
//     reviews: [
//       {
//         id: "r1",
//         buyerId: "b1",
//         sellerId: "1",
//         serviceId: "s1",
//         rating: 5,
//         comment:
//           "Sophia was amazing! She helped me find the perfect outfit for my interview.",
//         createdAt: "2023-03-01T14:30:00Z",
//       },
//       {
//         id: "r2",
//         buyerId: "b2",
//         sellerId: "1",
//         serviceId: "s2",
//         rating: 5,
//         comment:
//           "The style consultation was so helpful. I learned a lot about what colors and styles work best for me.",
//         createdAt: "2023-02-15T11:20:00Z",
//       },
//       {
//         id: "r3",
//         buyerId: "b3",
//         sellerId: "1",
//         serviceId: "s1",
//         rating: 4,
//         comment: "Great service! Would recommend to friends.",
//         createdAt: "2023-02-10T16:45:00Z",
//       },
//     ],
//     createdAt: "2023-01-01T10:00:00Z",
//     updatedAt: "2023-01-01T10:00:00Z",
//   };

//   return (
//     <div>
//       {/* Back Button */}
//       <Button variant="ghost" className="mb-4" onClick={handleBack}>
//         <ChevronLeft className="mr-2 h-4 w-4" />
//         Back to sellers
//       </Button>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column: Images and Info */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Image Carousel */}
//           <Card className="overflow-hidden">
//             <Swiper
//               modules={[Pagination]}
//               pagination={{ clickable: true }}
//               className="h-[400px]"
//             >
//               {mockSeller.profilePictures.map((image, index) => (
//                 <SwiperSlide key={index}>
//                   <img
//                     src={image}
//                     alt={`${mockSeller.name} profile ${index + 1}`}
//                     className="h-full w-full object-cover"
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </Card>

//           {/* Seller Information */}
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <div className="flex items-center">
//                     <h1 className="text-2xl font-bold mr-2">
//                       {mockSeller.name}
//                     </h1>
//                     {mockSeller.verified && (
//                       <Badge
//                         variant="outline"
//                         className="bg-green-50 text-green-700 border-green-200"
//                       >
//                         Verified
//                       </Badge>
//                     )}
//                   </div>
//                   <div className="flex items-center mt-1">
//                     <Star
//                       size={16}
//                       className="text-yellow-400 mr-1"
//                       fill="currentColor"
//                     />
//                     <span className="text-sm font-medium mr-1">
//                       {mockSeller.rating.toFixed(1)}
//                     </span>
//                     <span className="text-sm text-muted-foreground">
//                       ({mockSeller.reviews.length} reviews)
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex gap-2">
//                   <Button variant="outline" size="icon">
//                     <Heart size={18} className="text-gray-600" />
//                   </Button>
//                   <Button variant="outline" size="icon">
//                     <Share2 size={18} className="text-gray-600" />
//                   </Button>
//                 </div>
//               </div>

//               <Tabs defaultValue="about">
//                 <TabsList className="mb-4">
//                   <TabsTrigger value="about">About</TabsTrigger>
//                   <TabsTrigger value="reviews">Reviews</TabsTrigger>
//                 </TabsList>

//                 <TabsContent value="about" className="space-y-4">
//                   <div>
//                     <h3 className="font-medium mb-2">Description</h3>
//                     <p className="text-muted-foreground">
//                       Professional stylist with 5+ years of experience helping
//                       clients discover their personal style and build confidence
//                       through fashion. Specializing in personal shopping, style
//                       consultation, and wardrobe organization.
//                     </p>
//                   </div>

//                   <div>
//                     <h3 className="font-medium mb-2">Availability</h3>
//                     <div className="flex items-center text-muted-foreground">
//                       <Clock size={16} className="mr-2" />
//                       <span>Usually responds within 24 hours</span>
//                     </div>
//                     <div className="flex items-center text-muted-foreground mt-1">
//                       <Calendar size={16} className="mr-2" />
//                       <span>Available Monday-Saturday</span>
//                     </div>
//                   </div>
//                 </TabsContent>

//                 <TabsContent value="reviews" className="space-y-4">
//                   {mockSeller.reviews.map((review) => (
//                     <div
//                       key={review.id}
//                       className="border-b border-gray-100 pb-4 last:border-0"
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <div className="flex items-center">
//                           <div className="flex">
//                             {[...Array(5)].map((_, i) => (
//                               <Star
//                                 key={i}
//                                 size={14}
//                                 className="text-yellow-400 mr-0.5"
//                                 fill={
//                                   i < review.rating ? "currentColor" : "none"
//                                 }
//                               />
//                             ))}
//                           </div>
//                           <span className="ml-2 font-medium text-sm">
//                             Buyer
//                           </span>
//                         </div>
//                         <span className="text-xs text-muted-foreground">
//                           {new Date(review.createdAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <p className="text-sm text-muted-foreground">
//                         {review.comment}
//                       </p>
//                     </div>
//                   ))}
//                 </TabsContent>
//               </Tabs>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column: Services and Booking */}
//         <div className="space-y-6">
//           {/* Services Card */}
//           <Card className="sticky top-6">
//             <CardContent className="p-6">
//               {!showPayment ? (
//                 <>
//                   <h2 className="text-xl font-semibold mb-4">
//                     Available Services
//                   </h2>

//                   <div className="space-y-4 mb-6">
//                     {mockSeller.services.map((service) => (
//                       <div
//                         key={service.id}
//                         className="flex items-start space-x-3 border-b border-gray-100 pb-4 last:border-0"
//                       >
//                         <Checkbox
//                           id={service.id}
//                           checked={selectedServices.includes(service.id)}
//                           onCheckedChange={() => toggleService(service.id)}
//                         />
//                         <div className="flex-1">
//                           <label
//                             htmlFor={service.id}
//                             className="font-medium cursor-pointer flex justify-between"
//                           >
//                             <span>{service.title}</span>
//                             <span>${service.price.toFixed(2)}</span>
//                           </label>
//                           <p className="text-sm text-muted-foreground mt-1">
//                             {service.description}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {selectedServices.length > 0 && (
//                     <div className="bg-gray-50 p-4 rounded-lg mb-4">
//                       <div className="flex justify-between font-medium">
//                         <span>Total</span>
//                         <span>${totalAmount.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   )}

//                   <Button
//                     className="w-full"
//                     disabled={selectedServices.length === 0}
//                     onClick={handleBooking}
//                   >
//                     Book Services
//                   </Button>

//                   <div className="flex justify-center mt-4">
//                     <Button variant="outline" className="text-sm">
//                       <MessageSquare size={16} className="mr-2" />
//                       Message Seller
//                     </Button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <h2 className="text-xl font-semibold mb-4">Payment</h2>

//                   <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                     <h3 className="font-medium mb-2">Selected Services</h3>
//                     {selectedServices.map((serviceId) => {
//                       const service = mockSeller.services.find(
//                         (s) => s.id === serviceId
//                       );
//                       return service ? (
//                         <div
//                           key={serviceId}
//                           className="flex justify-between text-sm py-1"
//                         >
//                           <span>{service.title}</span>
//                           <span>${service.price.toFixed(2)}</span>
//                         </div>
//                       ) : null;
//                     })}
//                     <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-medium">
//                       <span>Total</span>
//                       <span>${totalAmount.toFixed(2)}</span>
//                     </div>
//                   </div>

//                   <p className="text-sm text-muted-foreground mb-4">
//                     After payment, you will gain access to the seller's contact
//                     details and can coordinate directly to schedule your
//                     service.
//                   </p>

//                   <div className="space-y-3">
//                     <Button className="w-full" onClick={handlePayment}>
//                       Pay Now
//                     </Button>
//                     <Button
//                       variant="outline"
//                       className="w-full"
//                       onClick={() => setShowPayment(false)}
//                     >
//                       Back to Services
//                     </Button>
//                   </div>
//                 </>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerDetails;

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Star,
  Share2,
  Calendar,
  MapPin,
  Clock,
  // ChevronLeft,
  ArrowLeft,
  ChevronRight,
  CheckCircle,
  Info,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole, Seller, Service } from "@/types";
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Mock data
const mockSeller: Seller = {
  id: "1",
  name: "Amina Cardi",
  email: "amina@example.com",
  username: "aminacardi",
  role: UserRole.SELLER,
  profilePictures: [
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  ],
  services: [
    {
      id: "s1",
      sellerId: "1",
      title: "Dinner Date",
      description:
        "Enjoy a nice dinner with me at a restaurant of your choice. I provide great conversation and companionship for the evening.",
      price: 150,
      isAvailable: true,
      createdAt: "2023-01-15T10:00:00Z",
      updatedAt: "2023-01-15T10:00:00Z",
    },
    {
      id: "s2",
      sellerId: "1",
      title: "Shopping Companion",
      description:
        "I'll accompany you for a shopping trip and help you pick out items. Get a second opinion on your purchases.",
      price: 120,
      isAvailable: true,
      createdAt: "2023-01-16T10:00:00Z",
      updatedAt: "2023-01-16T10:00:00Z",
    },
    {
      id: "s3",
      sellerId: "1",
      title: "Personal Tour Guide",
      description:
        "I'll show you around the city and take you to the best spots that only locals know about.",
      price: 200,
      isAvailable: true,
      createdAt: "2023-01-17T10:00:00Z",
      updatedAt: "2023-01-17T10:00:00Z",
    },
  ],
  contactDetails: {
    phoneNumber: "+2347012345678",
    instagram: "aminacardi",
  },
  verified: true,
  rating: 4.9,
  reviews: [
    {
      id: "r1",
      buyerId: "b1",
      sellerId: "1",
      serviceId: "s1",
      rating: 5,
      comment:
        "Amina was fantastic! Great conversation and made the evening very enjoyable.",
      createdAt: "2023-02-10T14:30:00Z",
    },
    {
      id: "r2",
      buyerId: "b2",
      sellerId: "1",
      serviceId: "s2",
      rating: 5,
      comment:
        "Helped me pick out some great clothes. Has an amazing sense of style!",
      createdAt: "2023-02-15T11:20:00Z",
    },
    {
      id: "r3",
      buyerId: "b3",
      sellerId: "1",
      serviceId: "s3",
      rating: 4,
      comment: "Showed me some amazing spots in the city. Would recommend!",
      createdAt: "2023-02-20T16:45:00Z",
    },
  ],
  createdAt: "2023-01-01T10:00:00Z",
  updatedAt: "2023-01-01T10:00:00Z",
};

// Available dates
const availableDates = [
  { date: "12 Mar 2025", time: "19:00 - 22:00", available: true },
  { date: "13 Mar 2025", time: "19:00 - 22:00", available: true },
  { date: "14 Mar 2025", time: "19:00 - 22:00", available: true },
  { date: "15 Mar 2025", time: "19:00 - 22:00", available: false },
  { date: "16 Mar 2025", time: "19:00 - 22:00", available: true },
  { date: "17 Mar 2025", time: "19:00 - 22:00", available: true },
  { date: "20 Mar 2025", time: "19:00 - 22:00", available: true },
];

const SellerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [seller, setSeller] = useState<Seller | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);

  // Get highlighted service from URL params
  const highlightedServiceId = searchParams.get("service");

  // Fetch seller data (simulated)
  useEffect(() => {
    // In a real app, this would be an API call
    setSeller(mockSeller);

    // Set default selected service
    if (highlightedServiceId) {
      const service = mockSeller.services.find(
        (s) => s.id === highlightedServiceId
      );
      if (service) {
        setSelectedService(service);
      } else {
        setSelectedService(mockSeller.services[0]);
      }
    } else {
      setSelectedService(mockSeller.services[0]);
    }
  }, [id, highlightedServiceId]);

  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };

  // Handle service selection
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  // Handle booking process
  const handleBook = () => {
    if (!selectedService || !selectedDate) return;
    setIsBookingDialogOpen(true);
  };

  // Handle payment process
  const handlePayment = () => {
    setIsBookingDialogOpen(false);
    setIsPaymentDialogOpen(true);
  };

  // Handle payment confirmation
  const handlePaymentConfirm = () => {
    // In a real app, this would process the payment
    setIsPaymentDialogOpen(false);
    navigate("/buyer/purchases");
  };

  // Loading state
  if (!seller || !selectedService) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6 pl-0 hover:bg-transparent hover:text-brand-blue"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to results
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Images and Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Carousel */}
          <div className="relative rounded-lg overflow-hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {seller.profilePictures.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/3] relative">
                      <img
                        src={image}
                        alt={`${seller.name} profile ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />

              {/* Favorite Button */}
              <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Heart size={20} className="text-white" />
              </button>

              {/* Share Button */}
              <button className="absolute top-4 right-16 p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Share2 size={20} className="text-white" />
              </button>
            </Carousel>
          </div>

          {/* Seller Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center mb-1">
                  <h1 className="text-2xl font-bold mr-2">{seller.name}</h1>
                  {seller.verified && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span>Lagos, Nigeria</span>
                  </div>
                  <div className="flex items-center">
                    <Star
                      size={16}
                      className="mr-1 text-yellow-400"
                      fill="currentColor"
                    />
                    <span>
                      {seller.rating} ({seller.reviews.length} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="about">
              <TabsList className="w-full">
                <TabsTrigger value="about" className="flex-1">
                  About
                </TabsTrigger>
                <TabsTrigger value="services" className="flex-1">
                  Services
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">About Me</h3>
                    <p className="text-muted-foreground">
                      Hi, I'm {seller.name}! I'm a friendly and outgoing
                      companion based in Lagos. I love meeting new people and
                      creating memorable experiences. I enjoy fine dining,
                      shopping, and exploring the city. Whether you need a
                      dinner companion, shopping assistant, or just someone to
                      talk to, I'm here to make your time enjoyable.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Availability</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Clock
                          size={16}
                          className="mr-2 text-muted-foreground"
                        />
                        <span>Typically responds within 1 hour</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar
                          size={16}
                          className="mr-2 text-muted-foreground"
                        />
                        <span>Available most evenings and weekends</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="services" className="mt-6">
                <div className="space-y-6">
                  {seller.services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 rounded-lg border ${
                        service.id === selectedService?.id
                          ? "border-brand-blue bg-brand-blue/5"
                          : "border-gray-200 hover:border-gray-300"
                      } cursor-pointer`}
                      onClick={() => handleServiceSelect(service)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{service.title}</h3>
                        <span className="font-semibold">${service.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-8">
                  {seller.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium">B</span>
                          </div>
                          <div>
                            <div className="font-medium">Anonymous Buyer</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(review.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="text-yellow-400"
                              fill={i < review.rating ? "currentColor" : "none"}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right Column: Booking and Details */}
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-2">{selectedService.title}</h2>
            <div className="text-2xl font-bold mb-4">
              ${selectedService.price}
            </div>

            <p className="text-muted-foreground mb-6">
              {selectedService.description}
            </p>

            <div className="space-y-4 mb-6">
              <h3 className="font-medium">Select a date</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableDates
                  .filter((date) => date.available)
                  .slice(0, 6)
                  .map((date) => (
                    <div
                      key={date.date}
                      className={`p-2 border rounded-md cursor-pointer text-center text-sm ${
                        selectedDate === date.date
                          ? "border-brand-blue bg-brand-blue/5 text-brand-blue"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => handleDateSelect(date.date)}
                    >
                      <div className="font-medium">
                        {date.date.split(" ")[0]} {date.date.split(" ")[1]}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {date.time}
                      </div>
                    </div>
                  ))}
              </div>
              {availableDates.length > 6 && (
                <Button variant="link" className="text-sm p-0 h-auto">
                  View more dates <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>

            <Button
              className="w-full mb-3"
              disabled={!selectedDate}
              onClick={handleBook}
            >
              Book Now
            </Button>

            <Button variant="outline" className="w-full">
              <MessageCircle className="mr-2 h-4 w-4" /> Message
            </Button>

            <div className="text-xs text-muted-foreground text-center mt-4 flex items-center justify-center">
              <Info className="h-3 w-3 mr-1" />
              Payment is required to access contact details
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
            <DialogDescription>
              Please review your booking details before proceeding to payment.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <div className="font-medium">Service:</div>
              <div>{selectedService.title}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Date:</div>
              <div>{selectedDate}</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Price:</div>
              <div className="font-bold">${selectedService.price}</div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm mt-6">
              <div className="flex">
                <Info className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                <div>
                  <span className="font-medium text-amber-800">Important:</span>
                  <span className="text-amber-700">
                    {" "}
                    After payment, you will receive the seller's contact details
                    to arrange your meeting.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBookingDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePayment}>Proceed to Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment</DialogTitle>
            <DialogDescription>
              Complete your payment to confirm your booking.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-4 border rounded-md bg-gray-50">
              <div className="flex justify-between font-medium">
                <div>{selectedService.title}</div>
                <div>${selectedService.price}</div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {selectedDate}
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between font-bold">
                  <div>Total</div>
                  <div>${selectedService.price}</div>
                </div>
              </div>
            </div>

            {/* Simulate payment form - would be replaced with actual payment integration */}
            <div className="space-y-2">
              <div className="h-10 bg-gray-100 rounded animate-pulse" />
              <div className="h-10 bg-gray-100 rounded animate-pulse" />
              <div className="h-10 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handlePaymentConfirm}>Pay Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerDetail;
