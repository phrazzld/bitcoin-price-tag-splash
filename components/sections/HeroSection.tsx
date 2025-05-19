import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import styles from "./HeroSection.module.css";

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
      
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #000000 0px, #000000 1px, transparent 1px, transparent 80px),
                         repeating-linear-gradient(-45deg, #000000 0px, #000000 1px, transparent 1px, transparent 80px)`
      }} />
      
      <Container className="relative z-10">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 
            className="font-bold mb-8 text-gray-900"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", lineHeight: "1.1" }}
          >
            See Bitcoin prices
            <span className="text-bitcoin-orange"> everywhere</span>
          </h1>
          
          <div className="relative inline-block">
            <div className={styles.conversionContainer}>
              <div className={styles.conversionAnimation}>
                <span className={`${styles.priceValue} ${styles.usdPrice}`}>$99.99</span>
                <span className={`${styles.priceValue} ${styles.btcPrice}`}>0.00234584 BTC</span>
              </div>
              <div className={styles.conversionArrow}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 20L25 14L31 20L25 26L25 20ZM15 20L15 26L9 20L15 14L15 20Z" fill="#F7931A" fillOpacity="0.6"/>
                </svg>
              </div>
            </div>
          </div>
          
          <p className="mb-10 md:mb-12 text-gray-600 px-4 md:px-0 text-lg" style={{ lineHeight: "1.6" }}>
            Convert any price to Bitcoin automatically while you browse
          </p>
          
          <Button className="px-8 py-4 text-lg font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
            Add to Chrome
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;