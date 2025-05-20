import FeatureCard from '@/components/FeatureCard';

export default function TestFeatureCardPage(): React.ReactNode {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-8">FeatureCard Component Test</h1>

      <div className="max-w-sm">
        <FeatureCard
          icon="zap"
          title="Instant conversion"
          description="See Bitcoin prices instantly as you browse - no clicking or typing needed"
        />
      </div>

      <div className="max-w-sm">
        <FeatureCard
          icon="globe"
          title="Works everywhere"
          description="Compatible with all shopping sites and price displays across the web"
        />
      </div>

      <div className="max-w-sm">
        <FeatureCard
          icon="refreshCw"
          title="Always current"
          description="Real-time Bitcoin prices updated every minute from reliable sources"
        />
      </div>
    </div>
  );
}
