import Navigation from '@/components/Navigation';
import HowItWorksSection from '@/components/sections/HowItWorksSection';

export default function TestHowItWorksSection(): React.ReactNode {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <HowItWorksSection />
        <div className="p-8 text-center bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">How It Works Section Test</h2>
          <p className="text-gray-600">
            The section should display 3 simplified step cards: Install → Browse → See prices.
          </p>
          <p className="text-gray-600 mt-2">Desktop: 3 columns | Mobile: Vertical stack</p>
          <p className="text-gray-600 mt-2">
            Features section heading and clear, concise step descriptions for easy onboarding.
          </p>
        </div>
      </main>
    </>
  );
}
