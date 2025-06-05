'use client';

import React from 'react';
import Container from '@/components/ui/Container';

export default function TestTypography(): React.ReactNode {
  return (
    <div className="py-8">
      <Container>
        <div className="space-y-12">
          <div className="space-y-8">
            <h1 className="typography-display text-gray-900 mb-8">Typography System</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Semantic Typography Composites */}
              <div className="space-y-6">
                <h2 className="typography-headline text-gray-900 mb-4">Semantic Typography</h2>

                <div>
                  <p className="typography-caption text-gray-500 mb-2">Display (Large hero text)</p>
                  <h1 className="typography-display text-gray-900">Display Headline</h1>
                </div>

                <div>
                  <p className="typography-caption text-gray-500 mb-2">
                    Headline (Section headers)
                  </p>
                  <h2 className="typography-headline text-gray-900">Section Headline</h2>
                </div>

                <div>
                  <p className="typography-caption text-gray-500 mb-2">
                    Title (Card titles, subsections)
                  </p>
                  <h3 className="typography-title text-gray-900">Content Title</h3>
                </div>

                <div>
                  <p className="typography-caption text-gray-500 mb-2">
                    Body Large (Important descriptions)
                  </p>
                  <p className="typography-body-large text-gray-600">
                    This is large body text for important descriptions and introductory content that
                    needs more emphasis.
                  </p>
                </div>

                <div>
                  <p className="typography-caption text-gray-500 mb-2">Body (Standard content)</p>
                  <p className="typography-body text-gray-600">
                    This is standard body text used throughout the application. It maintains
                    readability and follows the design system specifications for optimal reading
                    comfort.
                  </p>
                </div>

                <div>
                  <p className="typography-caption text-gray-500 mb-2">
                    Caption (Labels, metadata)
                  </p>
                  <p className="typography-caption text-gray-500">
                    Caption text for labels, metadata, and secondary information.
                  </p>
                </div>
              </div>

              {/* Typography Scale */}
              <div className="space-y-6">
                <h2 className="typography-headline text-gray-900 mb-4">Typography Scale</h2>

                <div className="space-y-4">
                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-7xl (72px)</p>
                    <div className="text-7xl font-black text-gray-800">Aa</div>
                  </div>

                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-6xl (60px)</p>
                    <div className="text-6xl font-bold text-gray-800">Aa</div>
                  </div>

                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-5xl (48px)</p>
                    <div className="text-5xl font-bold text-gray-800">Aa</div>
                  </div>

                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-4xl (36px)</p>
                    <div className="text-4xl font-semibold text-gray-800">Aa</div>
                  </div>

                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-3xl (30px)</p>
                    <div className="text-3xl font-semibold text-gray-800">Aa</div>
                  </div>

                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-2xl (24px)</p>
                    <div className="text-2xl font-medium text-gray-800">Aa</div>
                  </div>

                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-xl (20px)</p>
                    <div className="text-xl font-normal text-gray-800">Aa</div>
                  </div>

                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-lg (18px)</p>
                    <div className="text-lg font-normal text-gray-800">Aa</div>
                  </div>

                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-base (16px)</p>
                    <div className="text-base font-normal text-gray-800">Aa</div>
                  </div>

                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-sm (14px)</p>
                    <div className="text-sm font-normal text-gray-800">Aa</div>
                  </div>

                  <div>
                    <p className="typography-caption text-gray-500 mb-1">text-xs (12px)</p>
                    <div className="text-xs font-normal text-gray-800">Aa</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="typography-title text-gray-900 mb-4">
                Typography System Documentation
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">8-Point Grid System</h4>
                  <p className="typography-body text-gray-600">
                    Font sizes follow the 8-point grid system with sizes: 12px, 14px, 16px, 18px,
                    20px, 24px, 30px, 36px, 48px, 60px, 72px
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Line Heights</h4>
                  <ul className="typography-body text-gray-600 space-y-1">
                    <li>• Headers: 1.15 (tight) for large display text</li>
                    <li>• Titles: 1.25 (snug) for section headers</li>
                    <li>• Body: 1.5 (normal) for standard reading</li>
                    <li>• Large Body: 1.625 (relaxed) for emphasis</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Font Weights</h4>
                  <ul className="typography-body text-gray-600 space-y-1">
                    <li>• Normal (400): Body text</li>
                    <li>• Medium (500): Captions and labels</li>
                    <li>• Semibold (600): Titles and important text</li>
                    <li>• Bold (700): Section headers</li>
                    <li>• Extrabold (800): Accent text</li>
                    <li>• Black (900): Hero display text</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Responsive Behavior</h4>
                  <p className="typography-body text-gray-600">
                    Semantic composites (.typography-*) automatically scale up on larger screens
                    (768px+) for optimal readability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
