import { motion } from 'framer-motion';
import { Clock, MapPin, Package, CheckCircle } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useOrderStore } from '../stores/orderStore';
import { useCartStore } from '../stores/cartStore';
import { useNavigate } from 'react-router-dom';
import { formatDateTime, formatPrice } from '../utils/formatters';
import clsx from 'clsx';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700';
    case 'preparing':
      return 'bg-blue-100 text-blue-700';
    case 'ready':
      return 'bg-green-100 text-green-700';
    case 'completed':
      return 'bg-gray-100 text-gray-700';
    case 'cancelled':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return Clock;
    case 'preparing':
      return Package;
    case 'ready':
    case 'completed':
      return CheckCircle;
    default:
      return Clock;
  }
};

export const Orders = () => {
  const navigate = useNavigate();
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-cream pb-20">
        <Header title="ORDERS" showCart showLocation={false} />
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <Package size={80} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6 text-center">
            Your order history will appear here
          </p>
          <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      <Header title="ORDERS" showCart showLocation={false} />

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {orders.map((order, index) => {
          const StatusIcon = getStatusIcon(order.status);

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order.id.slice(-8)}</p>
                    <p className="text-xs text-gray-400">{formatDateTime(order.createdAt)}</p>
                  </div>
                  <span
                    className={clsx(
                      'px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1',
                      getStatusColor(order.status)
                    )}
                  >
                    <StatusIcon size={14} />
                    {order.status}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{order.location.name}</span>
                </div>

                {/* Items */}
                <div className="mb-4 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.quantity}x {item.drink.name}
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {formatPrice(item.totalPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-maroon text-lg">
                    {formatPrice(order.total)}
                  </span>
                </div>

                {/* Points Earned */}
                {order.pointsEarned > 0 && (
                  <div className="mt-2 text-center py-2 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✨ Earned <span className="font-bold">{order.pointsEarned}</span> points
                    </p>
                  </div>
                )}

                {order.usedFreedrink && (
                  <div className="mt-2 text-center py-2 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      🎉 Free drink reward used
                    </p>
                  </div>
                )}

                {/* Reorder Button */}
                {order.status === 'completed' && (
                  <Button
                    fullWidth
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Add all items from this order to cart
                      order.items.forEach((item) => {
                        useCartStore.getState().addItem(item.drink, item.customizations);
                      });
                      navigate('/cart');
                    }}
                    className="mt-3"
                  >
                    Reorder
                  </Button>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>

      <BottomNav />
    </div>
  );
};
