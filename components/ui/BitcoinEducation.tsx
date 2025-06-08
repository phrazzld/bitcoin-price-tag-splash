'use client';

import React from 'react';

interface BitcoinEducationProps {
  variant?: 'full' | 'tooltip' | 'onboarding';
}

const BitcoinEducation: React.FC<BitcoinEducationProps> = ({ variant = 'full' }) => {
  if (variant === 'tooltip') {
    return (
      <div className="text-left">
        <p className="text-white text-sm mb-2 font-medium">
          Bitcoin is digital money that works everywhere
        </p>
        <p className="text-gray-200 text-xs">
          Think of it like cash for the internet - no banks required, works 24/7 globally.
        </p>
      </div>
    );
  }

  if (variant === 'onboarding') {
    return (
      <div className="space-y-4">
        <div className="bg-bitcoin-orange/5 border border-bitcoin-orange/20 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Why see prices in Bitcoin?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-bitcoin-orange font-bold mt-0.5">•</span>
              <span>
                <strong>True cost awareness:</strong> See the real value of purchases
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bitcoin-orange font-bold mt-0.5">•</span>
              <span>
                <strong>Global perspective:</strong> Compare prices worldwide instantly
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bitcoin-orange font-bold mt-0.5">•</span>
              <span>
                <strong>Future-focused:</strong> Think in terms of digital money
              </span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            The extension works automatically - no setup required!
          </p>
        </div>
      </div>
    );
  }

  // Full variant for modal
  return (
    <div className="space-y-6">
      {/* What is Bitcoin */}
      <div>
        <h3 className="typography-title text-gray-900 mb-3">What is Bitcoin?</h3>
        <div className="space-y-3 text-gray-700">
          <p>
            Bitcoin is <strong>digital money</strong> that works like cash for the internet.
            It&apos;s the first currency that works the same way everywhere in the world, 24 hours a
            day, without needing banks or governments.
          </p>
          <p>
            Unlike traditional money, Bitcoin has a <strong>limited supply</strong> - only 21
            million will ever exist. This makes it valuable and helps protect against inflation.
          </p>
        </div>
      </div>

      {/* Why Bitcoin matters */}
      <div>
        <h3 className="typography-title text-gray-900 mb-3">Why does Bitcoin matter?</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">🌍 Global Money</h4>
            <p className="text-sm text-green-700">
              Works the same in every country - no exchange rates or international fees.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">🔒 You Control It</h4>
            <p className="text-sm text-blue-700">
              Your Bitcoin is truly yours - no bank can freeze it or take it away.
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">📈 Store of Value</h4>
            <p className="text-sm text-purple-700">
              Many people use Bitcoin to save money and protect against inflation.
            </p>
          </div>
        </div>
      </div>

      {/* How this extension helps */}
      <div>
        <h3 className="typography-title text-gray-900 mb-3">How this extension helps</h3>
        <div className="bg-bitcoin-orange/5 border border-bitcoin-orange/20 rounded-lg p-4">
          <p className="text-gray-700 mb-3">
            <strong>Bitcoin Price Tag</strong> helps you understand the real cost of things by
            showing prices in Bitcoin alongside regular money.
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-bitcoin-orange font-bold mt-0.5">✓</span>
              <span>See any price in Bitcoin instantly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bitcoin-orange font-bold mt-0.5">✓</span>
              <span>Always uses live, up-to-date exchange rates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bitcoin-orange font-bold mt-0.5">✓</span>
              <span>Works on thousands of shopping websites</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bitcoin-orange font-bold mt-0.5">✓</span>
              <span>Completely private - no data collected</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Getting started */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm text-gray-600 text-center">
          <strong>New to Bitcoin?</strong> Start by just observing prices. You don&apos;t need to
          buy Bitcoin to benefit from understanding its value.
        </p>
      </div>
    </div>
  );
};

export default BitcoinEducation;
