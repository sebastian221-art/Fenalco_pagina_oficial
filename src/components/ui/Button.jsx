import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick, 
  type = 'button',
  disabled = false,
  loading = false,
  icon,
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    secondary: 'btn-secondary',
    ghost: 'text-primary-500 hover:bg-primary-50'
  };

  const sizes = {
    sm: 'px-6 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={classes}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="spinner" />}
      {!loading && icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
