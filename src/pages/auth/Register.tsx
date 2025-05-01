import React from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "@/components/forms/RegisterForm";
import { UserRole } from "@/types";
import api from "@/services/api";


// Import this image or use the one from your assets
// This is a placeholder path - you'll need to add the actual image
import companionImage from "@/assets/images/companion-landscape.png";

interface RegisterFormValues {
  fullName: string;
  email: string;
  username: string;
  password: string;
  role: UserRole;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormValues) => {
    // In production, you would call your API here
    console.log("Registration data:", data);
    try {
      const response = await api.post("/auth/register", data);
      console.log("Registration successful:", response.data);
      // Optionally, you can store the user data in your state management or context
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error (e.g., show a notification)
    }
    // Navigate based on the role selected
    if (data.role === UserRole.SELLER) {
      navigate("/seller/dashboard");
    } else if (data.role === UserRole.BUYER) {
      navigate("/buyer/dashboard");
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
        <RegisterForm defaultRole={UserRole.BUYER} onSubmit={handleRegister} />
      </div>
    </div>
  );
};

export default RegisterPage;
