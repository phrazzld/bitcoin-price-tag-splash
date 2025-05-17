import Button from "@/components/ui/Button";

export default function TestButtonSimplePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-16">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Primary Button</h2>
          <Button>Add to Chrome</Button>
        </div>
      </div>
    </main>
  );
}
