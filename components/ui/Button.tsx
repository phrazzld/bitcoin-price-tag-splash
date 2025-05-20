'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', href, ...props }) => {
  const buttonClasses = `
    bg-bitcoin-orange 
    text-white 
    rounded-lg 
    px-6 md:px-8 
    py-3 md:py-4 
    font-medium 
    transition-all
    duration-200 
    hover:bg-[#E0841A] 
    hover:shadow-lg
    hover:transform
    hover:-translate-y-0.5
    active:bg-[#C77518] 
    active:translate-y-0
    disabled:opacity-50 
    disabled:cursor-not-allowed 
    disabled:hover:transform-none
    disabled:hover:shadow-none
    focus:outline-none 
    focus:ring-2 
    focus:ring-bitcoin-orange 
    focus:ring-offset-2
    min-h-[44px]
    shadow-sm
    inline-block
    text-center
    cursor-pointer
    ${className}
  `.trim();

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
