import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';

export default function TestHeroAnimation(): React.ReactNode {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation />
      <HeroSection />
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-4">Animation Test Page</h2>
        <p className="text-gray-600">
          The animation above should show a continuous loop of typing &quot;$99.99&quot;, holding,
          deleting, then typing &quot;0.00234584 BTC&quot;, holding, and deleting.
        </p>
        <p className="text-gray-600 mt-2">
          Test with &quot;prefers-reduced-motion&quot; enabled to verify accessibility.
        </p>
      </div>
    </div>
  );
}
