import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../types';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  addOrder: (order: Order) => void;
  setCurrentOrder: (order: Order | null) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,

      addOrder: (order) =>
        set((state) => ({
          orders: [order, ...state.orders],
          currentOrder: order,
        })),

      setCurrentOrder: (order) => set({ currentOrder: order }),

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId);
      },
    }),
    {
      name: '7brew-order-storage',
    }
  )
);
