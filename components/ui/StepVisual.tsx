'use client';

import React from 'react';

interface StepVisualProps {
  step: 1 | 2 | 3;
  className?: string;
}

const StepVisual: React.FC<StepVisualProps> = ({ step, className = '' }) => {
  if (step === 1) {
    // Chrome Installation Visual
    return (
      <div
        className={`relative w-full h-48 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-gray-100 overflow-hidden ${className}`}
      >
        {/* Chrome Browser Window */}
        <div className="absolute inset-4 bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Browser Header */}
          <div className="h-8 bg-gray-100 rounded-t-lg flex items-center px-3 gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 h-4 bg-gray-200 rounded ml-4"></div>
          </div>

          {/* Chrome Web Store Page */}
          <div className="p-4 space-y-3">
            {/* Extension Card */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-bitcoin-orange to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">₿</span>
              </div>
              <div className="flex-1">
                <div className="h-2 bg-gray-300 rounded w-24 mb-1"></div>
                <div className="h-1.5 bg-gray-200 rounded w-16"></div>
              </div>
            </div>

            {/* Install Button */}
            <div className="flex justify-center">
              <div className="bg-bitcoin-orange text-white px-4 py-2 rounded-lg text-sm font-medium animate-pulse">
                Add to Chrome
              </div>
            </div>
          </div>
        </div>

        {/* Floating Click Animation */}
        <div className="absolute bottom-6 right-6 w-4 h-4 bg-bitcoin-orange rounded-full animate-ping"></div>
      </div>
    );
  }

  if (step === 2) {
    // Shopping Website Visual
    return (
      <div
        className={`relative w-full h-48 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-gray-100 overflow-hidden ${className}`}
      >
        {/* E-commerce Website */}
        <div className="absolute inset-4 bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Website Header */}
          <div className="h-6 bg-gray-100 rounded-t-lg flex items-center px-3">
            <div className="h-2 bg-gray-300 rounded w-20"></div>
            <div className="ml-auto flex gap-1">
              <div className="w-2 h-2 bg-gray-300 rounded"></div>
              <div className="w-2 h-2 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="p-3 grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-gray-50 rounded-lg p-2 space-y-1">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-1.5 bg-gray-300 rounded w-12"></div>
                <div className="h-2 bg-green-500 rounded w-8 font-mono text-xs flex items-center justify-center text-white">
                  $99
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Badge */}
        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
          <div className="w-6 h-6 bg-gradient-to-br from-bitcoin-orange to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">₿</span>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    // Bitcoin Price Display Visual
    return (
      <div
        className={`relative w-full h-48 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-gray-100 overflow-hidden ${className}`}
      >
        {/* Product Page with Bitcoin Price */}
        <div className="absolute inset-4 bg-white rounded-lg shadow-lg border border-gray-200">
          {/* Page Header */}
          <div className="h-6 bg-gray-100 rounded-t-lg"></div>

          {/* Product with Price Display */}
          <div className="p-4 space-y-3">
            {/* Product Image */}
            <div className="h-16 bg-gray-200 rounded-lg"></div>

            {/* Price Section */}
            <div className="space-y-2">
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">$99.99</div>

                {/* Bitcoin Price Tag */}
                <div className="relative inline-block">
                  <div className="bg-gradient-to-r from-bitcoin-orange to-orange-600 text-white px-3 py-1 rounded-lg text-sm font-mono animate-pulse">
                    ₿ 0.00234584
                  </div>

                  {/* Tooltip Arrow */}
                  <div className="absolute -top-1 left-4 w-2 h-2 bg-bitcoin-orange transform rotate-45"></div>
                </div>
              </div>
            </div>

            {/* Live Update Indicator */}
            <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Live rates</span>
            </div>
          </div>
        </div>

        {/* Floating Update Animation */}
        <div className="absolute top-4 right-4 text-bitcoin-orange">
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
      </div>
    );
  }

  return null;
};

export default StepVisual;
