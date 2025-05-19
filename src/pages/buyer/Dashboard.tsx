/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react";
import { Search, Filter, Loader2 } from "lucide-react";

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
import UsersService from "@/services/users-service";

const BuyerDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recommended");
  const [sellers, setSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Fetch sellers on component mount
  useEffect(() => {
    const fetchSellers = async () => {
      setLoading(true);
      try {
        const response = await UsersService.getSellers();
        setSellers(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch sellers");
        console.error("Error fetching sellers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  // Filter sellers based on search query
  const filteredSellers = sellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.seller.services.some((service: any) =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Sort sellers based on selected option
  const sortedSellers = [...filteredSellers].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return (
          Math.min(...a.seller.services.map((s: any) => s.price)) -
          Math.min(...b.seller.services.map((s: any) => s.price))
        );
      case "price-high":
        return (
          Math.max(...b.seller.services.map((s: any) => s.price)) -
          Math.max(...a.seller.services.map((s: any) => s.price))
        );
      case "rating":
        return b.seller.rating - a.seller.rating;
      default:
        return 0; // Default sorting (recommended)
    }
  });

  // Toggle favorite for a seller
  const handleToggleFavorite = (sellerId: string) => {
    setFavorites((prev) => {
      if (prev.includes(sellerId)) {
        return prev.filter((id) => id !== sellerId);
      } else {
        return [...prev, sellerId];
      }
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Her!</h1>
        <p className="text-muted-foreground">
          Discover the perfect Companion
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

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
          <span className="ml-2 text-lg">Loading beautiful companions...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <div className="text-red-500 mb-2">Error: {error}</div>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedSellers.map((seller) => (
            <SellerCard
              key={seller.id}
              seller={seller}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.includes(seller.seller.id)}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && sortedSellers.length === 0 && (
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
