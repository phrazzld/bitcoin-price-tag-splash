import React from "react";
import Icon, { type IconName } from "./ui/Icon";

interface FeatureCardProps {
  icon: IconName;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="text-left">
      <div className="mb-4">
        <Icon name={icon} className="text-gray-800" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2" style={{ fontSize: "1.5rem", lineHeight: "1.2" }}>{title}</h3>
      <p className="text-gray-600" style={{ fontSize: "1rem", lineHeight: "1.6" }}>{description}</p>
    </div>
  );
};

export default FeatureCard;
