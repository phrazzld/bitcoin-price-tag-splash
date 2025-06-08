import React from 'react';
import { Button } from '@/components/ui/button';
import { CHROME_STORE_URL } from '@/lib/constants';

export function Navigation(): React.ReactElement {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur px-4">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">₿</span>
          </div>
          <span className="font-semibold">Bitcoin Price Tag</span>
        </div>

        <Button asChild size="sm">
          <a href={CHROME_STORE_URL}>Add to Chrome</a>
        </Button>
      </div>
    </header>
  );
}
