import { Home, Coffee, Award, Clock, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'menu', label: 'Menu', icon: Coffee, path: '/menu' },
  { id: 'rewards', label: 'Rewards', icon: Award, path: '/rewards' },
  { id: 'orders', label: 'Orders', icon: Clock, path: '/orders' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
];

export const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-xl mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 h-full relative"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                <Icon
                  size={24}
                  className={clsx(
                    'transition-colors duration-150',
                    isActive ? 'text-maroon' : 'text-gray-500'
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={clsx(
                    'text-xs mt-1 font-medium transition-colors duration-150',
                    isActive ? 'text-maroon' : 'text-gray-500'
                  )}
                >
                  {item.label}
                </span>
              </motion.div>

              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-maroon rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
