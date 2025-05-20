import Button from '@/components/ui/Button';

export default function TestButtonPage(): React.ReactNode {
  return (
    <main className="min-h-screen bg-gray-100 p-16">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Primary Button</h2>
          <Button>Add to Chrome</Button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Button with Custom Class</h2>
          <Button className="uppercase">Download Extension</Button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Disabled Button</h2>
          <Button disabled>Coming Soon</Button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Button with onClick</h2>
          <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Multiple Buttons</h2>
          <div className="flex gap-4">
            <Button>Primary</Button>
            <Button>Secondary</Button>
            <Button>Tertiary</Button>
          </div>
        </div>
      </div>
    </main>
  );
}
