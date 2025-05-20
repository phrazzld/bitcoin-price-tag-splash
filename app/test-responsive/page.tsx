'use client';

import { useState } from 'react';

const breakpoints = [
  { name: 'Mobile S', width: 320 },
  { name: 'Mobile M', width: 375 },
  { name: 'Mobile L', width: 414 },
  { name: 'Tablet', width: 768 },
  { name: 'Desktop', width: 1024 },
  { name: 'Desktop L', width: 1280 },
  { name: 'Desktop XL', width: 1440 },
];

export default function TestResponsive(): React.ReactNode {
  const [currentWidth, setCurrentWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  return (
    <div className="p-4">
      <div className="fixed top-0 left-0 right-0 bg-white border-b p-4 z-50">
        <h1 className="text-2xl font-bold mb-4">Responsive Test Page</h1>
        <div className="flex flex-wrap gap-2">
          {breakpoints.map((bp) => (
            <button
              key={bp.width}
              onClick={() => setCurrentWidth(bp.width)}
              className={`px-4 py-2 rounded ${
                currentWidth === bp.width
                  ? 'bg-bitcoin-orange text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {bp.name} ({bp.width}px)
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentWidth(typeof window !== 'undefined' ? window.innerWidth : 1024)
            }
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Current ({typeof window !== 'undefined' ? window.innerWidth : 1024}px)
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600">Current viewport: {currentWidth}px</p>
      </div>

      <div className="mt-32">
        <iframe
          src="/"
          width={currentWidth}
          height="800"
          className="mx-auto border border-gray-300"
          style={{ maxWidth: '100%' }}
        />
      </div>
    </div>
  );
}
