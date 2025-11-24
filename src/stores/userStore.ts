import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, ActivityEntry } from '../types';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  activityHistory: ActivityEntry[];
  profilePicture: string | null;
  login: (user: User) => void;
  logout: () => void;
  updatePoints: (points: number) => void;
  addFreeDrink: () => void;
  useFreeDrink: () => void;
  addFavorite: (drinkId: string) => void;
  removeFavorite: (drinkId: string) => void;
  addActivity: (activity: ActivityEntry) => void;
  updateProfile: (updates: Partial<User>) => void;
  updateUser: (updates: Partial<Pick<User, 'firstName' | 'lastName' | 'email' | 'phone'>>) => void;
  setProfilePicture: (imageData: string | null) => void;
}

// Demo user data
const demoUser: User = {
  id: 'demo-user-1',
  firstName: 'Kyle',
  lastName: 'Stephens',
  email: 'kyle@stephenscode.dev',
  phone: '(936) 323-4527',
  points: 750,
  lifetimePoints: 5750,
  freeDrinksAvailable: 1,
  favorites: ['blondie', 'cold-brew'],
  defaultLocation: 'conroe-davis',
  birthday: '1990-05-15',
  stats: {
    lifetimePoints: 5750,
    locationsVisited: 2,
    longestStreak: 12,
    totalVisits: 58,
    currentStreak: 5,
  },
};

const demoActivity: ActivityEntry[] = [
  {
    id: 'act-1',
    date: new Date('2025-11-20T08:30:00'),
    description: 'PURCHASE',
    earnedPoints: 100,
    redeemed: 0,
    balance: 750,
    locationName: 'Conroe - Davis St',
  },
  {
    id: 'act-2',
    date: new Date('2025-11-18T14:15:00'),
    description: 'PURCHASE',
    earnedPoints: 100,
    redeemed: 0,
    balance: 650,
    locationName: 'Conroe - Concord Dr',
  },
  {
    id: 'act-3',
    date: new Date('2025-11-15T09:00:00'),
    description: 'POINTS CONVERTED TO FREE DRINK',
    earnedPoints: 0,
    redeemed: -1000,
    balance: 550,
    locationName: 'Conroe - Davis St',
  },
  {
    id: 'act-4',
    date: new Date('2025-11-15T09:00:00'),
    description: 'FREE DRINK EARNED',
    earnedPoints: 1,
    redeemed: 0,
    balance: 1550,
    locationName: 'Conroe - Davis St',
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: demoUser,
      isLoggedIn: true,
      activityHistory: demoActivity,
      profilePicture: null,

      login: (user) => set({ user, isLoggedIn: true }),

      logout: () => set({ user: null, isLoggedIn: false, activityHistory: [], profilePicture: null }),

      updatePoints: (points) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                points: state.user.points + points,
                lifetimePoints: state.user.lifetimePoints + points,
                stats: {
                  ...state.user.stats,
                  lifetimePoints: state.user.stats.lifetimePoints + points,
                },
              }
            : null,
        })),

      addFreeDrink: () =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                freeDrinksAvailable: state.user.freeDrinksAvailable + 1,
                points: 0, // Reset points after earning free drink
              }
            : null,
        })),

      useFreeDrink: () =>
        set((state) => ({
          user: state.user && state.user.freeDrinksAvailable > 0
            ? {
                ...state.user,
                freeDrinksAvailable: state.user.freeDrinksAvailable - 1,
              }
            : state.user,
        })),

      addFavorite: (drinkId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                favorites: [...state.user.favorites, drinkId],
              }
            : null,
        })),

      removeFavorite: (drinkId) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                favorites: state.user.favorites.filter((id) => id !== drinkId),
              }
            : null,
        })),

      addActivity: (activity) =>
        set((state) => ({
          activityHistory: [activity, ...state.activityHistory],
        })),

      updateProfile: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      setProfilePicture: (imageData) =>
        set({ profilePicture: imageData }),
    }),
    {
      name: '7brew-user-storage',
    }
  )
);
