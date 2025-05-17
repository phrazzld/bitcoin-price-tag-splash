import StepCard from "@/components/StepCard";

export default function TestStepCardPage() {
  return (
    <div className="p-8 space-y-12">
      <h1 className="text-2xl font-bold mb-8">StepCard Component Test</h1>

      <div className="max-w-sm mx-auto">
        <StepCard
          stepNumber={1}
          screenshot="/placeholder-screenshot-1.jpg"
          description="Install the extension from Chrome Web Store with one click"
        />
      </div>

      <div className="max-w-sm mx-auto">
        <StepCard
          stepNumber={2}
          screenshot="/placeholder-screenshot-2.jpg"
          description="Browse any website and see prices automatically converted"
        />
      </div>

      <div className="max-w-sm mx-auto">
        <StepCard
          stepNumber={3}
          screenshot="/placeholder-screenshot-3.jpg"
          description="Click on prices to see real-time Bitcoin values"
        />
      </div>
    </div>
  );
}
