"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        bg-bitcoin-orange 
        text-white 
        rounded-none 
        px-6 md:px-8 
        py-3 md:py-4 
        font-medium 
        transition-colors 
        duration-200 
        hover:bg-[#E0841A] 
        active:bg-[#C77518] 
        disabled:opacity-50 
        disabled:cursor-not-allowed 
        focus:outline-none 
        focus:ring-2 
        focus:ring-bitcoin-orange 
        focus:ring-offset-2
        min-h-[44px]
        ${className}
      `.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
