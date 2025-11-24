import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useCartStore } from '../stores/cartStore';
import { formatPrice } from '../utils/formatters';

export const Cart = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getSubtotal, getTax, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="sticky top-0 z-40 bg-maroon text-white shadow-lg">
          <div className="flex items-center px-4 py-3">
            <button onClick={() => navigate(-1)} className="p-2">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-heading font-bold ml-2">YOUR CART</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-4 py-20">
          <ShoppingBag size={80} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6 text-center">
            Add some delicious drinks to get started!
          </p>
          <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-6">
      <div className="sticky top-0 z-40 bg-maroon text-white shadow-lg">
        <div className="flex items-center px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-heading font-bold ml-2">YOUR CART</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {/* Cart Items */}
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-maroon/10 to-navy/10 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <span className="text-2xl">☕</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.drink.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">
                        {item.customizations.size} • {item.customizations.temperature}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 p-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Customizations Summary */}
                  <div className="text-xs text-gray-500 mb-3 space-y-1">
                    {item.customizations.milk !== 'none' && (
                      <p>• {item.customizations.milk} milk</p>
                    )}
                    {item.customizations.espressoShots > 0 && (
                      <p>• {item.customizations.espressoShots} espresso shot{item.customizations.espressoShots > 1 ? 's' : ''}</p>
                    )}
                    {item.customizations.syrups.length > 0 && (
                      <p>• {item.customizations.syrups.map(s => s.syrup.name).join(', ')}</p>
                    )}
                    {item.customizations.toppings.length > 0 && (
                      <p>• {item.customizations.toppings.map(t => t.topping.name).join(', ')}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-bold text-gray-900 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-maroon text-white rounded-full flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <p className="font-bold text-maroon text-lg">
                      {formatPrice(item.totalPrice * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Order Summary */}
        <Card className="bg-gray-50">
          <h3 className="font-bold text-gray-900 mb-3">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (8.25%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between text-gray-900 font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Checkout Button */}
        <Button fullWidth size="lg" onClick={() => navigate('/checkout')}>
          Proceed to Checkout
        </Button>

        {/* Continue Shopping */}
        <button
          onClick={() => navigate('/menu')}
          className="w-full text-center py-3 text-maroon font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
