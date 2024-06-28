import React from 'react';
import './style.css';
import { motion } from 'framer-motion';

export const Button = ({ text, onClick, disabled }) => {
  const buttonVariants = {
    enabled: {
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
    disabled: {
      scale: 1,
    },
  };

  return (
    <motion.button
      className="button"
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      initial={disabled ? 'disabled' : 'enabled'}
      animate="enabled"
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {text}
    </motion.button>
  );
};
