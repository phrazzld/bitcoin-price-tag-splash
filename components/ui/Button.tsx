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
    inline-block
    text-center
    cursor-pointer
    text-base
    md:text-lg
    font-semibold
    tracking-tight
    leading-none
    text-white 
    bg-gradient-to-b
    from-[#F7931A]
    to-[#E0841A]
    rounded-xl
    px-6
    md:px-8
    py-3
    md:py-4
    min-h-[48px]
    shadow-[0_4px_12px_rgba(247,147,26,0.25),0_2px_4px_rgba(0,0,0,0.1)]
    border
    border-[rgba(255,255,255,0.15)]
    transition-all
    duration-200
    ease-out
    hover:from-[#E0841A]
    hover:to-[#C77518]
    hover:shadow-[0_8px_20px_rgba(247,147,26,0.35),0_4px_8px_rgba(0,0,0,0.15)]
    hover:transform
    hover:-translate-y-1
    hover:scale-[1.02]
    focus-visible:outline
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-bitcoin-orange
    active:from-[#C77518]
    active:to-[#B86A16]
    active:translate-y-0
    active:scale-100
    active:shadow-[0_2px_8px_rgba(247,147,26,0.3),0_1px_2px_rgba(0,0,0,0.2)]
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:transform-none
    disabled:hover:shadow-[0_4px_12px_rgba(247,147,26,0.25),0_2px_4px_rgba(0,0,0,0.1)]
    disabled:hover:scale-100
    motion-reduce:transition-none
    motion-reduce:hover:transform-none
    motion-reduce:hover:scale-100
    motion-reduce:active:transform-none
    motion-reduce:active:scale-100
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
