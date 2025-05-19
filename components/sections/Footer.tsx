import React from "react";
import Container from "../ui/Container";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 text-gray-500">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6" style={{ fontSize: "0.875rem" }}>
          <span>&copy; {currentYear} Bitcoin Price Tag</span>
          <a 
            href="https://github.com/bitcoin-price-tag/extension"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-bitcoin-orange transition-colors"
          >
            GitHub
          </a>
          <a 
            href="/privacy"
            className="hover:text-bitcoin-orange transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;