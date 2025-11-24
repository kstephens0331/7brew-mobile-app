import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Calendar, Flame } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Card } from '../components/ui/Card';
import { PointsTracker } from '../components/ui/PointsTracker';
import { useUserStore } from '../stores/userStore';
import { formatDate } from '../utils/formatters';

export const Rewards = () => {
  const user = useUserStore((state) => state.user);
  const activityHistory = useUserStore((state) => state.activityHistory);

  if (!user) {
    return (
      <div className="min-h-screen bg-cream pb-20">
        <Header showCart={false} showLocation={false} />
        <div className="flex items-center justify-center h-screen-60">
          <p className="text-gray-600">Please log in to view rewards</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-20">
      <Header showCart showLocation={false} />

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Points Tracker */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <PointsTracker showFreeDrinkGoal />
        </motion.div>

        {/* How it Works */}
        <Card>
          <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
            HOW IT WORKS
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-maroon/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-maroon font-bold">1</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Earn Points</p>
                <p className="text-sm text-gray-600">Get 100 points for every drink purchased</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-maroon/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-maroon font-bold">2</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Reach 1,000 Points</p>
                <p className="text-sm text-gray-600">After 10 drinks, you've earned a reward</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-maroon/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-maroon font-bold">3</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Redeem</p>
                <p className="text-sm text-gray-600">Get a free drink of any size at checkout</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Lifetime Statistics */}
        <Card>
          <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
            LIFETIME STATISTICS
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <TrendingUp size={32} className="mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-gray-900">
                {user.stats.lifetimePoints.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Lifetime Points</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <MapPin size={32} className="mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-gray-900">
                {user.stats.locationsVisited}
              </p>
              <p className="text-sm text-gray-600">Stands Visited</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <Flame size={32} className="mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-gray-900">
                {user.stats.longestStreak}
              </p>
              <p className="text-sm text-gray-600">Longest Streak</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <Calendar size={32} className="mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-gray-900">
                {user.stats.totalVisits}
              </p>
              <p className="text-sm text-gray-600">Total Visits</p>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card>
          <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">
            RECENT ACTIVITY
          </h3>
          <div className="space-y-3">
            {activityHistory.slice(0, 5).map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(activity.date)}
                    {activity.locationName && ` • ${activity.locationName}`}
                  </p>
                </div>
                <div className="text-right">
                  {activity.earnedPoints > 0 && (
                    <p className="text-green-600 font-bold text-sm">
                      +{activity.earnedPoints}
                    </p>
                  )}
                  {activity.redeemed < 0 && (
                    <p className="text-red-600 font-bold text-sm">
                      {activity.redeemed}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Balance: {activity.balance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};
