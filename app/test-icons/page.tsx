import Icon, { type IconName } from '@/components/ui/Icon';

const iconNames: IconName[] = [
  'check',
  'zap',
  'shield',
  'download',
  'star',
  'chevronRight',
  'globe',
  'dollarSign',
  'refreshCw',
];

export default function TestIconsPage(): React.ReactNode {
  return (
    <main className="min-h-screen bg-gray-100 p-16">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Default Icons (24px, 2px stroke)</h2>
          <div className="flex gap-4 items-center bg-white p-4 rounded">
            {iconNames.map((name) => (
              <div key={name} className="text-center">
                <Icon name={name} className="text-gray-700" />
                <p className="text-xs mt-2">{name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Large Icons (48px)</h2>
          <div className="flex gap-4 items-center bg-white p-4 rounded">
            {iconNames.slice(0, 5).map((name) => (
              <div key={name} className="text-center">
                <Icon name={name} size={48} className="text-bitcoin-orange" />
                <p className="text-xs mt-2">{name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Thin Icons (1px stroke)</h2>
          <div className="flex gap-4 items-center bg-white p-4 rounded">
            {iconNames.slice(0, 5).map((name) => (
              <div key={name} className="text-center">
                <Icon name={name} strokeWidth={1} className="text-gray-500" />
                <p className="text-xs mt-2">{name}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Thick Icons (3px stroke)</h2>
          <div className="flex gap-4 items-center bg-white p-4 rounded">
            {iconNames.slice(0, 5).map((name) => (
              <div key={name} className="text-center">
                <Icon name={name} strokeWidth={3} className="text-gray-900" />
                <p className="text-xs mt-2">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
