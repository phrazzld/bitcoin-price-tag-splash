import Navigation from '@/components/Navigation';
import FeaturesSection from '@/components/sections/FeaturesSection';

export default function TestFeaturesSection(): React.ReactNode {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <FeaturesSection />
        <div className="p-8 text-center bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Features Section Test</h2>
          <p className="text-gray-600">
            The section should display 4 Bitcoin-focused feature cards in a responsive grid.
          </p>
          <p className="text-gray-600 mt-2">
            Large: 4 columns | Medium: 2 columns | Mobile: 1 column
          </p>
          <p className="text-gray-600 mt-2">
            Padding: Desktop 120px vertical | Mobile 64px vertical
          </p>
        </div>
      </main>
    </>
  );
}
