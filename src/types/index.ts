// Type Definitions for 7 Brew Mobile App

export type DrinkCategory =
  | 'coffee'
  | 'energy'
  | 'smoothies'
  | 'teas'
  | 'lemonades'
  | 'chillers'
  | 'shakes'
  | 'fizz';

export type CaffeineLevel = 'none' | 'low' | 'medium' | 'high' | 'extreme';
export type Temperature = 'hot' | 'iced' | 'frozen';
export type Size = 'small' | 'medium' | 'large';
export type MilkOption = 'whole' | 'skim' | 'oat' | 'almond' | 'coconut' | 'half-and-half' | 'none';
export type SweetnessLevel = 'none' | 'light' | 'regular' | 'extra';

export interface Syrup {
  id: string;
  name: string;
  sugarFree: boolean;
  seasonal?: boolean;
}

export interface Sauce {
  id: string;
  name: string;
  sugarFree: boolean;
}

export interface Topping {
  id: string;
  name: string;
}

export interface SyrupSelection {
  syrup: Syrup;
  pumps: number;
}

export interface SauceSelection {
  sauce: Sauce;
  pumps: number;
}

export interface ToppingSelection {
  topping: Topping;
  extra?: boolean;
}

export interface Customizations {
  size: Size;
  temperature: Temperature;
  milk: MilkOption;
  espressoShots: number;
  syrups: SyrupSelection[];
  sauces: SauceSelection[];
  toppings: ToppingSelection[];
  sweetnessLevel: SweetnessLevel;
  specialInstructions?: string;
}

export interface Drink {
  id: string;
  name: string;
  category: DrinkCategory;
  basePrice: number;
  description: string;
  image: string;
  isSignature: boolean;
  isSeasonal: boolean;
  caffeineLevel: CaffeineLevel;
  availableTemps: Temperature[];
  availableSizes: Size[];
  defaultCustomizations: Customizations;
}

export interface CartItem {
  id: string;
  drink: Drink;
  customizations: Customizations;
  quantity: number;
  totalPrice: number;
}

export interface UserStats {
  lifetimePoints: number;
  locationsVisited: number;
  longestStreak: number;
  totalVisits: number;
  currentStreak: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  points: number;
  lifetimePoints: number;
  freeDrinksAvailable: number;
  favorites: string[];
  defaultLocation?: string;
  birthday?: string;
  stats: UserStats;
}

export interface RewardsProgress {
  currentPoints: number;
  pointsToNextReward: number;
  drinksUntilReward: number;
  freeDrinksAvailable: number;
  progressPercent: number;
}

export type ActivityType =
  | 'PURCHASE'
  | 'POINTS CONVERTED TO FREE DRINK'
  | 'FREE DRINK EARNED'
  | 'FREE DRINK REDEEMED';

export interface ActivityEntry {
  id: string;
  date: Date;
  description: ActivityType;
  earnedPoints: number;
  redeemed: number;
  balance: number;
  locationName?: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: string;
  isOpen: boolean;
  phone?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  location: Location;
  pickupTime: Date;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  subtotal: number;
  tax: number;
  total: number;
  pointsEarned: number;
  usedFreedrink?: boolean;
  createdAt: Date;
}

export interface PaymentInfo {
  cardNumber: string;
  expiry: string;
  cvv: string;
  zipCode: string;
}
