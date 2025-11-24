import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/userStore';

interface PointsTrackerProps {
  showFreeDrinkGoal?: boolean;
  compact?: boolean;
}

export const PointsTracker = ({ showFreeDrinkGoal = true }: PointsTrackerProps) => {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  const POINTS_FOR_FREE_DRINK = 1000;
  const currentPoints = user.points;
  const progressPercentage = (currentPoints / POINTS_FOR_FREE_DRINK) * 100;
  const pointsNeeded = POINTS_FOR_FREE_DRINK - currentPoints;

  return (
    <div className="space-y-4">
      {/* Main Tracker Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-6 shadow-xl relative overflow-hidden"
      >
        {/* Decorative background circles */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-200/30 to-blue-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                Your Current Points
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-6xl font-black text-gray-900 leading-none"
                  style={{ fontFamily: 'Arial Black, sans-serif' }}
                >
                  {currentPoints}
                </span>
                <span className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                  /{POINTS_FOR_FREE_DRINK}
                </span>
              </div>
            </div>

            {/* Coffee Image - Larger */}
            {showFreeDrinkGoal && (
              <div className="flex-shrink-0 -mr-2">
                <div className="w-32 h-40">
                  <img
                    src="/7brew-coffee.png"
                    alt="7 Brew Coffee"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="relative h-6 bg-white/60 rounded-2xl overflow-hidden shadow-inner backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute inset-y-0 left-0 rounded-2xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
              />
              {/* Progress Dots */}
              <div className="absolute inset-0 flex items-center justify-evenly px-2">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    className={`w-3 h-3 rounded-full ${
                      i < Math.floor(progressPercentage / 10)
                        ? 'bg-white shadow-lg ring-1 ring-white/50'
                        : 'bg-gray-300/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Status Message */}
          {showFreeDrinkGoal && (
            <div className="text-center">
              {pointsNeeded > 0 ? (
                <p className="text-xs font-bold text-gray-700">
                  Only <span className="text-xl font-black text-maroon">{pointsNeeded}</span> points away from your{' '}
                  <span className="font-black text-maroon uppercase">Free Drink!</span>
                </p>
              ) : (
                <p className="text-sm font-black text-green-600 uppercase">
                  🎉 Free Drink Earned! 🎉
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Stats Row - 2 column grid for mobile */}
      <div className="grid grid-cols-2 gap-3">
        {/* Points Needed Card */}
        {showFreeDrinkGoal && pointsNeeded > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-maroon to-maroon-dark text-white rounded-2xl p-4 shadow-xl"
          >
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-90">
                Points Needed
              </p>
              <p
                className="text-4xl font-black mb-1"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                {pointsNeeded}
              </p>
              <div className="h-0.5 w-12 bg-white/30 rounded-full mx-auto mb-1"></div>
              <p className="text-[10px] font-bold uppercase tracking-wide leading-tight">
                To Free Drink
              </p>
            </div>
          </motion.div>
        )}

        {/* Free Drinks Available */}
        {user.freeDrinksAvailable > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-4 shadow-xl"
          >
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-90">
                Available Now
              </p>
              <p
                className="text-4xl font-black mb-1"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                {user.freeDrinksAvailable}
              </p>
              <div className="h-0.5 w-12 bg-white/30 rounded-full mx-auto mb-1"></div>
              <p className="text-[10px] font-bold uppercase tracking-wide">
                Free Drink{user.freeDrinksAvailable === 1 ? '' : 's'}
              </p>
            </div>
          </motion.div>
        )}

        {/* Lifetime Points Card */}
        {!pointsNeeded || pointsNeeded <= 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-navy to-blue-900 text-white rounded-2xl p-4 shadow-xl col-span-2"
          >
            <div className="text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-90">
                Lifetime Points
              </p>
              <p
                className="text-4xl font-black mb-1"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                {user.lifetimePoints.toLocaleString()}
              </p>
              <div className="h-0.5 w-12 bg-white/30 rounded-full mx-auto mb-1"></div>
              <p className="text-[10px] font-bold uppercase tracking-wide">
                Total Earned
              </p>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
};
