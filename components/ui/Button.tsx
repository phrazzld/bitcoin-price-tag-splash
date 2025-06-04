'use client';

import React from 'react';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', href, ...props }) => {
  const correlationId = useCorrelationId();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Log button click interaction
    logger.info('Button clicked', 'Button', {
      event_type: 'user_interaction',
      interaction_type: 'button_click',
      button_text: typeof children === 'string' ? children : 'Complex content',
      has_href: !!href,
      href_destination: href || undefined,
      correlation_id_from_hook: correlationId,
    });

    // Call original onClick if provided
    if (props.onClick) {
      props.onClick(event);
    }
  };

  const handleAnchorClick = (_event: React.MouseEvent<HTMLAnchorElement>) => {
    // Log anchor click interaction
    logger.info('Button clicked', 'Button', {
      event_type: 'user_interaction',
      interaction_type: 'button_click',
      button_text: typeof children === 'string' ? children : 'Complex content',
      has_href: !!href,
      href_destination: href || undefined,
      correlation_id_from_hook: correlationId,
    });
  };
  const buttonClasses = `
    relative
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
    motion-reduce:transition-none
    motion-reduce:hover:transform-none
    motion-reduce:hover:shadow-sm
    active:bg-[#C77518] 
    active:translate-y-0
    motion-reduce:active:transform-none
    disabled:opacity-50 
    disabled:cursor-not-allowed 
    disabled:hover:transform-none
    disabled:hover:shadow-none
    min-h-[44px]
    shadow-sm
    inline-block
    text-center
    cursor-pointer
    ${className}
  `.trim();

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        onClick={handleAnchorClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClasses} {...props} onClick={handleButtonClick}>
      {children}
    </button>
  );
};

export default Button;
