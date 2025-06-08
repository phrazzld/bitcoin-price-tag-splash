import React from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-xl">₿</span>
          </div>
          <span className="font-semibold text-xl text-foreground">Bitcoin Price Tag</span>
        </div>

        <Button size="lg" asChild>
          <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer">
            Add to Chrome
          </a>
        </Button>
      </div>
    </header>
  );
}
