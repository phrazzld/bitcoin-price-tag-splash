'use client';

import React from 'react';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  href,
  loading = false,
  ...props
}) => {
  const correlationId = useCorrelationId();

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent clicks when loading
    if (loading) {
      event.preventDefault();
      return;
    }

    // Log button click interaction
    logger.info('Button clicked', 'Button', {
      event_type: 'user_interaction',
      interaction_type: 'button_click',
      button_text: typeof children === 'string' ? children : 'Complex content',
      has_href: !!href,
      href_destination: href || undefined,
      is_loading: loading,
      correlation_id_from_hook: correlationId,
    });

    // Call original onClick if provided
    if (props.onClick) {
      props.onClick(event);
    }
  };

  const LoadingSpinner = () => (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent navigation when loading
    if (loading) {
      event.preventDefault();
      return;
    }

    // Log anchor click interaction
    logger.info('Button clicked', 'Button', {
      event_type: 'user_interaction',
      interaction_type: 'button_click',
      button_text: typeof children === 'string' ? children : 'Complex content',
      has_href: !!href,
      href_destination: href || undefined,
      is_loading: loading,
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
    ${loading ? 'cursor-wait opacity-90' : ''}
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
        aria-disabled={loading}
      >
        <span className="flex items-center justify-center">
          {loading && <LoadingSpinner />}
          <span className={loading ? 'opacity-70' : ''}>{children}</span>
        </span>
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      {...props}
      onClick={handleButtonClick}
      disabled={props.disabled || loading}
      aria-disabled={loading}
    >
      <span className="flex items-center justify-center">
        {loading && <LoadingSpinner />}
        <span className={loading ? 'opacity-70' : ''}>{children}</span>
      </span>
    </button>
  );
};

export default Button;
