import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, Zap, Blend, MapPin, ChevronRight } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { PointsTracker } from '../components/ui/PointsTracker';
import { useUserStore } from '../stores/userStore';
import { getFeaturedDrinks } from '../data/menu';

const categories = [
  { id: 'coffee', name: 'Coffee', icon: Coffee, color: 'bg-amber-100 text-amber-700' },
  { id: 'energy', name: 'Energy', icon: Zap, color: 'bg-blue-100 text-blue-700' },
  { id: 'smoothies', name: 'Smoothies', icon: Blend, color: 'bg-pink-100 text-pink-700' },
];

export const Home = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const featuredDrinks = getFeaturedDrinks();

  return (
    <div className="min-h-screen bg-cream pb-20">
      <Header showCart showLocation />

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-heading font-bold text-maroon mb-2">
            WELCOME {user?.firstName.toUpperCase()}!
          </h1>
          <p className="text-gray-600">Ready for your next brew?</p>
        </motion.div>

        {/* Points Tracker */}
        {user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PointsTracker showFreeDrinkGoal />
          </motion.div>
        )}

        {/* Quick Order CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            fullWidth
            size="lg"
            onClick={() => navigate('/menu')}
            className="text-lg"
          >
            <Coffee className="mr-2" size={24} />
            Order Now
          </Button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-xl font-heading font-bold text-gray-900">Quick Browse</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  interactive
                  onClick={() => navigate(`/menu?category=${category.id}`)}
                  className="text-center py-6"
                >
                  <div className={`w-14 h-14 mx-auto mb-2 rounded-full ${category.color} flex items-center justify-center`}>
                    <Icon size={28} />
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{category.name}</p>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Featured Drinks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-gray-900">Featured Drinks</h2>
            <button
              onClick={() => navigate('/menu')}
              className="text-maroon font-semibold text-sm flex items-center"
            >
              See All <ChevronRight size={16} />
            </button>
          </div>

          <div className="space-y-3">
            {featuredDrinks.slice(0, 3).map((drink, index) => (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card
                  interactive
                  onClick={() => navigate(`/drink/${drink.id}`)}
                  className="flex items-center gap-4"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-maroon/10 to-navy/10 rounded-xl flex items-center justify-center">
                    <Coffee size={32} className="text-maroon" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{drink.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{drink.description}</p>
                    <p className="text-maroon font-bold mt-1">${drink.basePrice.toFixed(2)}</p>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Find a Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card
            interactive
            onClick={() => navigate('/locations')}
            className="bg-navy text-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-bold">Find a 7 Brew Stand</p>
                  <p className="text-sm opacity-90">2 locations near you</p>
                </div>
              </div>
              <ChevronRight size={24} />
            </div>
          </Card>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};
