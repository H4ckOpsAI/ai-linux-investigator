import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const variantStyles = {
  default: 'bg-surface/60 border-white/10 hover:border-white/20 hover:bg-surface/80',
  elevated: 'bg-surface/80 border-primary/30 shadow-[0_0_20px_rgba(99,102,241,0.15)] hover:shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:border-primary/50',
  danger: 'bg-danger/5 border-danger/20 hover:bg-danger/10 hover:border-danger/40',
  success: 'bg-success/5 border-success/20 hover:bg-success/10 hover:border-success/40'
};

const animations = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

/**
 * GlassCard - Premium reusable container component.
 * @param {React.ReactNode} children
 * @param {string} className
 * @param {'default'|'elevated'|'danger'|'success'} variant
 */
export const GlassCard = ({ children, className, variant = 'default', ...props }) => {
  return (
    <motion.div
      variants={animations}
      initial="hidden"
      animate="visible"
      className={cn(
        'backdrop-blur-md border rounded-card transition-all duration-300 ease-out',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
