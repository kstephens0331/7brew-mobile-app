import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses = 'font-bold rounded-2xl transition-all duration-300 relative overflow-hidden group';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-maroon to-maroon-dark text-white shadow-2xl shadow-maroon/30 hover:shadow-maroon/50 hover:from-maroon-dark hover:to-maroon border-2 border-maroon-dark/20',
    secondary: 'bg-gradient-to-r from-navy to-blue-900 text-white shadow-2xl shadow-navy/30 hover:shadow-navy/50 hover:from-blue-900 hover:to-navy',
    outline: 'bg-white/80 backdrop-blur-sm text-maroon border-2 border-maroon hover:bg-maroon hover:text-white hover:border-maroon-dark shadow-lg hover:shadow-xl',
    ghost: 'bg-transparent text-maroon hover:bg-maroon/10 backdrop-blur-sm',
  };

  const sizeClasses = {
    sm: 'py-2.5 px-5 text-sm',
    md: 'py-3.5 px-7 text-base',
    lg: 'py-4.5 px-9 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Shine effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

      {/* Glow pulse effect */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-current transition-opacity duration-500" />

      <span className="relative z-10 flex items-center justify-center">
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
};
