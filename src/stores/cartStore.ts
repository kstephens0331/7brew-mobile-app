import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Drink, Customizations } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (drink: Drink, customizations: Customizations) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getItemCount: () => number;
}

const calculateItemPrice = (drink: Drink, customizations: Customizations): number => {
  let price = drink.basePrice;

  // Size modifiers
  if (customizations.size === 'medium') price += 0.50;
  if (customizations.size === 'large') price += 1.00;

  // Extra espresso shots
  if (customizations.espressoShots > 2) {
    price += (customizations.espressoShots - 2) * 0.75;
  }

  // Premium milk options
  if (['oat', 'almond', 'coconut'].includes(customizations.milk)) {
    price += 0.50;
  }

  // Syrups (first 3 included, extra is $0.50 each)
  const totalSyrupPumps = customizations.syrups.reduce((sum, s) => sum + s.pumps, 0);
  if (totalSyrupPumps > 3) {
    price += (totalSyrupPumps - 3) * 0.50;
  }

  // Sauces
  const totalSaucePumps = customizations.sauces.reduce((sum, s) => sum + s.pumps, 0);
  if (totalSaucePumps > 0) {
    price += totalSaucePumps * 0.50;
  }

  // Extra toppings
  const extraToppings = customizations.toppings.filter((t) => t.extra);
  price += extraToppings.length * 0.50;

  return Math.round(price * 100) / 100;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (drink, customizations) => {
        const totalPrice = calculateItemPrice(drink, customizations);
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random()}`,
          drink,
          customizations,
          quantity: 1,
          totalPrice,
        };

        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      removeItem: (itemId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        const items = get().items;
        return items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
      },

      getTax: () => {
        const subtotal = get().getSubtotal();
        return Math.round(subtotal * 0.0825 * 100) / 100; // 8.25% Texas sales tax
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax();
      },

      getItemCount: () => {
        const items = get().items;
        return items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: '7brew-cart-storage',
    }
  )
);
