import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useCartStore } from '../stores/cartStore';
import { useUserStore } from '../stores/userStore';
import { useOrderStore } from '../stores/orderStore';
import { locations } from '../data/locations';
import { formatPrice } from '../utils/formatters';
import { Order } from '../types';

// Demo payment details
const DEMO_CARD = {
  number: '4242 4242 4242 4242',
  expiry: '12/28',
  cvv: '123',
  zip: '77304',
};

export const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const user = useUserStore((state) => state.user);
  const { updatePoints, addFreeDrink, useFreeDrink, addActivity } = useUserStore();
  const addOrder = useOrderStore((state) => state.addOrder);

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [pickupTime, setPickupTime] = useState<'asap' | 'scheduled'>('asap');
  const [useReward, setUseReward] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const total = getTotal();
  const finalTotal = useReward && user && user.freeDrinksAvailable > 0 ? 0 : total;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order
    const order: Order = {
      id: `order-${Date.now()}`,
      userId: user?.id || 'guest',
      items,
      location: selectedLocation,
      pickupTime: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      status: 'pending',
      subtotal: getTotal(),
      tax: useCartStore.getState().getTax(),
      total: finalTotal,
      pointsEarned: useReward ? 0 : items.length * 100,
      usedFreedrink: useReward,
      createdAt: new Date(),
    };

    addOrder(order);

    // Update user points and rewards
    if (user) {
      if (useReward && user.freeDrinksAvailable > 0) {
        useFreeDrink();
        addActivity({
          id: `act-${Date.now()}`,
          date: new Date(),
          description: 'FREE DRINK REDEEMED',
          earnedPoints: 0,
          redeemed: -1,
          balance: user.points,
          locationName: selectedLocation.name,
        });
      } else {
        const pointsToAdd = items.length * 100;
        updatePoints(pointsToAdd);
        addActivity({
          id: `act-${Date.now()}`,
          date: new Date(),
          description: 'PURCHASE',
          earnedPoints: pointsToAdd,
          redeemed: 0,
          balance: user.points + pointsToAdd,
          locationName: selectedLocation.name,
        });

        // Check if user earned a free drink
        const newPoints = user.points + pointsToAdd;
        if (newPoints >= 1000) {
          addFreeDrink();
          addActivity({
            id: `act-${Date.now() + 1}`,
            date: new Date(),
            description: 'FREE DRINK EARNED',
            earnedPoints: 1,
            redeemed: 0,
            balance: 0,
            locationName: selectedLocation.name,
          });
          addActivity({
            id: `act-${Date.now() + 2}`,
            date: new Date(),
            description: 'POINTS CONVERTED TO FREE DRINK',
            earnedPoints: 0,
            redeemed: -1000,
            balance: 0,
            locationName: selectedLocation.name,
          });
        }
      }
    }

    clearCart();
    setIsProcessing(false);
    setOrderComplete(true);

    // Navigate to order confirmation after a delay
    setTimeout(() => {
      navigate('/orders');
    }, 3000);
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
          >
            <CheckCircle size={60} className="text-white" />
          </motion.div>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            ORDER PLACED!
          </h2>
          <p className="text-gray-600 mb-2">Your order is being prepared</p>
          <p className="text-sm text-gray-500">
            Redirecting to your orders...
          </p>
        </motion.div>
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
          <h1 className="text-xl font-heading font-bold ml-2">CHECKOUT</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {/* Location Selection */}
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <MapPin size={24} className="text-maroon" />
            <h3 className="font-bold text-gray-900">Pickup Location</h3>
          </div>
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${
                selectedLocation.id === location.id
                  ? 'bg-maroon text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <p className="font-semibold">{location.name}</p>
              <p className="text-sm opacity-90">{location.address}</p>
              <p className="text-sm opacity-90">{location.hours}</p>
            </button>
          ))}
        </Card>

        {/* Pickup Time */}
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <Clock size={24} className="text-maroon" />
            <h3 className="font-bold text-gray-900">Pickup Time</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPickupTime('asap')}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                pickupTime === 'asap'
                  ? 'bg-maroon text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              ASAP (15 min)
            </button>
            <button
              onClick={() => setPickupTime('scheduled')}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                pickupTime === 'scheduled'
                  ? 'bg-maroon text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Schedule
            </button>
          </div>
        </Card>

        {/* Use Reward */}
        {user && user.freeDrinksAvailable > 0 && (
          <Card className="bg-green-50 border-2 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-gray-900">Use Free Drink Reward</p>
                <p className="text-sm text-gray-600">
                  You have {user.freeDrinksAvailable} free drink{user.freeDrinksAvailable > 1 ? 's' : ''} available
                </p>
              </div>
              <button
                onClick={() => setUseReward(!useReward)}
                className={`w-12 h-6 rounded-full transition-all ${
                  useReward ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    useReward ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </Card>
        )}

        {/* Payment Method (Demo) */}
        <Card>
          <div className="flex items-center gap-3 mb-3">
            <CreditCard size={24} className="text-maroon" />
            <h3 className="font-bold text-gray-900">Payment Method</h3>
          </div>
          <div className="bg-gradient-to-r from-navy to-navy-dark text-white p-4 rounded-xl">
            <p className="text-sm opacity-75 mb-2">Card Number</p>
            <p className="text-xl font-mono mb-3">{DEMO_CARD.number}</p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm opacity-75">Expires</p>
                <p className="font-mono">{DEMO_CARD.expiry}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">CVV</p>
                <p className="font-mono">{DEMO_CARD.cvv}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">ZIP</p>
                <p className="font-mono">{DEMO_CARD.zip}</p>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Demo payment - No actual charges will be made
          </p>
        </Card>

        {/* Order Total */}
        <Card className="bg-gray-50">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-700">
              <span>{items.length} item{items.length > 1 ? 's' : ''}</span>
              <span>{formatPrice(total)}</span>
            </div>
            {useReward && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Free Drink Reward Applied</span>
                <span>-{formatPrice(total)}</span>
              </div>
            )}
            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between text-gray-900 font-bold text-xl">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Place Order Button */}
        <Button
          fullWidth
          size="lg"
          onClick={handlePlaceOrder}
          isLoading={isProcessing}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>

        {!useReward && user && (
          <p className="text-center text-sm text-gray-600">
            You'll earn <span className="font-bold text-maroon">{items.length * 100} points</span> from this order
          </p>
        )}
      </div>
    </div>
  );
};
