// Profile page with editable user information
import { ExternalLink, User as UserIcon, Gift, Heart, Settings, LogOut, Trash2, Edit } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { BottomNav } from '../components/layout/BottomNav';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PointsTracker } from '../components/ui/PointsTracker';
import { useUserStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { getDrinkById } from '../data/menu';

const externalLinks = [
  { name: 'Shop Merch', url: 'https://7brew.com/shop', icon: Gift },
  { name: 'Heroes Program', url: 'https://7brew.com/heroes', icon: Heart },
  { name: 'Join Brew Crew', url: 'https://7brew.com/join-the-brew-crew', icon: UserIcon },
  { name: 'About 7 Brew', url: 'https://7brew.com/about', icon: UserIcon },
  { name: 'FAQs', url: 'https://7brew.com/faqs', icon: Settings },
];

export const Profile = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const profilePicture = useUserStore((state) => state.profilePicture);
  const logout = useUserStore((state) => state.logout);

  if (!user) {
    return (
      <div className="min-h-screen bg-cream pb-20">
        <Header showCart={false} showLocation={false} />
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <UserIcon size={80} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Not logged in</h2>
          <p className="text-gray-600 mb-6 text-center">
            Log in to view your profile and rewards
          </p>
        </div>
        <BottomNav />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cream pb-20">
      <Header showCart showLocation={false} />

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-4">
        {/* User Info Card */}
        <Card className="text-center relative">
          <button
            onClick={() => navigate('/profile/edit')}
            className="absolute top-4 right-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Edit size={20} className="text-gray-700" />
          </button>

          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-maroon to-navy rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserIcon size={48} className="text-white" />
            )}
          </div>
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.phone}</p>
        </Card>

        {/* Points Tracker */}
        <PointsTracker compact showFreeDrinkGoal />

        {/* Quick Stats */}
        <Card className="bg-gradient-to-r from-maroon to-maroon-dark text-white">
          <div className="grid grid-cols-3 divide-x divide-white/20">
            <div className="text-center py-3">
              <p className="text-2xl font-bold">{user.points}</p>
              <p className="text-sm opacity-90">Points</p>
            </div>
            <div className="text-center py-3">
              <p className="text-2xl font-bold">{user.freeDrinksAvailable}</p>
              <p className="text-sm opacity-90">Free Drinks</p>
            </div>
            <div className="text-center py-3">
              <p className="text-2xl font-bold">{user.stats.totalVisits}</p>
              <p className="text-sm opacity-90">Visits</p>
            </div>
          </div>
        </Card>

        {/* Account Details */}
        <Card>
          <h3 className="font-heading font-bold text-lg text-gray-900 mb-3">
            ACCOUNT DETAILS
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600">First Name</label>
              <p className="font-semibold text-gray-900">{user.firstName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Last Name</label>
              <p className="font-semibold text-gray-900">{user.lastName}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="font-semibold text-gray-900">{user.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Phone (locked)</label>
              <p className="font-semibold text-gray-900">{user.phone}</p>
              <p className="text-xs text-gray-500 mt-1">
                Contact customer support to change
              </p>
            </div>
            {user.birthday && (
              <div>
                <label className="text-sm text-gray-600">Birthday</label>
                <p className="font-semibold text-gray-900">
                  {new Date(user.birthday).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Favorite Drinks */}
        <Card>
          <h3 className="font-heading font-bold text-lg text-gray-900 mb-3">
            FAVORITE DRINKS
          </h3>
          {user.favorites.length > 0 ? (
            <div className="space-y-3">
              {user.favorites.map((drinkId) => {
                const drink = getDrinkById(drinkId);
                return drink ? (
                  <div
                    key={drinkId}
                    className="flex items-start gap-3 py-3 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-maroon to-navy rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-md">
                      {drink.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate">{drink.name}</h4>
                      <p className="text-sm text-gray-600 line-clamp-1">{drink.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-semibold text-maroon bg-maroon/10 px-2 py-1 rounded">
                          {drink.category.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">${drink.basePrice.toFixed(2)}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/drink/${drinkId}`)}
                      className="flex-shrink-0 px-4 py-2 bg-maroon text-white text-sm font-semibold rounded-lg hover:bg-maroon-dark transition-colors"
                    >
                      Order
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No favorite drinks yet. Heart drinks to save them here!
            </p>
          )}
        </Card>

        {/* External Links */}
        <Card>
          <h3 className="font-heading font-bold text-lg text-gray-900 mb-3">
            MORE FROM 7 BREW
          </h3>
          <div className="space-y-1">
            {externalLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-gray-600" />
                    <span className="font-medium text-gray-900">{link.name}</span>
                  </div>
                  <ExternalLink size={16} className="text-gray-400" />
                </a>
              );
            })}
          </div>
        </Card>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            fullWidth
            variant="outline"
            onClick={handleLogout}
            className="flex items-center justify-center gap-2"
          >
            <LogOut size={20} />
            Log Out
          </Button>

          <button className="w-full text-center py-3 text-red-600 text-sm font-semibold">
            <Trash2 size={16} className="inline mr-2" />
            Delete Account
          </button>
        </div>

        {/* App Info */}
        <div className="text-center py-6 text-gray-500 text-sm">
          <p className="font-script text-2xl text-maroon mb-2">7 Brew</p>
          <p>Cultivating Kindness Since 2017</p>
          <p className="text-xs mt-2">Demo v1.0.0</p>
          <p className="text-xs">
            Built by{' '}
            <a
              href="https://stephenscode.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-maroon font-semibold"
            >
              StephensCode LLC
            </a>
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

