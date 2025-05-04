import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RegisterForm from "@/components/forms/RegisterForm";
import { UserRole } from "@/types";
import companionImage from "@/assets/images/companion-landscape.png";

const RegisterPage: React.FC = () => {
  const location = useLocation();
  const [defaultRole, setDefaultRole] = useState<UserRole>(UserRole.BUYER);

  // Pick up ?role=seller from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    setDefaultRole(
      roleParam?.toLowerCase() === "seller" ? UserRole.SELLER : UserRole.BUYER
    );
  }, [location.search]);

  return (
    <>
      {/* For any toast messages */}
      <Toaster position="top-center" />

      <div className="flex min-h-screen bg-white">
        {/* Left side image */}
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

        {/* Right side form */}
        <div className="w-full md:w-1/2 lg:w-6/12 flex items-center justify-center p-8">
          <RegisterForm defaultRole={defaultRole} />
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
