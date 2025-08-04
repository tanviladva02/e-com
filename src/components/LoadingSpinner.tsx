import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "spinner" | "dots" | "pulse";
  color?: "blue" | "white" | "gray";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  variant = "spinner",
  color = "blue",
  className = "",
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colorClasses = {
    blue: "border-blue-600 border-t-blue-600",
    white: "border-white border-t-white",
    gray: "border-gray-600 border-t-gray-600",
  };

  if (variant === "dots") {
    return (
      <div className={`loading-dots ${className}`}>
        <div
          className={`w-2 h-2 bg-${
            color === "blue" ? "blue" : color === "white" ? "white" : "gray"
          }-600 rounded-full animate-bounce`}
        ></div>
        <div
          className={`w-2 h-2 bg-${
            color === "blue" ? "blue" : color === "white" ? "white" : "gray"
          }-600 rounded-full animate-bounce`}
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className={`w-2 h-2 bg-${
            color === "blue" ? "blue" : color === "white" ? "white" : "gray"
          }-600 rounded-full animate-bounce`}
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div
        className={`animate-pulse bg-${
          color === "blue" ? "blue" : color === "white" ? "white" : "gray"
        }-600 rounded-full ${sizeClasses[size]} ${className}`}
      ></div>
    );
  }

  return (
    <div
      className={`loading-spinner ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
    ></div>
  );
};

export default LoadingSpinner;
