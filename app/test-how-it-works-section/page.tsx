import Navigation from '@/components/Navigation';
import HowItWorksSection from '@/components/sections/HowItWorksSection';

export default function TestHowItWorksSection() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <HowItWorksSection />
        <div className="p-8 text-center bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">How It Works Section Test</h2>
          <p className="text-gray-600">
            The section should display 3 step cards in a horizontal flow.
          </p>
          <p className="text-gray-600 mt-2">Desktop: Horizontal layout | Mobile: Vertical stack</p>
          <p className="text-gray-600 mt-2">
            Each step has a number, screenshot placeholder, and description.
          </p>
        </div>
      </main>
    </>
  );
}
