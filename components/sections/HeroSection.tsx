import React from "react";
import Container from "../ui/Container";
import Button from "../ui/Button";
import styles from "./HeroSection.module.css";

const HeroSection: React.FC = () => {
  return (
    <section
      className="flex items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <Container>
        <div className="max-w-[800px] mx-auto text-center">
          <h1 
            className="font-bold mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: "1.2" }}
          >
            See Bitcoin prices everywhere
          </h1>
          <div className={styles.conversionAnimation}>
            <span className={`${styles.priceValue} ${styles.usdPrice}`}>$99.99</span>
            <span className={`${styles.priceValue} ${styles.btcPrice}`}>0.00234584 BTC</span>
          </div>
          <p className="text-lg mb-12 text-gray-700">
            Convert any price to Bitcoin automatically
          </p>
          <Button>Add to Chrome</Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;