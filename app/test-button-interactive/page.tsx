'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function TestButtonInteractivePage() {
  const [count, setCount] = useState(0);

  return (
    <main className="min-h-screen bg-gray-100 p-16">
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Interactive Button Test</h2>
          <p className="mb-4">Count: {count}</p>
          <Button onClick={() => setCount(count + 1)}>Click to increment</Button>
        </div>
      </div>
    </main>
  );
}
