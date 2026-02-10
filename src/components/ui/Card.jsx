import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  padding = 'md',
  ...props 
}) => {
  const paddingSizes = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const baseClasses = 'card';
  const hoverClasses = hover ? 'card-hover' : '';
  const classes = `${baseClasses} ${hoverClasses} ${paddingSizes[padding]} ${className}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={classes}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
