import React from "react";
import Container from "./ui/Container";

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-sm z-50">
      <Container>
        <div className="flex items-center justify-between h-full">
          <div>
            {/* Logo placeholder */}
            <span className="font-bold text-lg">Bitcoin Price Tag</span>
          </div>
          <div>
            {/* Download CTA placeholder */}
            <span>Download CTA</span>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
