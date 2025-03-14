/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SellerCard from "@/components/shared/SellerCard";
import { Seller } from "@/types";

// Mock data for development
const mockSellers: Seller[] = [
  {
    id: "1",
    name: "Sophia Reynolds",
    email: "sophia@example.com",
    username: "sophiarey",
    role: "seller" as any,
    profilePictures: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    ],
    services: [
      {
        id: "s1",
        sellerId: "1",
        title: "Personal Shopping",
        description:
          "I will help you find the perfect outfits for any occasion.",
        price: 150,
        isAvailable: true,
        createdAt: "2023-01-15T10:00:00Z",
        updatedAt: "2023-01-15T10:00:00Z",
      },
      {
        id: "s2",
        sellerId: "1",
        title: "Style Consultation",
        description: "Get professional advice on your style.",
        price: 120,
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
    reviews: [],
    createdAt: "2023-01-01T10:00:00Z",
    updatedAt: "2023-01-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Marcus Chen",
    email: "marcus@example.com",
    username: "marcuschen",
    role: "seller" as any,
    profilePictures: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    ],
    services: [
      {
        id: "s3",
        sellerId: "2",
        title: "City Tour Guide",
        description: "Explore the hidden gems of the city with a local guide.",
        price: 200,
        isAvailable: true,
        createdAt: "2023-02-10T10:00:00Z",
        updatedAt: "2023-02-10T10:00:00Z",
      },
      {
        id: "s4",
        sellerId: "2",
        title: "Photography Session",
        description: "Professional photography during your tour.",
        price: 300,
        isAvailable: true,
        createdAt: "2023-02-10T10:00:00Z",
        updatedAt: "2023-02-10T10:00:00Z",
      },
    ],
    contactDetails: {
      phoneNumber: "+1987654321",
      instagram: "marcusexplores",
      wechat: "marcuschen",
    },
    verified: true,
    rating: 4.6,
    reviews: [],
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "3",
    name: "Elena Kim",
    email: "elena@example.com",
    username: "elenakim",
    role: "seller" as any,
    profilePictures: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    ],
    services: [
      {
        id: "s5",
        sellerId: "3",
        title: "Language Tutoring",
        description: "Learn Korean from a native speaker.",
        price: 50,
        isAvailable: true,
        createdAt: "2023-03-01T10:00:00Z",
        updatedAt: "2023-03-01T10:00:00Z",
      },
    ],
    contactDetails: {
      phoneNumber: "+1122334455",
      instagram: "elenateaches",
    },
    verified: false,
    rating: 4.9,
    reviews: [],
    createdAt: "2023-02-01T10:00:00Z",
    updatedAt: "2023-02-01T10:00:00Z",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james@example.com",
    username: "jameswilson",
    role: "seller" as any,
    profilePictures: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    ],
    services: [
      {
        id: "s6",
        sellerId: "4",
        title: "Personal Training",
        description: "Personalized workout plans and training sessions.",
        price: 80,
        isAvailable: true,
        createdAt: "2023-03-15T10:00:00Z",
        updatedAt: "2023-03-15T10:00:00Z",
      },
      {
        id: "s7",
        sellerId: "4",
        title: "Nutrition Coaching",
        description: "Custom meal plans to reach your fitness goals.",
        price: 120,
        isAvailable: true,
        createdAt: "2023-03-15T10:00:00Z",
        updatedAt: "2023-03-15T10:00:00Z",
      },
    ],
    contactDetails: {
      phoneNumber: "+1567891234",
      instagram: "jamesfitness",
    },
    verified: true,
    rating: 4.7,
    reviews: [],
    createdAt: "2023-02-15T10:00:00Z",
    updatedAt: "2023-02-15T10:00:00Z",
  },
];

const BuyerDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recommended");

  // Filter sellers based on search query
  const filteredSellers = mockSellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.services.some((service) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Sort sellers based on selected option
  const sortedSellers = [...filteredSellers].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return (
          Math.min(...a.services.map((s) => s.price)) -
          Math.min(...b.services.map((s) => s.price))
        );
      case "price-high":
        return (
          Math.max(...b.services.map((s) => s.price)) -
          Math.max(...a.services.map((s) => s.price))
        );
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // Default sorting (recommended)
    }
  });

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Services</h1>
        <p className="text-muted-foreground">
          Discover the perfect service providers for your needs
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for services or sellers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedSellers.map((seller) => (
          <SellerCard
            key={seller.id}
            seller={seller}
            featuredServices={seller.services.slice(0, 3)}
          />
        ))}
      </div>

      {/* Empty State */}
      {sortedSellers.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No results found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter to find what you're looking for
          </p>
        </div>
      )}
    </div>
  );
};

export default BuyerDashboard;
