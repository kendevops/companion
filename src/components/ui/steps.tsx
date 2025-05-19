import * as React from "react";
import { cn } from "@/lib/utils";

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

function StepsBase({ className, ...props }: StepsProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props} />
  );
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export function Step({ value, className, children, ...props }: StepProps) {
  // Context from parent Steps component
  const stepsValue = React.useContext(StepsContext);

  const isActive = value === stepsValue;
  const isCompleted = value < stepsValue;

  return (
    <div className="flex-1 flex items-center">
      {value > 1 && (
        <div
          className={cn(
            "h-1 flex-1",
            isCompleted || isActive ? "bg-brand-blue" : "bg-gray-200"
          )}
        />
      )}
      <div
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full",
          isActive ? "border-4 border-brand-blue" : "",
          isCompleted ? "bg-brand-blue text-white" : "bg-white",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full",
            isCompleted ? "bg-brand-blue text-white" : "",
            isActive
              ? "border-brand-blue text-brand-blue"
              : "border border-gray-300 text-gray-500"
          )}
        >
          <span className="text-sm font-medium">{value}</span>
        </div>
        <div className="absolute -bottom-6 w-max text-center">
          <span
            className={cn(
              "text-xs font-medium",
              isActive || isCompleted ? "text-brand-blue" : "text-gray-500"
            )}
          >
            {children}
          </span>
        </div>
      </div>
      {value < stepsValue && (
        <div
          className={cn(
            "h-1 flex-1",
            value < stepsValue ? "bg-brand-blue" : "bg-gray-200"
          )}
        />
      )}
    </div>
  );
}

// Context for parent value
const StepsContext = React.createContext<number>(1);

// Override the context with value from Steps
const Steps: React.FC<StepsProps> = ({ value, ...props }) => {
  return (
    <StepsContext.Provider value={value}>
      <StepsBase value={value} {...props} />
    </StepsContext.Provider>
  );
};

Steps.displayName = "Steps";
Step.displayName = "Step";

export { Steps };
