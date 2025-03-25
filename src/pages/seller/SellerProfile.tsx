import React, { useState } from "react";
import {
  Star,
  MapPin,
  Check,
  X,
  //   Clock,
  Upload,
  Edit,
  User,
  //   Calendar,
  ChevronDown,
  //   Heart,
} from "lucide-react";
// import { useAuthStore } from "@/store/auth-store";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Mock seller data
const mockSellerData = {
  id: "seller1",
  name: "Sophia Reynolds",
  username: "sophiarey",
  location: "Lagos, Nigeria",
  bio: "Professional stylist with 5+ years of experience helping clients discover their personal style and build confidence through fashion. Specializing in personal shopping, style consultation, and wardrobe organization.",
  rating: 4.8,
  verified: true,
  reviews: [
    {
      id: "r1",
      buyerName: "Alex Johnson",
      rating: 5,
      comment:
        "Sophia was fantastic! She helped me find the perfect outfit for my interview.",
      date: "2023-02-10T14:30:00Z",
    },
    {
      id: "r2",
      buyerName: "Emma Davis",
      rating: 5,
      comment:
        "Helped me pick out some great clothes. Has an amazing sense of style!",
      date: "2023-02-15T11:20:00Z",
    },
    {
      id: "r3",
      buyerName: "Michael Smith",
      rating: 4,
      comment: "Great service! Would recommend to friends.",
      date: "2023-02-20T16:45:00Z",
    },
  ],
  languages: ["English", "French"],
  availability: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    hours: "9:00 AM - 6:00 PM",
  },
  interests: ["Fashion", "Art", "Travel", "Cooking"],
  education: "Fashion Institute of Design",
  joinDate: "2022-08-15T10:00:00Z",
  profilePictures: [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  ],
  services: [
    {
      id: "s1",
      title: "Personal Shopping",
      description: "I will help you find the perfect outfits for any occasion.",
      price: 150,
      category: "Fashion & Style",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "s2",
      title: "Style Consultation",
      description: "Get professional advice on your style.",
      price: 120,
      category: "Fashion & Style",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "s3",
      title: "Wardrobe Organization",
      description:
        "I will help you organize your wardrobe for maximum efficiency.",
      price: 200,
      category: "Fashion & Style",
      image:
        "https://images.unsplash.com/photo-1528396518501-b53b655eb9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
  ],
};

// Available time slots for scheduling
const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

// Days of the week for availability
const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const SellerProfile: React.FC = () => {
  //   const { user } = useAuthStore();
  const [seller, setSeller] = useState(mockSellerData);

  // Profile edit state
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    bio: seller.bio,
    location: seller.location,
    languages: seller.languages,
    interests: seller.interests.join(", "),
    education: seller.education,
  });

  // Availability edit state
  const [isEditAvailabilityOpen, setIsEditAvailabilityOpen] = useState(false);
  const [availabilityForm, setAvailabilityForm] = useState({
    days: seller.availability.days,
    startTime: "9:00 AM",
    endTime: "6:00 PM",
  });

  // Photos edit state
  const [isEditPhotosOpen, setIsEditPhotosOpen] = useState(false);

  // Handle profile form changes
  const handleProfileFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle availability day selection
  const handleDaySelect = (day: string) => {
    setAvailabilityForm((prev) => {
      if (prev.days.includes(day)) {
        return { ...prev, days: prev.days.filter((d) => d !== day) };
      } else {
        return { ...prev, days: [...prev.days, day] };
      }
    });
  };

  // Save profile changes
  const handleSaveProfile = () => {
    // In a real app, you would call an API to update the profile
    setSeller((prev) => ({
      ...prev,
      bio: profileForm.bio,
      location: profileForm.location,
      languages: profileForm.languages,
      interests: profileForm.interests.split(",").map((i) => i.trim()),
      education: profileForm.education,
    }));

    setIsEditProfileOpen(false);
  };

  // Save availability changes
  const handleSaveAvailability = () => {
    // In a real app, you would call an API to update the availability
    setSeller((prev) => ({
      ...prev,
      availability: {
        days: availabilityForm.days,
        hours: `${availabilityForm.startTime} - ${availabilityForm.endTime}`,
      },
    }));

    setIsEditAvailabilityOpen(false);
  };

  // Format join date
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
        {/* Cover Photo & Profile Image */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="absolute -bottom-16 left-6">
            <div className="relative">
              <img
                src={seller.profilePictures[0]}
                alt={seller.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 bg-white h-8 w-8 rounded-full shadow-md"
                onClick={() => setIsEditPhotosOpen(true)}
              >
                <Edit size={14} />
              </Button>
            </div>
          </div>
          {/* Verified Badge */}
          {seller.verified && (
            <div className="absolute top-4 right-4 bg-white py-1 px-3 rounded-full shadow-md flex items-center">
              <Check size={16} className="text-green-500 mr-1" />
              <span className="text-sm font-medium">Verified Seller</span>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="pt-20 pb-6 px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{seller.name}</h1>
              <div className="flex items-center mt-1 space-x-4">
                <div className="flex items-center">
                  <Star
                    size={16}
                    className="text-yellow-400 mr-1"
                    fill="currentColor"
                  />
                  <span className="text-sm">
                    {seller.rating} ({seller.reviews.length} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-500 mr-1" />
                  <span className="text-sm">{seller.location}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Joined {formatJoinDate(seller.joinDate)}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditProfileOpen(true)}
            >
              <Edit size={16} className="mr-2" /> Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - About & Info */}
        <div className="md:col-span-1 space-y-6">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{seller.bio}</p>
            </CardContent>
          </Card>

          {/* Details Section */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Languages */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Languages</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {seller.languages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Interests</h3>
                <div className="mt-1 flex flex-wrap gap-2">
                  {seller.interests.map((interest) => (
                    <Badge key={interest} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Education</h3>
                <p className="mt-1 text-sm text-gray-600">{seller.education}</p>
              </div>

              {/* Availability */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    Availability
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-xs"
                    onClick={() => setIsEditAvailabilityOpen(true)}
                  >
                    Edit
                  </Button>
                </div>
                <div className="mt-1 space-y-1 text-sm text-gray-600">
                  <p>{seller.availability.days.join(", ")}</p>
                  <p>{seller.availability.hours}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Photos</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() => setIsEditPhotosOpen(true)}
              >
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {seller.profilePictures.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-md overflow-hidden"
                  >
                    <img
                      src={photo}
                      alt={`Profile photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Services, Reviews, etc. */}
        <div className="md:col-span-2 space-y-6">
          {/* Tabs for Services, Reviews, etc. */}
          <Tabs defaultValue="services">
            <TabsList className="w-full">
              <TabsTrigger value="services" className="flex-1">
                Services
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1">
                Reviews
              </TabsTrigger>
            </TabsList>

            {/* Services Tab */}
            <TabsContent value="services" className="pt-6 space-y-6">
              {seller.services.map((service) => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {service.title}
                      </h3>
                      <Badge variant="outline" className="mb-3">
                        {service.category}
                      </Badge>
                      <p className="text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">
                          ${service.price}
                        </span>
                        <Button>Book Now</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="pt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Reviews</CardTitle>
                    <div className="flex items-center">
                      <Star
                        size={18}
                        className="text-yellow-400 mr-1"
                        fill="currentColor"
                      />
                      <span className="font-semibold">{seller.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({seller.reviews.length} reviews)
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {seller.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="pb-6 border-b border-gray-100 last:pb-0 last:border-b-0"
                    >
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User size={16} className="text-gray-500" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{review.buyerName}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex mt-1 mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
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
                          <p className="text-gray-600">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information to showcase your expertise and
              personality
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profileForm.bio}
                onChange={handleProfileFormChange}
                placeholder="Tell potential clients about yourself..."
                className="min-h-[120px]"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={profileForm.location}
                onChange={handleProfileFormChange}
                placeholder="e.g. Lagos, Nigeria"
              />
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <Label htmlFor="languages">Languages</Label>
              <Select
                value={profileForm.languages[0]}
                onValueChange={(value) =>
                  setProfileForm((prev) => ({
                    ...prev,
                    languages: [value, ...prev.languages.slice(1)],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select primary language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="Yoruba">Yoruba</SelectItem>
                  <SelectItem value="Igbo">Igbo</SelectItem>
                  <SelectItem value="Hausa">Hausa</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-2">
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs">
                      Add more languages{" "}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2">
                    <Select
                      value={profileForm.languages[1] || ""}
                      onValueChange={(value) =>
                        setProfileForm((prev) => {
                          const newLangs = [...prev.languages];
                          newLangs[1] = value;
                          return { ...prev, languages: newLangs };
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select secondary language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="Yoruba">Yoruba</SelectItem>
                        <SelectItem value="Igbo">Igbo</SelectItem>
                        <SelectItem value="Hausa">Hausa</SelectItem>
                      </SelectContent>
                    </Select>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <Label htmlFor="interests">Interests (comma separated)</Label>
              <Input
                id="interests"
                name="interests"
                value={profileForm.interests}
                onChange={handleProfileFormChange}
                placeholder="e.g. Fashion, Travel, Art"
              />
            </div>

            {/* Education */}
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                name="education"
                value={profileForm.education}
                onChange={handleProfileFormChange}
                placeholder="e.g. Fashion Institute of Design"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditProfileOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Availability Modal */}
      <Dialog
        open={isEditAvailabilityOpen}
        onOpenChange={setIsEditAvailabilityOpen}
      >
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Availability</DialogTitle>
            <DialogDescription>
              Update your availability to let potential clients know when you're
              available
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Days */}
            <div className="space-y-2">
              <Label>Available Days</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day}
                    type="button"
                    variant={
                      availabilityForm.days.includes(day)
                        ? "default"
                        : "outline"
                    }
                    onClick={() => handleDaySelect(day)}
                    className="text-sm"
                  >
                    {day}
                  </Button>
                ))}
              </div>
            </div>

            {/* Hours */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Start Time</Label>
                <Select
                  value={availabilityForm.startTime}
                  onValueChange={(value) =>
                    setAvailabilityForm((prev) => ({
                      ...prev,
                      startTime: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime">End Time</Label>
                <Select
                  value={availabilityForm.endTime}
                  onValueChange={(value) =>
                    setAvailabilityForm((prev) => ({ ...prev, endTime: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="End time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditAvailabilityOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveAvailability}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Photos Modal */}
      <Dialog open={isEditPhotosOpen} onOpenChange={setIsEditPhotosOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Photos</DialogTitle>
            <DialogDescription>
              Update your profile photos to showcase your personality
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Current Photos */}
            <div className="space-y-2">
              <Label>Current Photos</Label>
              <div className="grid grid-cols-3 gap-4">
                {seller.profilePictures.map((photo, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-md overflow-hidden group"
                  >
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 w-8 p-0 rounded-full"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
                {seller.profilePictures.length < 5 && (
                  <div className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Add Photo</span>
                  </div>
                )}
              </div>
            </div>

            {/* Upload New Photo */}
            <div className="space-y-2">
              <Label>Upload New Photos</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Drag and drop photos here, or click to select
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Maximum 5 photos. JPG, PNG, or GIF. 5MB max per file.
                </p>
                <Button variant="outline" className="mt-4">
                  Select Photos
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditPhotosOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsEditPhotosOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SellerProfile;
