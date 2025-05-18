"use client";

import ScrollReveal from "@/components/animation/ScrollReveal";

export default function TestScrollReveal() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Scroll Reveal Test</h1>
      
      <div className="space-y-32">
        <div className="h-[70vh] flex items-center justify-center bg-gray-100">
          <p className="text-2xl">Scroll down to see animations</p>
        </div>
        
        <ScrollReveal>
          <div className="p-8 bg-blue-50 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">First Section</h2>
            <p>This section will fade in from below as you scroll</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal yOffset={30} duration={0.3}>
          <div className="p-8 bg-green-50 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Second Section</h2>
            <p>This section has a larger offset and longer duration</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.1}>
          <div className="p-8 bg-purple-50 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Third Section</h2>
            <p>This section has a slight delay</p>
          </div>
        </ScrollReveal>
        
        <ScrollReveal>
          <div className="p-8 bg-orange-50 rounded-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Final Section</h2>
            <p>All animations respect prefers-reduced-motion</p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}