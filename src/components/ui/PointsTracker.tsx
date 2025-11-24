import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/userStore';

interface PointsTrackerProps {
  showFreeDrinkGoal?: boolean;
  compact?: boolean;
}

export const PointsTracker = ({ showFreeDrinkGoal = true, compact = false }: PointsTrackerProps) => {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  const POINTS_FOR_FREE_DRINK = 1000;
  const currentPoints = user.points;
  const progressPercentage = (currentPoints / POINTS_FOR_FREE_DRINK) * 100;
  const pointsNeeded = POINTS_FOR_FREE_DRINK - currentPoints;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Main Tracker Card - Takes 2 columns */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl relative overflow-hidden"
      >
        {/* Decorative background circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-200/30 to-blue-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
                Your Current Points
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-7xl font-black text-gray-900 leading-none"
                  style={{ fontFamily: 'Arial Black, sans-serif' }}
                >
                  {currentPoints}
                </span>
                <span className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Arial Black, sans-serif' }}>
                  /{POINTS_FOR_FREE_DRINK}
                </span>
              </div>
            </div>

            {/* Coffee Image */}
            {showFreeDrinkGoal && (
              <div className="flex-shrink-0">
                <div className="w-28 h-32">
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
          <div className="mb-4">
            <div className="relative h-8 bg-white/60 rounded-2xl overflow-hidden shadow-inner backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="absolute inset-y-0 left-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(to right, #7B2D4F, #9F4A6B, #C869A0, #E88FC5, #A885D8, #7B6AB8, #4A5490, #2E4070)'
                }}
              />
              {/* Progress Dots */}
              <div className="absolute inset-0 flex items-center justify-evenly px-4">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    className={`w-4 h-4 rounded-full ${
                      i < Math.floor(progressPercentage / 10)
                        ? 'bg-white shadow-lg ring-2 ring-white/50'
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
                <p className="text-sm font-bold text-gray-700">
                  Only <span className="text-2xl font-black text-maroon">{pointsNeeded}</span> points away from your{' '}
                  <span className="font-black text-maroon uppercase">Free Drink!</span>
                </p>
              ) : (
                <p className="text-lg font-black text-green-600 uppercase">
                  🎉 Free Drink Earned! 🎉
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Side Info Cards - Stack vertically in 1 column */}
      <div className="flex flex-col gap-4">
        {/* Points Needed Card */}
        {showFreeDrinkGoal && pointsNeeded > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-maroon to-maroon-dark text-white rounded-2xl p-6 shadow-xl"
          >
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">
                Points Needed
              </p>
              <p
                className="text-6xl font-black mb-2"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                {pointsNeeded}
              </p>
              <div className="h-1 w-16 bg-white/30 rounded-full mx-auto mb-3"></div>
              <p className="text-xs font-bold uppercase tracking-wide leading-tight">
                To Get Your<br />Free Drink!
              </p>
            </div>
          </motion.div>
        )}

        {/* Free Drinks Available */}
        {user.freeDrinksAvailable > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-xl"
          >
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">
                Available Now
              </p>
              <p
                className="text-6xl font-black mb-2"
                style={{ fontFamily: 'Arial Black, sans-serif' }}
              >
                {user.freeDrinksAvailable}
              </p>
              <div className="h-1 w-16 bg-white/30 rounded-full mx-auto mb-3"></div>
              <p className="text-xs font-bold uppercase tracking-wide">
                Free Drink{user.freeDrinksAvailable === 1 ? '' : 's'}<br />Any Size
              </p>
            </div>
          </motion.div>
        )}

        {/* Lifetime Points Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-navy to-blue-900 text-white rounded-2xl p-6 shadow-xl"
        >
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-90">
              Lifetime Points
            </p>
            <p
              className="text-5xl font-black mb-2"
              style={{ fontFamily: 'Arial Black, sans-serif' }}
            >
              {user.lifetimePoints.toLocaleString()}
            </p>
            <div className="h-1 w-16 bg-white/30 rounded-full mx-auto mb-3"></div>
            <p className="text-xs font-bold uppercase tracking-wide">
              Total Earned
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
