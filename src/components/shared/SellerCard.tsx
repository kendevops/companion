import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Seller, Service } from "@/types";

interface SellerCardProps {
  seller: Seller;
  featuredServices?: Service[];
}

const SellerCard: React.FC<SellerCardProps> = ({
  seller,
  featuredServices = [],
}) => {
  const navigate = useNavigate();

  // Navigate to seller detail page
  const handleClick = () => {
    navigate(`/buyer/sellers/${seller.id}`);
  };

  // Toggle favorite (would connect to a favorites store in a real app)
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    console.log("Toggle favorite for seller:", seller.id);
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg"
      onClick={handleClick}
    >
      {/* Images Carousel */}
      <div className="relative h-48 bg-gray-200">
        {seller.profilePictures && seller.profilePictures.length > 0 ? (
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="h-full w-full"
          >
            {seller.profilePictures.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${seller.name} profile ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No images</span>
          </div>
        )}

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
          onClick={handleToggleFavorite}
        >
          <Heart
            size={18}
            className="text-gray-600 hover:text-red-500"
            fill="transparent"
          />
        </Button>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Seller Info */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-lg">{seller.name}</h3>
            <div className="flex items-center mt-1">
              <Star
                size={16}
                className="text-yellow-400 mr-1"
                fill="currentColor"
              />
              <span className="text-sm font-medium">
                {seller.rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Verified Badge */}
          {seller.verified && (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              Verified
            </Badge>
          )}
        </div>

        {/* Services Preview */}
        {featuredServices && featuredServices.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
            <div className="space-y-2">
              {featuredServices.slice(0, 2).map((service) => (
                <div key={service.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{service.title}</span>
                  <span className="font-medium">
                    ${service.price.toFixed(2)}
                  </span>
                </div>
              ))}

              {featuredServices.length > 2 && (
                <p className="text-xs text-muted-foreground text-right">
                  +{featuredServices.length - 2} more services
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerCard;
