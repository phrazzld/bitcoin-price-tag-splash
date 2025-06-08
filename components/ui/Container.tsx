import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12', className)}>
      {children}
    </div>
  );
};

export default Container;
