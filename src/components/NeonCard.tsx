import React from 'react';

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'pink' | 'green';
  intensity?: 'low' | 'medium' | 'high';
}

export const NeonCard: React.FC<NeonCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  intensity = 'medium'
}) => {
  const glowClasses = {
    cyan: {
      low: 'shadow-lg shadow-cyan-500/10 border-cyan-500/20',
      medium: 'shadow-xl shadow-cyan-500/20 border-cyan-500/30',
      high: 'shadow-2xl shadow-cyan-500/30 border-cyan-500/50'
    },
    purple: {
      low: 'shadow-lg shadow-purple-500/10 border-purple-500/20',
      medium: 'shadow-xl shadow-purple-500/20 border-purple-500/30',
      high: 'shadow-2xl shadow-purple-500/30 border-purple-500/50'
    },
    pink: {
      low: 'shadow-lg shadow-pink-500/10 border-pink-500/20',
      medium: 'shadow-xl shadow-pink-500/20 border-pink-500/30',
      high: 'shadow-2xl shadow-pink-500/30 border-pink-500/50'
    },
    green: {
      low: 'shadow-lg shadow-green-500/10 border-green-500/20',
      medium: 'shadow-xl shadow-green-500/20 border-green-500/30',
      high: 'shadow-2xl shadow-green-500/30 border-green-500/50'
    }
  };

  return (
    <div className={`
      bg-gray-900/80 backdrop-blur-sm border rounded-2xl transition-all duration-300 hover:scale-[1.02]
      ${glowClasses[glowColor][intensity]}
      ${className}
    `}>
      {children}
    </div>
  );
};