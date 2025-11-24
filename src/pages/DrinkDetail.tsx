import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Heart, Coffee } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getDrinkById } from '../data/menu';
import { syrups, toppings } from '../data/customizations';
import { useCartStore } from '../stores/cartStore';
import { useUserStore } from '../stores/userStore';
import { Customizations, Size, MilkOption, SweetnessLevel } from '../types';
import clsx from 'clsx';

const sizes: Size[] = ['small', 'medium', 'large'];
const milkOptions: MilkOption[] = ['whole', 'skim', 'oat', 'almond', 'coconut', 'half-and-half', 'none'];
const sweetnessLevels: SweetnessLevel[] = ['none', 'light', 'regular', 'extra'];

export const DrinkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const drink = getDrinkById(id || '');
  const addItem = useCartStore((state) => state.addItem);
  const user = useUserStore((state) => state.user);
  const addFavorite = useUserStore((state) => state.addFavorite);
  const removeFavorite = useUserStore((state) => state.removeFavorite);

  const [customizations, setCustomizations] = useState<Customizations>(
    drink?.defaultCustomizations || {
      size: 'medium',
      temperature: 'iced',
      milk: 'whole',
      espressoShots: 2,
      syrups: [],
      sauces: [],
      toppings: [],
      sweetnessLevel: 'regular',
    }
  );

  const [showCustomization, setShowCustomization] = useState(false);

  if (!drink) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-gray-600">Drink not found</p>
      </div>
    );
  }

  const isFavorite = user?.favorites.includes(drink.id) || false;

  const handleAddToCart = () => {
    addItem(drink, customizations);
    navigate('/cart');
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(drink.id);
    } else {
      addFavorite(drink.id);
    }
  };

  return (
    <div className="min-h-screen bg-cream pb-6">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-maroon text-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-heading font-bold">CUSTOMIZE</h1>
          <button onClick={toggleFavorite} className="p-2">
            <Heart size={24} fill={isFavorite ? 'white' : 'none'} />
          </button>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Drink Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-maroon/10 to-navy/10 rounded-full flex items-center justify-center mb-4">
            <Coffee size={80} className="text-maroon" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            {drink.name}
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">{drink.description}</p>
          <p className="text-3xl font-bold text-maroon mt-4">
            ${drink.basePrice.toFixed(2)}
          </p>
        </motion.div>

        {/* Size Selection */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-3">Size</h3>
          <div className="grid grid-cols-3 gap-3">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setCustomizations({ ...customizations, size })}
                className={clsx(
                  'py-3 px-4 rounded-xl font-semibold capitalize transition-all',
                  customizations.size === size
                    ? 'bg-maroon text-white'
                    : 'bg-gray-100 text-gray-700'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </Card>

        {/* Temperature Selection */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-3">Temperature</h3>
          <div className="grid grid-cols-3 gap-3">
            {drink.availableTemps.map((temp) => (
              <button
                key={temp}
                onClick={() => setCustomizations({ ...customizations, temperature: temp })}
                className={clsx(
                  'py-3 px-4 rounded-xl font-semibold capitalize transition-all',
                  customizations.temperature === temp
                    ? 'bg-maroon text-white'
                    : 'bg-gray-100 text-gray-700'
                )}
              >
                {temp}
              </button>
            ))}
          </div>
        </Card>

        {/* Milk Selection */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-3">Milk</h3>
          <div className="grid grid-cols-2 gap-2">
            {milkOptions.map((milk) => (
              <button
                key={milk}
                onClick={() => setCustomizations({ ...customizations, milk })}
                className={clsx(
                  'py-2 px-3 rounded-lg font-medium capitalize text-sm transition-all',
                  customizations.milk === milk
                    ? 'bg-maroon text-white'
                    : 'bg-gray-100 text-gray-700'
                )}
              >
                {milk === 'half-and-half' ? 'H&H' : milk}
              </button>
            ))}
          </div>
        </Card>

        {/* Espresso Shots */}
        {drink.category === 'coffee' && (
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Espresso Shots</h3>
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setCustomizations({
                    ...customizations,
                    espressoShots: Math.max(0, customizations.espressoShots - 1),
                  })
                }
                className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <Minus size={20} />
              </button>
              <span className="text-2xl font-bold">{customizations.espressoShots}</span>
              <button
                onClick={() =>
                  setCustomizations({
                    ...customizations,
                    espressoShots: Math.min(5, customizations.espressoShots + 1),
                  })
                }
                className="w-12 h-12 bg-maroon text-white rounded-full flex items-center justify-center"
              >
                <Plus size={20} />
              </button>
            </div>
          </Card>
        )}

        {/* Sweetness Level */}
        <Card>
          <h3 className="font-bold text-gray-900 mb-3">Sweetness</h3>
          <div className="grid grid-cols-4 gap-2">
            {sweetnessLevels.map((level) => (
              <button
                key={level}
                onClick={() => setCustomizations({ ...customizations, sweetnessLevel: level })}
                className={clsx(
                  'py-2 px-2 rounded-lg font-medium capitalize text-sm transition-all',
                  customizations.sweetnessLevel === level
                    ? 'bg-maroon text-white'
                    : 'bg-gray-100 text-gray-700'
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </Card>

        {/* Quick Customization Toggle */}
        <button
          onClick={() => setShowCustomization(!showCustomization)}
          className="w-full text-center py-3 bg-navy text-white rounded-xl font-semibold"
        >
          {showCustomization ? 'Hide' : 'Show'} Advanced Options (Syrups, Sauces, Toppings)
        </button>

        {/* Advanced Customizations */}
        <AnimatePresence>
          {showCustomization && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              {/* Syrups */}
              <Card>
                <h3 className="font-bold text-gray-900 mb-3">Syrups</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {syrups.slice(0, 10).map((syrup) => (
                    <div key={syrup.id} className="flex items-center justify-between py-2">
                      <span className="text-sm">
                        {syrup.name} {syrup.sugarFree && <span className="text-green-600">(SF)</span>}
                      </span>
                      <button
                        onClick={() => {
                          const existing = customizations.syrups.find(s => s.syrup.id === syrup.id);
                          if (existing) {
                            setCustomizations({
                              ...customizations,
                              syrups: customizations.syrups.filter(s => s.syrup.id !== syrup.id),
                            });
                          } else {
                            setCustomizations({
                              ...customizations,
                              syrups: [...customizations.syrups, { syrup, pumps: 2 }],
                            });
                          }
                        }}
                        className={clsx(
                          'px-3 py-1 rounded-full text-xs font-semibold',
                          customizations.syrups.find(s => s.syrup.id === syrup.id)
                            ? 'bg-maroon text-white'
                            : 'bg-gray-100 text-gray-700'
                        )}
                      >
                        {customizations.syrups.find(s => s.syrup.id === syrup.id) ? 'Added' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Toppings */}
              <Card>
                <h3 className="font-bold text-gray-900 mb-3">Toppings</h3>
                <div className="space-y-2">
                  {toppings.map((topping) => (
                    <div key={topping.id} className="flex items-center justify-between py-2">
                      <span className="text-sm">{topping.name}</span>
                      <button
                        onClick={() => {
                          const existing = customizations.toppings.find(t => t.topping.id === topping.id);
                          if (existing) {
                            setCustomizations({
                              ...customizations,
                              toppings: customizations.toppings.filter(t => t.topping.id !== topping.id),
                            });
                          } else {
                            setCustomizations({
                              ...customizations,
                              toppings: [...customizations.toppings, { topping }],
                            });
                          }
                        }}
                        className={clsx(
                          'px-3 py-1 rounded-full text-xs font-semibold',
                          customizations.toppings.find(t => t.topping.id === topping.id)
                            ? 'bg-maroon text-white'
                            : 'bg-gray-100 text-gray-700'
                        )}
                      >
                        {customizations.toppings.find(t => t.topping.id === topping.id) ? 'Added' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add to Cart Button */}
        <div className="sticky bottom-0 pt-4 bg-cream">
          <Button fullWidth size="lg" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
