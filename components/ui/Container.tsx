import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        max-w-[1200px] 
        mx-auto 
        px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12
        backdrop-ultra-subtle
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
};

export default Container;
