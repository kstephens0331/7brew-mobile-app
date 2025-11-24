import { ShoppingCart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { motion } from 'framer-motion';

interface HeaderProps {
  showCart?: boolean;
  showLocation?: boolean;
}

export const Header = ({ showCart = true, showLocation = true }: HeaderProps) => {
  const navigate = useNavigate();
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-40 bg-maroon text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 max-w-screen-xl mx-auto">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <img src="/logo.svg" alt="7 Brew" className="h-10 w-10" />
          <div className="font-script text-2xl">7 Brew</div>
        </motion.button>

        <div className="flex items-center gap-3">
          {showLocation && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/locations')}
              className="p-2 hover:bg-maroon-dark rounded-lg transition-colors"
            >
              <MapPin size={24} />
            </motion.button>
          )}

          {showCart && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/cart')}
              className="relative p-2 hover:bg-maroon-dark rounded-lg transition-colors"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-navy text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
};
