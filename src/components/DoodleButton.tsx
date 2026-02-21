import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface DoodleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
  icon?: LucideIcon;
  label?: string;
}

export const DoodleButton: React.FC<DoodleButtonProps> = ({ 
  variant = 'primary', 
  icon: Icon, 
  label, 
  className = '', 
  children,
  ...props 
}) => {
  const baseStyles = "font-marker tracking-wide px-4 py-2 transition-shadow duration-200 flex items-center justify-center gap-2 relative group";
  
  const variants = {
    primary: "bg-sky-300 text-black border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm",
    secondary: "bg-yellow-200 text-black border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm",
    success: "bg-green-300 text-black border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm",
    danger: "bg-red-300 text-black border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-sm",
    ghost: "bg-transparent text-gray-600 hover:text-black",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={variant === 'ghost' ? { scale: 1.1, rotate: [-3, 3, -3, 0] } : { scale: 1.05, y: -4 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 10,
        rotate: { type: "keyframes", duration: 0.4 } 
      }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={20} strokeWidth={2.5} />}
      {label || children}
    </motion.button>
  );
};
