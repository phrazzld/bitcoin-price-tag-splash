export default function TestTailwind(): React.ReactNode {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Tailwind Config & Font Test</h1>

      {/* Test bitcoin-orange color */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Bitcoin Orange Test</h2>
        <div className="bg-bitcoin-orange text-white p-4 rounded">
          This should be Bitcoin orange (#F7931A)
        </div>
        <div className="mt-2 text-sm font-mono">bg-bitcoin-orange → #F7931A</div>
      </div>

      {/* Test gray scale */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Gray Scale Test</h2>
        <div className="space-y-2">
          <div className="bg-gray-100 p-2 rounded">Gray 100 - should be #F8F8F8</div>
          <div className="bg-gray-300 p-2 rounded">Gray 300 - should be #E0E0E0</div>
          <div className="bg-gray-500 text-white p-2 rounded">Gray 500 - should be #9E9E9E</div>
          <div className="bg-gray-700 text-white p-2 rounded">Gray 700 - should be #616161</div>
          <div className="bg-gray-900 text-white p-2 rounded">Gray 900 - should be #212121</div>
        </div>
      </div>

      {/* Test custom spacing */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Custom Spacing Test</h2>
        <div className="space-y-4">
          <div className="bg-gray-300 p-4">
            <div className="bg-bitcoin-orange text-white px-18 py-4">
              px-18: 4.5rem horizontal padding
            </div>
          </div>
          <div className="bg-gray-300 p-4">
            <div className="bg-bitcoin-orange text-white h-10 w-88">w-88: 22rem width</div>
          </div>
          <div className="bg-gray-300 p-4">
            <div className="bg-bitcoin-orange text-white h-10 w-120">w-120: 30rem width</div>
          </div>
        </div>
      </div>

      {/* Test font family */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Font Family Test</h2>
        <p className="font-sans text-lg">
          This text should be using Inter Variable font as the default sans-serif.
        </p>
        <p className="text-sm text-gray-600 mt-2">font-sans → Inter Variable, sans-serif</p>
        <p className="text-sm text-gray-600">
          All text on the page should be using Inter Variable font by default.
        </p>
      </div>

      {/* Font Weights Test */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Inter Variable Font Weights</h2>
        <div className="space-y-2">
          <p className="font-thin">Thin - Inter Variable 100</p>
          <p className="font-light">Light - Inter Variable 300</p>
          <p className="font-normal">Regular - Inter Variable 400</p>
          <p className="font-medium">Medium - Inter Variable 500</p>
          <p className="font-semibold">Semibold - Inter Variable 600</p>
          <p className="font-bold">Bold - Inter Variable 700</p>
          <p className="font-extrabold">Extra Bold - Inter Variable 800</p>
          <p className="font-black">Black - Inter Variable 900</p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-12 p-4 border-2 border-bitcoin-orange rounded">
        <h2 className="text-xl font-semibold mb-2">Configuration Summary</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>✓ Bitcoin orange color (#F7931A) available as bg-bitcoin-orange</li>
          <li>✓ Gray scale colors (100, 300, 500, 700, 900) configured</li>
          <li>✓ Custom spacing values (18, 88, 120) available</li>
          <li>✓ Inter Variable font imported and set as default sans font</li>
          <li>✓ Global CSS cleaned up for minimal Tailwind-controlled styling</li>
        </ul>
      </div>
    </div>
  );
}
