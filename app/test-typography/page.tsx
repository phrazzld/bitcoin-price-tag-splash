"use client";

import React from "react";
import Container from "@/components/ui/Container";

export default function TestTypography() {
  return (
    <div className="py-8">
      <Container>
        <div className="space-y-8">
          <div>
            <p className="text-gray-500 mb-2">H1 with fluid sizing (resize window to test):</p>
            <h1 
              className="font-bold text-gray-900"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.2" }}
            >
              Bitcoin Price Tag H1 Example
            </h1>
          </div>
          
          <div>
            <p className="text-gray-500 mb-2">H2 (2.25rem / 36px):</p>
            <h2 
              className="font-bold text-gray-900"
              style={{ fontSize: "2.25rem", lineHeight: "1.2" }}
            >
              Features Section H2 Example
            </h2>
          </div>
          
          <div>
            <p className="text-gray-500 mb-2">H3 (1.5rem / 24px):</p>
            <h3 
              className="font-semibold text-gray-900"
              style={{ fontSize: "1.5rem", lineHeight: "1.2" }}
            >
              Feature Card H3 Example
            </h3>
          </div>
          
          <div>
            <p className="text-gray-500 mb-2">Body text (1rem / 16px):</p>
            <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
              This is body text used throughout the application. It maintains readability
              and follows the design system specifications. The line height is set to 1.6
              for optimal reading comfort.
            </p>
          </div>
          
          <div>
            <p className="text-gray-500 mb-2">Small text (0.875rem / 14px):</p>
            <p style={{ fontSize: "0.875rem" }}>
              This is small text used in areas like footer, metadata, and secondary information.
            </p>
          </div>
          
          <div className="mt-12 p-6 bg-gray-100">
            <h3 className="font-semibold mb-4">Typography Scale Reference:</h3>
            <ul className="space-y-1">
              <li>H1: 3.5rem (56px) with fluid sizing: clamp(2rem, 5vw, 3.5rem)</li>
              <li>H2: 2.25rem (36px)</li>
              <li>H3: 1.5rem (24px)</li>
              <li>Body: 1rem (16px)</li>
              <li>Small: 0.875rem (14px)</li>
              <li>Header line-height: 1.2</li>
              <li>Body line-height: 1.6</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}