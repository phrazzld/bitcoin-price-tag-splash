import Navigation from '@/components/Navigation';

export default function TestNavigationPage() {
  return (
    <div>
      <Navigation />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Navigation Component Test</h1>
        <p className="mb-4">The navigation component is displayed above.</p>
        <div className="h-screen bg-gray-100 p-8">
          <p>Scroll content to test navigation positioning (will be fixed in T011)</p>
        </div>
      </div>
    </div>
  );
}
