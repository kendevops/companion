import React, { useState } from "react";
import {
  Calendar,
  Star,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  Phone,
  MessageSquare,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";

// Booking status type
type BookingStatus = "upcoming" | "pending" | "completed" | "all";

// Booking interface
interface Booking {
  id: string;
  serviceTitle: string;
  buyerName: string;
  buyerImage?: string;
  buyerLocation?: string;
  buyerContactInfo?: {
    phone?: string;
    email?: string;
  };
  earnings: number;
  date: string;
  time?: string;
  status: BookingStatus;
  notes?: string;
}

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: "b1",
    serviceTitle: "Dinner with Mike",
    buyerName: "Mike Nwachukwu",
    buyerImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    buyerLocation: "Lagos, Nigeria",
    buyerContactInfo: {
      phone: "+234 812 345 6789",
      email: "mike@example.com",
    },
    earnings: 40,
    date: "2023-06-15",
    time: "19:00 - 22:00",
    status: "upcoming",
    notes:
      "Looking forward to our dinner. I prefer Italian cuisine if that works for you.",
  },
  {
    id: "b2",
    serviceTitle: "Dinner at Pellegrini's Bar",
    buyerName: "Sarah Johnson",
    buyerImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    buyerLocation: "Lagos, Nigeria",
    buyerContactInfo: {
      phone: "+234 812 987 6543",
      email: "sarah@example.com",
    },
    earnings: 200,
    date: "2023-06-15",
    time: "20:00 - 23:00",
    status: "upcoming",
    notes:
      "I've made a reservation at Pellegrini's for 8 PM. Looking forward to meeting you.",
  },
  {
    id: "b3",
    serviceTitle: "Coffee at Starbucks",
    buyerName: "David Lee",
    buyerImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    buyerLocation: "Lagos, Nigeria",
    buyerContactInfo: {
      phone: "+234 812 345 1234",
      email: "david@example.com",
    },
    earnings: 50,
    date: "2023-06-15",
    time: "15:00 - 16:30",
    status: "upcoming",
    notes:
      "Let's meet at the Starbucks on Victoria Island. I'll be wearing a blue shirt.",
  },
  {
    id: "b4",
    serviceTitle: "Shopping Assistant",
    buyerName: "Emma Wilson",
    buyerImage:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    buyerLocation: "Lagos, Nigeria",
    earnings: 120,
    date: "2023-06-18",
    time: "14:00 - 17:00",
    status: "pending",
    notes:
      "I need help finding a dress for a formal event. I prefer elegant styles.",
  },
  {
    id: "b5",
    serviceTitle: "City Tour",
    buyerName: "James Wilson",
    buyerImage:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    buyerLocation: "Lagos, Nigeria",
    earnings: 180,
    date: "2023-06-20",
    time: "10:00 - 15:00",
    status: "pending",
    notes:
      "I'm visiting Lagos for the first time and would like to see the main attractions.",
  },
  {
    id: "b6",
    serviceTitle: "Dinner Date",
    buyerName: "Olivia Brown",
    buyerImage:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    buyerLocation: "Lagos, Nigeria",
    buyerContactInfo: {
      phone: "+234 812 555 7890",
      email: "olivia@example.com",
    },
    earnings: 150,
    date: "2023-05-30",
    time: "19:00 - 22:00",
    status: "completed",
    notes: "Had a lovely dinner at La Veranda restaurant.",
  },
  {
    id: "b7",
    serviceTitle: "Personal Shopping",
    buyerName: "Alex Thompson",
    buyerImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    buyerLocation: "Lagos, Nigeria",
    buyerContactInfo: {
      phone: "+234 812 333 4444",
      email: "alex@example.com",
    },
    earnings: 200,
    date: "2023-05-25",
    time: "13:00 - 16:00",
    status: "completed",
    notes:
      "Helped Alex pick out a new wardrobe. Very satisfied with the purchases.",
  },
];

const SellerBookings: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Get status from URL or default to 'upcoming'
  const initialTab =
    (searchParams.get("status") as BookingStatus) || "upcoming";
  const [activeTab, setActiveTab] = useState<BookingStatus>(initialTab);

  // Filter bookings based on active tab
  const filteredBookings = mockBookings.filter((booking) =>
    activeTab === "all" ? true : booking.status === activeTab
  );

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as BookingStatus);
    navigate(`/seller/bookings?status=${value}`, { replace: true });
  };

  // Handle "More details" button click
  const handleMoreDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  // Handle accept booking
  const handleAcceptBooking = () => {
    // In a real app, you would call an API here
    console.log(`Accepting booking ${selectedBooking?.id}`);
    // Update the booking status in state
    setSelectedBooking((prev) =>
      prev ? { ...prev, status: "upcoming" } : null
    );
    // Close the dialog after a delay
    setTimeout(() => setIsDetailsOpen(false), 1000);
  };

  // Handle reject booking
  const handleRejectBooking = () => {
    // In a real app, you would call an API here
    console.log(`Rejecting booking ${selectedBooking?.id}`);
    // Close the dialog
    setIsDetailsOpen(false);
  };

  // Handle booking rating
  const handleRateBooking = (rating: number) => {
    // In a real app, you would call an API here
    console.log(`Rating booking ${selectedBooking?.id} with ${rating} stars`);
    // Close the dialog
    setIsDetailsOpen(false);
  };

  return (
    <div className="container mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Bookings</h1>

      {/* Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="flex items-center border-b pb-6">
                {/* Booking Image/Avatar */}
                <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden mr-6">
                  {booking.buyerImage ? (
                    <img
                      src={booking.buyerImage}
                      alt={booking.buyerName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {booking.buyerName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  )}
                </div>

                {/* Booking Info */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {booking.serviceTitle}
                  </h2>
                  <p className="text-gray-600">{booking.buyerName}</p>
                  <div className="flex items-center mt-1">
                    <DollarSign className="h-4 w-4 text-brand-blue mr-1" />
                    <span className="text-brand-blue">
                      Earning ${booking.earnings}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-gray-500">
                      {formatDate(booking.date)}
                    </span>
                  </div>
                </div>

                {/* More Details Button */}
                <Button
                  variant="ghost"
                  onClick={() => handleMoreDetails(booking)}
                  className="text-gray-600 hover:text-brand-blue"
                >
                  More details
                </Button>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                No {activeTab} bookings
              </h3>
              <p className="text-muted-foreground">
                {activeTab === "pending"
                  ? "You don't have any pending booking requests at the moment."
                  : activeTab === "upcoming"
                  ? "You don't have any upcoming bookings scheduled."
                  : activeTab === "completed"
                  ? "You haven't completed any bookings yet."
                  : "You don't have any bookings yet."}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Booking Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBooking.serviceTitle}</DialogTitle>
                <DialogDescription>
                  Booking details and information
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-6">
                {/* Buyer Info */}
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedBooking.buyerImage}
                      alt={selectedBooking.buyerName}
                    />
                    <AvatarFallback>
                      {selectedBooking.buyerName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedBooking.buyerName}</h3>
                    {selectedBooking.buyerLocation && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{selectedBooking.buyerLocation}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Booking Details */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-muted-foreground">
                        {formatDate(selectedBooking.date)} •{" "}
                        {selectedBooking.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <DollarSign className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Earnings</p>
                      <p className="text-muted-foreground">
                        ${selectedBooking.earnings}
                      </p>
                    </div>
                  </div>

                  {selectedBooking.notes && (
                    <div className="flex items-start">
                      <MessageSquare className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Notes</p>
                        <p className="text-muted-foreground">
                          {selectedBooking.notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Info - Only show for upcoming/completed bookings */}
                {(selectedBooking.status === "upcoming" ||
                  selectedBooking.status === "completed") &&
                  selectedBooking.buyerContactInfo && (
                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-2">Contact Information</h3>
                      <div className="space-y-2">
                        {selectedBooking.buyerContactInfo.phone && (
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {selectedBooking.buyerContactInfo.phone}
                            </span>
                          </div>
                        )}
                        {selectedBooking.buyerContactInfo.email && (
                          <div className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>
                              {selectedBooking.buyerContactInfo.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {/* Rating Section - Only for completed bookings */}
                {selectedBooking.status === "completed" && (
                  <div className="border-t pt-4">
                    <h3 className="font-medium mb-3">Rate this booking</h3>
                    <div className="flex items-center justify-center space-x-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleRateBooking(rating)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            size={24}
                            className="text-yellow-400"
                            fill="currentColor"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter>
                {selectedBooking.status === "pending" ? (
                  <>
                    <Button variant="outline" onClick={handleRejectBooking}>
                      <XCircle className="mr-2 h-4 w-4" /> Reject
                    </Button>
                    <Button onClick={handleAcceptBooking}>
                      <CheckCircle className="mr-2 h-4 w-4" /> Accept
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerBookings;
