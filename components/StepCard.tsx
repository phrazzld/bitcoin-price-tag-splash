import React from "react";
import Image from "next/image";

interface StepCardProps {
  stepNumber: number;
  screenshot: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  screenshot,
  description,
}) => {
  return (
    <div className="text-center">
      <div className="text-7xl font-bold text-gray-700 mb-6">{stepNumber}</div>
      <div className="border border-gray-300 rounded-none mb-4 relative aspect-video">
        <Image
          src={screenshot}
          alt={`Step ${stepNumber} screenshot`}
          fill
          className="object-contain"
        />
      </div>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};

export default StepCard;
