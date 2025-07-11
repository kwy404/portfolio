'use client';

import React from 'react';

interface BackgroundProps {
  deviceType: 'desktop' | 'mobile';
  children?: React.ReactNode;
  background: string;
}

const Background: React.FC<BackgroundProps> = ({ deviceType, children, background }) => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url("${background}")`,
      }}
    >
      <div className="absolute top-5 left-5 text-white text-shadow-md md:text-4xl text-xl font-semibold">
      </div>
      {children}
    </div>
  );
};

export default Background;