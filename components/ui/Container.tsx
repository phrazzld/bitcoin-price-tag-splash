import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`
        grid 
        grid-cols-12 
        gap-4 md:gap-6 
        max-w-[1200px] 
        mx-auto 
        px-4 md:px-6 
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
};

export default Container;
