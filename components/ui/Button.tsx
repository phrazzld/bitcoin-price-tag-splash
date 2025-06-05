'use client';

import React from 'react';
import { logger } from '@/lib/logging/logger';
import { useCorrelationId } from '@/lib/logging/correlation';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  loading?: boolean;
  size?: 'small' | 'default' | 'large';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  href,
  loading = false,
  size = 'default',
  ...props
}) => {
  const correlationId = useCorrelationId();

  // Size configurations following 8pt grid system and typography scale
  const sizeConfig = {
    small: {
      fontSize: 'text-sm', // 14px - consistent across breakpoints
      padding: 'px-4 md:px-6 py-2 md:py-3', // 16px/24px horizontal, 8px/12px vertical
      minHeight: 'min-h-[40px] md:min-h-[44px]',
      borderRadius: 'rounded-lg', // 8px
      spinnerSize: 'h-4 w-4',
      spinnerMargin: '-ml-1 mr-2',
    },
    default: {
      fontSize: 'text-base', // 16px - consistent across breakpoints
      padding: 'px-6 md:px-8 py-3 md:py-4', // 24px/32px horizontal, 12px/16px vertical
      minHeight: 'min-h-[48px] md:min-h-[52px]',
      borderRadius: 'rounded-xl', // 12px
      spinnerSize: 'h-5 w-5',
      spinnerMargin: '-ml-1 mr-3',
    },
    large: {
      fontSize: 'text-lg', // 18px - consistent across breakpoints
      padding: 'px-8 md:px-10 py-4 md:py-5', // 32px/40px horizontal, 16px/20px vertical
      minHeight: 'min-h-[56px] md:min-h-[60px]',
      borderRadius: 'rounded-2xl', // 16px
      spinnerSize: 'h-6 w-6',
      spinnerMargin: '-ml-1 mr-3',
    },
  };

  const currentSize = sizeConfig[size];

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
      className={`animate-spin ${currentSize.spinnerMargin} ${currentSize.spinnerSize} text-white`}
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
    inline-flex
    items-center
    justify-center
    text-center
    cursor-pointer
    ${currentSize.fontSize}
    font-semibold
    tracking-tight
    leading-none
    text-white 
    bg-bitcoin-button
    ${currentSize.borderRadius}
    ${currentSize.padding}
    ${currentSize.minHeight}
    mx-1
    border
    border-white/15
    button-ripple
    button-micro-bounce
    button-smooth-colors
    button-focus-ring
    will-change-transform
    hover:transform
    hover:-translate-y-1
    hover:scale-[1.02]
    active:translate-y-0
    active:scale-100
    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:transform-none
    disabled:hover:scale-100
    motion-reduce:transition-none
    motion-reduce:hover:transform-none
    motion-reduce:hover:scale-100
    motion-reduce:active:transform-none
    motion-reduce:active:scale-100
    motion-reduce:animation-none
    ${loading ? 'cursor-wait opacity-90 button-loading-glow' : ''}
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
        {loading && <LoadingSpinner />}
        <span className={loading ? 'opacity-70' : ''}>{children}</span>
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
      {loading && <LoadingSpinner />}
      <span className={loading ? 'opacity-70' : ''}>{children}</span>
    </button>
  );
};

export default Button;
