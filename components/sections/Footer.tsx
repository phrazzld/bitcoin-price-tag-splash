import React from 'react';
import { GITHUB_URL, CHROME_STORE_URL } from '@/lib/constants';

export function Footer(): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-b from-background to-secondary/20 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg">
                <span className="text-lg font-bold text-primary-foreground">₿</span>
              </div>
              <span className="text-xl font-bold">Bitcoin Price Tag</span>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-md">
              Transform every purchase into Bitcoin awareness. See the real value of your money with
              instant Bitcoin conversions on every shopping site you visit.
            </p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-muted-foreground">50,000+ active users</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-semibold">4.9★</span>
                <span className="text-muted-foreground">Chrome Store</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Product</h3>
            <nav className="flex flex-col space-y-3">
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Chrome Extension
              </a>
              <a
                href="#features"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Features
              </a>
              <a
                href="#privacy"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy Policy
              </a>
            </nav>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Community</h3>
            <nav className="flex flex-col space-y-3">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                GitHub
              </a>
              <a
                href="#support"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Support
              </a>
              <a
                href="#changelog"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Changelog
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span>&copy; {currentYear} Bitcoin Price Tag</span>
              <span>•</span>
              <span>Free and open source</span>
              <span>•</span>
              <span>Privacy first</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xs text-muted-foreground">Made for the Bitcoin community</div>
              <div className="text-primary text-lg">₿</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
