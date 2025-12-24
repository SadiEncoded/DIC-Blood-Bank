'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  clean?: boolean; // If true, removes horizontal padding
}

export function Container({ children, className = '', clean = false }: ContainerProps) {
  return (
    <div className={`max-w-7xl mx-auto ${clean ? '' : 'px-6 md:px-8'} w-full ${className}`}>
      {children}
    </div>
  );
}
