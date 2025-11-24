import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const Card = ({ children, className, onClick, interactive = false }: CardProps) => {
  const baseClasses = 'bg-white rounded-2xl shadow-md p-4';

  if (interactive || onClick) {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={clsx(baseClasses, 'cursor-pointer', className)}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={clsx(baseClasses, className)}>{children}</div>;
};
