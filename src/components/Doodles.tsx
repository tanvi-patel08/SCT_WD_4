import React from 'react';

export const Tape = ({ className = '' }: { className?: string }) => (
  <div className={`absolute h-8 w-32 bg-white/40 backdrop-blur-sm shadow-sm border-l border-r border-white/60 rotate-[-3deg] z-10 pointer-events-none ${className}`} 
       style={{
         clipPath: 'polygon(2% 0%, 98% 0%, 100% 10%, 98% 20%, 100% 30%, 98% 40%, 100% 50%, 98% 60%, 100% 70%, 98% 80%, 100% 90%, 98% 100%, 2% 100%, 0% 90%, 2% 80%, 0% 70%, 2% 60%, 0% 50%, 2% 40%, 0% 30%, 2% 20%, 0% 10%)'
       }}
  />
);

export const StarDoodle = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`w-8 h-8 text-yellow-400 fill-current stroke-black stroke-2 ${className}`}>
    <path d="M50 5 L63 35 L95 35 L70 55 L80 85 L50 65 L20 85 L30 55 L5 35 L37 35 Z" strokeLinejoin="round" />
  </svg>
);

export const HeartDoodle = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`w-8 h-8 text-pink-400 fill-current stroke-black stroke-2 ${className}`}>
    <path d="M50 85 C50 85 10 55 10 30 C10 15 25 5 40 15 C45 20 50 30 50 30 C50 30 55 20 60 15 C75 5 90 15 90 30 C90 55 50 85 50 85 Z" strokeLinejoin="round" />
  </svg>
);

export const ArrowDoodle = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 50" className={`w-16 h-8 text-black stroke-current stroke-2 fill-none ${className}`}>
    <path d="M5 25 Q 50 5 90 25 M 80 15 L 90 25 L 80 35" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TinyStar = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 text-black fill-none stroke-current stroke-2 ${className}`}>
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinejoin="round" />
  </svg>
);
