import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingErrorProps {
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
  loadingMessage?: string;
  errorMessage?: string;
  children: React.ReactNode;
}

/**
 * A component that handles loading and error states
 * Shows a loading spinner when loading is true
 * Shows an error message when error is not null
 * Shows children when not loading and no error
 */
const LoadingError: React.FC<LoadingErrorProps> = ({
  loading,
  error,
  onRetry,
  loadingMessage = "Loading...",
  errorMessage,
  children,
}) => {
  // Show loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
        <span className="ml-2 text-lg">{loadingMessage}</span>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6 bg-red-50 rounded-lg text-center">
        <p className="text-red-600 mb-4">{errorMessage || error}</p>
        {onRetry && <Button onClick={onRetry}>Try Again</Button>}
      </div>
    );
  }

  // Show children if not loading and no error
  return <>{children}</>;
};

export default LoadingError;
