import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined" | "glass";
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  hover = false,
  className = "",
  onClick,
}) => {
  const baseClasses = "rounded-xl transition-all duration-300";

  const variantClasses = {
    default: "bg-white shadow-lg border border-gray-100",
    elevated: "bg-white shadow-xl border border-gray-100",
    outlined: "bg-white border-2 border-gray-200",
    glass: "glass",
  };

  const hoverClasses = hover
    ? "hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
    : "";

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
