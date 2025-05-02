/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import RegisterForm from "@/components/forms/RegisterForm";
import { UserRole } from "@/types";
import api from "@/services/api";

// Import this image or use the one from your assets
import companionImage from "@/assets/images/companion-landscape.png";

interface RegisterFormValues {
  name: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [defaultRole, setDefaultRole] = useState<UserRole>(UserRole.BUYER);

  // Check for role parameter in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");

    if (roleParam === "seller" && roleParam.toLowerCase() === "seller") {
      setDefaultRole(UserRole.SELLER);
    } else {
      setDefaultRole(UserRole.BUYER);
    }
  }, [location.search]);

  const handleRegister = async (data: RegisterFormValues) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", data);
      console.log("Registration successful:", response.data);

      // Show success message
      toast.success("Registration successful! Redirecting...");

      // Navigate based on the role selected
      if (data.role === UserRole.SELLER) {
        navigate("/seller/dashboard");
      } else {
        navigate("/buyer/dashboard");
      }
    } catch (error: any) {
      // Handle error and show appropriate error message
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      console.error("Registration error:", error);
      toast.error(`Registration failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

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
        <RegisterForm
          defaultRole={defaultRole}
          onSubmit={handleRegister}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
