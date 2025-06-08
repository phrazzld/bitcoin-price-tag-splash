import React from 'react';
import { Button } from '@/components/ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-12">
          {/* Final CTA */}
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to see prices in Bitcoin?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Join 50,000+ users who think in Bitcoin
            </p>
            <Button size="lg" className="text-lg px-10 py-4 h-auto" asChild>
              <a
                href="https://chrome.google.com/webstore"
                target="_blank"
                rel="noopener noreferrer"
              >
                Add to Chrome - Free Forever
              </a>
            </Button>
          </div>

          {/* Footer Links */}
          <div className="pt-8 border-t">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">₿</span>
                </div>
                <span className="font-semibold text-foreground">Bitcoin Price Tag</span>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-foreground">
                  Terms
                </a>
                <a href="#" className="hover:text-foreground">
                  Support
                </a>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              © 2024 Bitcoin Price Tag. No data collected. Your privacy first.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
