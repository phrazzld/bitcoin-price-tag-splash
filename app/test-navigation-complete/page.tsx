import Navigation from "@/components/Navigation";

export default function TestNavigationCompletePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      <main className="pt-16 p-8">
        <div className="space-y-8">
          <h1 className="text-3xl font-bold">Test Navigation Complete</h1>
          <p>This page tests the Navigation component with logo and CTA button.</p>
          <div className="h-[2000px] bg-gray-200 p-4">
            <p>Scroll to test fixed navigation</p>
          </div>
        </div>
      </main>
    </div>
  );
}