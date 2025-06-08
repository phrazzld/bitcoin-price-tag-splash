'use client';

import { useState, useEffect } from 'react';

const ONBOARDING_STORAGE_KEY = 'bitcoin-price-tag-onboarding-completed';

interface OnboardingState {
  isOnboardingComplete: boolean;
  showOnboardingModal: boolean;
  completeOnboarding: () => void;
  triggerOnboarding: () => void;
  dismissOnboarding: () => void;
}

/**
 * Hook to manage user onboarding state
 * Shows educational content for first-time visitors
 */
export function useOnboarding(): OnboardingState {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(true); // Default to true for SSR
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);

  useEffect(() => {
    // Check if onboarding was completed before
    const completed = localStorage.getItem(ONBOARDING_STORAGE_KEY) === 'true';
    setIsOnboardingComplete(completed);

    // Show onboarding for first-time visitors after a delay
    let timer: NodeJS.Timeout | null = null;
    if (!completed) {
      timer = setTimeout(() => {
        setShowOnboardingModal(true);
      }, 3000); // 3 second delay to let page load
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem(ONBOARDING_STORAGE_KEY, 'true');
    setIsOnboardingComplete(true);
    setShowOnboardingModal(false);
  };

  const triggerOnboarding = () => {
    setShowOnboardingModal(true);
  };

  const dismissOnboarding = () => {
    setShowOnboardingModal(false);
    // Don't mark as complete, user just dismissed this time
  };

  return {
    isOnboardingComplete,
    showOnboardingModal,
    completeOnboarding,
    triggerOnboarding,
    dismissOnboarding,
  };
}
