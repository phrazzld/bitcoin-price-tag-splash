import React from "react";
import Container from "./ui/Container";
import Button from "./ui/Button";

const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <Container>
        <div className="col-span-12 flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-bitcoin-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-base">₿</span>
            </div>
            <span className="font-bold text-lg text-gray-900">Bitcoin Price Tag</span>
          </div>
          <div>
            <Button className="px-5 py-2.5 font-medium">Add to Chrome</Button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navigation;
