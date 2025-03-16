import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/store/auth-store";
import { UserRole } from "@/types";

// Import companion image or use the one from your assets
// This is a placeholder path - you'll need to add the actual image
import companionImage from "@/assets/images/companion-landscape.png";

// Define the login schema with Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //   const location = useLocation();
  const { login } = useAuthStore();

  // Get the user's intended destination from the location state
  //   const from = (location.state as any)?.from?.pathname || "/";

  // Initialize the form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: LoginFormValues) => {
    console.log("Login data:", data);

    // In a real application, you would verify credentials with your API
    // For demo purposes, we'll simulate a successful login

    // Determine user role based on email (this is just for demonstration)
    let userRole = UserRole.BUYER;
    if (data.email.includes("admin")) {
      userRole = UserRole.ADMIN;
    } else if (data.email.includes("seller")) {
      userRole = UserRole.SELLER;
    }

    // Create a mock user object
    const user = {
      id: "123",
      name: "Demo User",
      email: data.email,
      username: data.email.split("@")[0],
      role: userRole,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Login the user
    login(user);

    // Redirect based on the user's role
    if (userRole === UserRole.ADMIN) {
      navigate("/admin/dashboard");
    } else if (userRole === UserRole.SELLER) {
      navigate("/seller/dashboard");
    } else {
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
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="e.g bright@hotmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm font-medium text-brand-blue hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Demo Account Hints */}
              <div className="bg-gray-50 p-3 rounded-lg text-sm text-muted-foreground">
                <p className="font-medium mb-1">Demo Accounts:</p>
                <p>
                  <strong>Admin:</strong> admin@example.com
                </p>
                <p>
                  <strong>Seller:</strong> seller@example.com
                </p>
                <p>
                  <strong>Buyer:</strong> buyer@example.com
                </p>
                <p className="mt-1">Use any password to login</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#3170F3] hover:bg-[#3170F3]/90 cursor-pointer"
              >
                Sign in
              </Button>
            </form>
          </Form>

          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-brand-blue font-semibold hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
