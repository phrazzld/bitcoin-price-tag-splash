import Navigation from '@/components/Navigation';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function TestTestimonialsSection(): React.ReactNode {
  return (
    <>
      <Navigation />
      <main className="pt-16">
        <div className="bg-gray-100">
          <TestimonialsSection />
        </div>
        <div className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Testimonials Section Test</h2>
          <p className="text-gray-600">The gray background helps visualize the section padding.</p>
          <p className="text-gray-600 mt-2">
            Desktop: 120px vertical padding | Mobile: 64px vertical padding
          </p>
          <p className="text-gray-600 mt-2">Content should be centered within the section.</p>
        </div>
      </main>
    </>
  );
}
