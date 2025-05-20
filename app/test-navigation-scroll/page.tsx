'use client';

import Navigation from '@/components/Navigation';

export default function TestNavigationScroll() {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <div className="min-h-screen bg-gray-100 p-8">
          <h1 className="text-4xl font-bold mb-8">Navigation Test Page</h1>
          <p className="mb-4">This page tests the Navigation component with scrollable content.</p>

          {/* Create lots of content to enable scrolling */}
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="p-4 mb-4 bg-white rounded shadow">
              <h2 className="text-xl font-semibold mb-2">Section {i + 1}</h2>
              <p>
                This is content section {i + 1}. The navigation should remain fixed at the top while
                scrolling.
              </p>
              <p>
                The backdrop blur effect should be visible when this content passes behind the
                navigation.
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
