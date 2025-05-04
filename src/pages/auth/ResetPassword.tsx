import React from "react";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

import companionImage from "@/assets/images/companion-landscape.png";

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Image */}
      <div className="hidden md:block md:w-1/2 lg:w-6/12 relative">
        <div className="absolute inset-0 rounded-r-3xl overflow-hidden">
          <div className="w-250 h-full mx-5 rounded-4xl overflow-hidden">
            <img
              src={companionImage}
              alt="Companion landscape"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl font-medium text-white">ARTA</h1>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 lg:w-6/12 flex items-center justify-center p-8">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
