'use client';

import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  clean?: boolean; // If true, removes horizontal padding
}

export function Container({ children, className = '', clean = false }: ContainerProps) {
  return (
    <div className={`container mx-auto w-full ${clean ? 'px-0' : ''} ${className}`}>
      {children}
    </div>
  );
}
