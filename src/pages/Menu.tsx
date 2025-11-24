import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coffee, Zap, Blend, Droplet, Cherry, Snowflake, IceCream, Sparkles } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Card } from '../components/ui/Card';
import { drinks, getDrinksByCategory } from '../data/menu';
import { DrinkCategory } from '../types';
import clsx from 'clsx';

const categories = [
  { id: 'coffee' as DrinkCategory, name: 'Coffee', icon: Coffee },
  { id: 'energy' as DrinkCategory, name: 'Energy', icon: Zap },
  { id: 'smoothies' as DrinkCategory, name: 'Smoothies', icon: Blend },
  { id: 'teas' as DrinkCategory, name: 'Teas', icon: Droplet },
  { id: 'lemonades' as DrinkCategory, name: 'Lemonades', icon: Cherry },
  { id: 'chillers' as DrinkCategory, name: 'Chillers', icon: Snowflake },
  { id: 'shakes' as DrinkCategory, name: 'Shakes', icon: IceCream },
  { id: 'fizz' as DrinkCategory, name: '7 Fizz', icon: Sparkles },
];

const getCaffeineColor = (level: string) => {
  switch (level) {
    case 'none':
      return 'bg-gray-100 text-gray-700';
    case 'low':
      return 'bg-green-100 text-green-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'high':
      return 'bg-orange-100 text-orange-700';
    case 'extreme':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const Menu = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<DrinkCategory | 'all'>('all');

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category as DrinkCategory);
    }
  }, [searchParams]);

  const filteredDrinks =
    selectedCategory === 'all' ? drinks : getDrinksByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-cream pb-20">
      <Header title="MENU" showCart showLocation />

      <div className="max-w-screen-xl mx-auto">
        {/* Category Filter */}
        <div className="sticky top-[60px] z-30 bg-cream py-4 px-4 border-b border-gray-200">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={clsx(
                'px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all',
                selectedCategory === 'all'
                  ? 'bg-maroon text-white'
                  : 'bg-white text-gray-700'
              )}
            >
              All Drinks
            </button>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={clsx(
                    'px-4 py-2 rounded-full font-semibold whitespace-nowrap flex items-center gap-2 transition-all',
                    selectedCategory === category.id
                      ? 'bg-maroon text-white'
                      : 'bg-white text-gray-700'
                  )}
                >
                  <Icon size={16} />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Drinks Grid */}
        <div className="px-4 py-6 space-y-4">
          {filteredDrinks.map((drink, index) => {
            const CategoryIcon = categories.find((c) => c.id === drink.category)?.icon || Coffee;

            return (
              <motion.div
                key={drink.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  interactive
                  onClick={() => navigate(`/drink/${drink.id}`)}
                  className="flex gap-4"
                >
                  {/* Drink Image Placeholder */}
                  <div className="w-24 h-24 bg-gradient-to-br from-maroon/10 to-navy/10 rounded-xl flex-shrink-0 flex items-center justify-center relative">
                    <CategoryIcon size={36} className="text-maroon" />
                    {drink.isSignature && (
                      <span className="absolute top-1 right-1 bg-navy text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Signature
                      </span>
                    )}
                    {drink.isSeasonal && (
                      <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Seasonal
                      </span>
                    )}
                  </div>

                  {/* Drink Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-lg">{drink.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {drink.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-maroon font-bold text-lg">
                        ${drink.basePrice.toFixed(2)}
                      </p>

                      {/* Caffeine Badge */}
                      <span
                        className={clsx(
                          'text-xs font-semibold px-2 py-1 rounded-full capitalize',
                          getCaffeineColor(drink.caffeineLevel)
                        )}
                      >
                        {drink.caffeineLevel === 'none' ? 'No Caffeine' : `${drink.caffeineLevel} caffeine`}
                      </span>
                    </div>

                    {/* Available Temps */}
                    <div className="flex gap-1 mt-2">
                      {drink.availableTemps.map((temp) => (
                        <span
                          key={temp}
                          className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize"
                        >
                          {temp}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredDrinks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No drinks found in this category</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-maroon font-semibold"
            >
              View All Drinks
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};
