import React from 'react';
import { Info, AlertTriangle, ShieldAlert, AlertOctagon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const severityConfig = {
  low: {
    color: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    icon: Info,
    label: 'LOW'
  },
  medium: {
    color: 'text-warning bg-warning/10 border-warning/20',
    icon: AlertTriangle,
    label: 'MEDIUM'
  },
  high: {
    color: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
    icon: ShieldAlert,
    label: 'HIGH'
  },
  critical: {
    color: 'text-danger bg-danger/10 border-danger/20',
    icon: AlertOctagon,
    label: 'CRITICAL'
  }
};

/**
 * SeverityBadge - Standardized severity indicator.
 * @param {'low'|'medium'|'high'|'critical'} level - The severity level
 * @param {string} className
 */
export const SeverityBadge = ({ level = 'low', className }) => {
  const normalizedLevel = level.toLowerCase();
  const config = severityConfig[normalizedLevel] || severityConfig.low;
  const Icon = config.icon;

  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold tracking-wide',
      config.color,
      className
    )}>
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </div>
  );
};
