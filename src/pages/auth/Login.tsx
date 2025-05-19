import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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

import companionImage from "@/assets/images/companion-landscape.png";

// Define the login schema with Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginPage: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { loginUser, isLoading, error } = useAuthStore();

  // Get the user's intended destination from the location state
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);

      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Initialize the form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const success = await loginUser(data);

    if (success) {
      // Get the user from the store
      const { user, onboardingRequired, onboardingStep } =
        useAuthStore.getState();
      console.log("Onboarding Required:", onboardingRequired);
      console.log("Onboarding Step:", onboardingStep);

        if (user?.role === UserRole.SELLER && onboardingRequired) {
          // If user is a seller and onboarding is required, redirect to onboarding
          navigate(`/onboarding/${onboardingStep || "profile"}`);
        } else if (user?.role === UserRole.ADMIN) {
          navigate("/admin/dashboard");
        } else if (user?.role === UserRole.SELLER) {
          navigate("/seller/dashboard");
        } else {
          navigate("/buyer/dashboard");
        }

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
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
              {/* Display login error if any */}
              {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-md text-sm bg-green-50 text-green-800 border-green-200">
                  {successMessage}
                </div>
              )}

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

              <Button
                type="submit"
                className="w-full bg-brand-blue hover:bg-brand-blue/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
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
