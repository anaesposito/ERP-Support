import React from 'react';
import { Priority } from '../types/erp';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priority;
  size?: 'sm' | 'md' | 'lg';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const config = {
    baja: {
      label: 'Prioridad Baja',
      icon: CheckCircle,
      bg: 'bg-[#8ADCAE]/20 text-[#267B7E] border-[#8ADCAE]/60 ring-[#8ADCAE]/30',
      dot: 'bg-[#3A9898]',
    },
    media: {
      label: 'Prioridad Media',
      icon: AlertTriangle,
      bg: 'bg-amber-50 text-amber-800 border-amber-300 ring-amber-600/20',
      dot: 'bg-amber-500',
    },
    alta: {
      label: 'Prioridad Alta',
      icon: AlertCircle,
      bg: 'bg-[#F08A78]/20 text-[#9E3926] border-[#F08A78]/60 ring-[#F08A78]/30',
      dot: 'bg-[#F08A78] animate-pulse',
    },
  }[priority] || {
    label: 'Prioridad Media',
    icon: AlertTriangle,
    bg: 'bg-amber-50 text-amber-800 border-amber-300 ring-amber-600/20',
    dot: 'bg-amber-500',
  };

  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-sm px-3 py-1 gap-2',
    lg: 'text-base px-3.5 py-1.5 gap-2.5 font-semibold',
  }[size];

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium border ring-1 ring-inset ${config.bg} ${sizeClasses}`}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      <Icon className={iconSizes} />
      <span>{config.label}</span>
    </span>
  );
};
